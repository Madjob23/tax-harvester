import { Card, CardContent } from "@/components/ui/card";
import { CapitalGains } from "@/types";
import { calculateNetGains } from "@/lib/calculations";
import { formatCurrency } from "@/lib/utils";

interface CapitalGainsCardProps {
  title: string;
  capitalGains: CapitalGains;
  variant: "dark" | "blue";
  savings?: number;
}

export default function CapitalGainsCard({
  title,
  capitalGains,
  variant,
  savings,
}: CapitalGainsCardProps) {
  const { netSTCG, netLTCG, realisedGains } = calculateNetGains(capitalGains);
  
  // Adjusted for dark mode support while keeping the variant system
  const bgColor = variant === "dark" 
    ? "bg-white dark:bg-slate-900" 
    : "bg-blue-500 dark:bg-blue-700";
    
  const textColor = variant === "dark" 
    ? "text-black dark:text-white" 
    : "text-white";
  
  return (
    <Card className={`${bgColor} ${textColor} h-[295px] rounded-lg shadow-md p-4`}>
      <CardContent className="p-0">
        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>
        
        {/* Column Headers */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-1"></div>
          <div className="col-span-1 text-right font-medium">Short-term</div>
          <div className="col-span-1 text-right font-medium">Long-term</div>
        </div>
        
        {/* Profits Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-1 font-medium">Profits</div>
          <div className="col-span-1 text-right">
            {formatCurrency(capitalGains.stcg.profits)}
          </div>
          <div className="col-span-1 text-right">
            {formatCurrency(capitalGains.ltcg.profits)}
          </div>
        </div>
        
        {/* Losses Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-1 font-medium">Losses</div>
          <div className="col-span-1 text-right">
            - {formatCurrency(capitalGains.stcg.losses)}
          </div>
          <div className="col-span-1 text-right">
            - {formatCurrency(capitalGains.ltcg.losses)}
          </div>
        </div>
        
        {/* Net Capital Gains Row */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="col-span-1 font-semibold">Net Capital Gains</div>
          <div className="col-span-1 text-right font-semibold">
            {netSTCG >= 0 ? '' : '- '}
            {formatCurrency(Math.abs(netSTCG))}
          </div>
          <div className="col-span-1 text-right font-semibold">
            {netLTCG >= 0 ? '' : '- '}
            {formatCurrency(Math.abs(netLTCG))}
          </div>
        </div>
        
        {/* Bottom Total Line */}
        <div className="">
          <div className="flex gap-3 items-center">
            <div className="text-xl font-semibold">
              {variant === "dark" ? "Realised Capital Gains:" : "Effective Capital Gains:"}
            </div>
            <div className="text-3xl font-semibold">
              {realisedGains >= 0 ? '' : '- '}
              {formatCurrency(Math.abs(realisedGains))}
            </div>
          </div>
        </div>
        
        {/* Savings message */}
        {savings && savings > 0 && (
          <div className="mt-4">
            <p className={`text-base font-medium ${variant === "blue" ? "text-green-200 dark:text-green-300" : "text-green-600 dark:text-green-400"}`}>
              🎉 You are going to save upto {formatCurrency(savings)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}