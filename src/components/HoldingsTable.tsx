import { useState, useCallback } from "react";
import { useTaxHarvesting } from "@/context/TaxHarvestingContext";
import { formatCurrency, formatNumber, getNestedProperty } from "@/lib/utils";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SortableField, SortDirection } from "@/types";
import NumberWithTooltip from '@/components/NumberWithTooltip';

export default function HoldingsTable() {
  const { state, dispatch } = useTaxHarvesting();
  const { holdings, selectedHoldingIds } = state;
  const [limit, setLimit] = useState(4);
  const [sortField, setSortField] = useState<SortableField>("currentPrice");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get sorted holdings based on current sort settings
  const sortedHoldings = [...holdings].sort((a, b) => {
    let valueA, valueB;

    // Handle nested fields
    if (sortField.includes(".")) {
      valueA = getNestedProperty(a, sortField);
      valueB = getNestedProperty(b, sortField);
    } else {
      valueA = a[sortField as keyof typeof a];
      valueB = b[sortField as keyof typeof b];
    }

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const displayedHoldings = limit < holdings.length 
    ? sortedHoldings.slice(0, limit) 
    : sortedHoldings;

  const handleSelectAll = useCallback(() => {
    if (selectedHoldingIds.size === holdings.length) {
      dispatch({ type: "DESELECT_ALL_HOLDINGS" });
    } else {
      dispatch({ type: "SELECT_ALL_HOLDINGS" });
    }
  }, [dispatch, holdings.length, selectedHoldingIds.size]);

  const handleSort = useCallback((field: SortableField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }, [sortField, sortDirection]);

  const renderSortIcon = useCallback((field: SortableField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  }, [sortField, sortDirection]);

  return (
    <div className="space-y-4">
      <div className="bg-white overflow-x-auto rounded-lg">
        <Table>
          <TableHeader className='bg-blue-50'>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedHoldingIds.size === holdings.length && holdings.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label={selectedHoldingIds.size === holdings.length ? "Deselect all" : "Select all"}
                />
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center space-x-1 cursor-pointer" 
                  onClick={() => handleSort("coin")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by asset"
                >
                  <span>Asset</span>
                  {renderSortIcon("coin")}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex flex-col items-start space-x-1 cursor-pointer" 
                  onClick={() => handleSort("totalHolding")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by holdings"
                >
                  <span>Holdings</span>
                  <span className='text-xs text-gray-500'>Current Market Rate</span>
                  {renderSortIcon("totalHolding")}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center space-x-1 cursor-pointer" 
                  onClick={() => handleSort("currentPrice")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by current price"
                >
                  <span>Current Price</span>
                  {renderSortIcon("currentPrice")}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center space-x-1 cursor-pointer" 
                  onClick={() => handleSort("stcg.gain")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by short-term gain"
                >
                  <span>Short-Term Gain</span>
                  {renderSortIcon("stcg.gain")}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center space-x-1 cursor-pointer" 
                  onClick={() => handleSort("ltcg.gain")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by long-term gain"
                >
                  <span>Long-Term Gain</span>
                  {renderSortIcon("ltcg.gain")}
                </div>
              </TableHead>
              <TableHead>Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedHoldings.map((holding) => {
              const isSelected = selectedHoldingIds.has(holding.coin);
              
              return (
                <TableRow 
                  key={holding.coin}
                  className={isSelected ? "bg-blue-50 selection-animate" : "hover:bg-gray-50"}
                >
                  <TableCell>
                    <Checkbox 
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          dispatch({ type: "SELECT_HOLDING", payload: holding.coin });
                        } else {
                          dispatch({ type: "DESELECT_HOLDING", payload: holding.coin });
                        }
                      }}
                      aria-label={`Select ${holding.coin}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={holding.logo} 
                        alt={holding.coin} 
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/fallback-coin.svg" }}
                      />
                      <div>
                        <div className="font-medium">{holding.coin}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[180px]">
                          {holding.coinName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatNumber(holding.totalHolding)}</div>
                    <div className="text-xs text-gray-500">{`${formatCurrency(holding.averageBuyPrice)}/${holding.coin}`}</div>
                  </TableCell>
                  <TableCell>
                      <NumberWithTooltip value={holding.currentPrice} isCurrency={true} />
                  </TableCell>
                  <TableCell>
                    <div className={holding.stcg.gain >= 0 ? "text-green-600" : "text-red-600"}>
                      <NumberWithTooltip value={holding.stcg.gain} isCurrency={true} />
                    </div>
                    <div className="text-xs text-gray-500">
                      <NumberWithTooltip value={holding.stcg.balance} isCurrency={false} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={holding.ltcg.gain >= 0 ? "text-green-600" : "text-red-600"}>
                      <NumberWithTooltip value={holding.ltcg.gain} isCurrency={true} />
                    </div>
                    <div className="text-xs text-gray-500">
                      <NumberWithTooltip value={holding.ltcg.balance} isCurrency={false} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`transition-all duration-200 ${isSelected ? "font-medium" : "text-gray-400"}`}>
                      {isSelected ? formatNumber(holding.totalHolding) : "-"}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {holdings.length > 4 && (
        <div className="mt-4">
          <Button
            variant="link"
            className='underline text-[#0052FE] p-0'
            onClick={() => setLimit(limit === holdings.length ? 4 : holdings.length)}
            aria-label={limit === holdings.length ? "View less items" : "View all items"}
          >
            {limit === holdings.length ? "View Less" : "View All"}
          </Button>
        </div>
      )}
    </div>
  );
}