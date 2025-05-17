import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const bgColor = variant === "dark" ? "bg-gray-900" : "bg-blue-600";

  return (
    <Card className={`${bgColor} text-white overflow-hidden h-full`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Short-term</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-gray-400">Profits</div>
                <div className="font-medium">{formatCurrency(capitalGains.stcg.profits)}</div>
              </div>
              <div>
                <div className="text-gray-400">Losses</div>
                <div className="font-medium">{formatCurrency(capitalGains.stcg.losses)}</div>
              </div>
            </div>
            <div className="pt-1">
              <div className="text-gray-400 text-sm">Net Short-Term Capital Gains</div>
              <div className="font-semibold">{formatCurrency(netSTCG)}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Long-term</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-gray-400">Profits</div>
                <div className="font-medium">{formatCurrency(capitalGains.ltcg.profits)}</div>
              </div>
              <div>
                <div className="text-gray-400">Losses</div>
                <div className="font-medium">{formatCurrency(capitalGains.ltcg.losses)}</div>
              </div>
            </div>
            <div className="pt-1">
              <div className="text-gray-400 text-sm">Net Long-Term Capital Gains</div>
              <div className="font-semibold">{formatCurrency(netLTCG)}</div>
            </div>
          </div>

          <div className="pt-1 border-t border-gray-700/50">
            <div className="text-gray-300 text-sm">Realised Capital Gains</div>
            <div className="font-bold text-lg">{formatCurrency(realisedGains)}</div>
          </div>

          {savings && savings > 0 && (
            <div className="bg-green-500/20 p-3 rounded-md mt-2 transition-all duration-300 animate-pulse">
              <p className="text-sm font-medium">
                You&apos;re going to save {formatCurrency(savings)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}