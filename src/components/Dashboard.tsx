// @/components/Dashboard.tsx (updated)
'use client';

import { useTaxHarvesting } from "@/context/TaxHarvestingContext";
import { calculateTaxSavings } from "@/lib/calculations";
import DisclaimerAccordion from "@/components/DisclaimerAccordion";
import CapitalGainsCard from "@/components/CapitalGainsCard";
import HoldingsTable from "@/components/HoldingsTable";
import LoadingState from "@/components/LoadingState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { state } = useTaxHarvesting();
  const { isLoading, error, capitalGains, postHarvestingGains, holdings, selectedHoldingIds } = state;
  const savings = calculateTaxSavings(capitalGains, postHarvestingGains);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}. Please refresh the page to try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <DisclaimerAccordion />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="responsive-card">
          <CapitalGainsCard
            title="Capital Gains (Pre-Harvesting)"
            capitalGains={capitalGains}
            variant="dark"
          />
        </div>
        
        <div className="responsive-card">
          <CapitalGainsCard
            title="Capital Gains (After-Harvesting)"
            capitalGains={postHarvestingGains}
            variant="blue"
            savings={savings}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0 dark:text-white">Your Holdings</h2>
          <div className="text-sm text-gray-500 dark:text-slate-400">
            {selectedHoldingIds.size} of {holdings.length} selected
          </div>
        </div>
        <div className="responsive-table-container">
          <HoldingsTable />
        </div>
      </div>
    </div>
  );
}