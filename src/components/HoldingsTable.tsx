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
import Image from "next/image";

export default function HoldingsTable() {
  const { state, dispatch } = useTaxHarvesting();
  const { holdings, selectedHoldingIds } = state;
  const [limit, setLimit] = useState(4);
  const [sortField, setSortField] = useState<SortableField>("currentPrice");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, boolean>>({});

  // Handle image error
  const handleImageError = useCallback((coinSymbol: string) => {
    setImageFallbacks(prev => ({
      ...prev,
      [coinSymbol]: true
    }));
  }, []);

  // Get sorted holdings based on current sort settings
  const sortedHoldings = [...holdings].sort((a, b) => {
    let valueA: unknown, valueB: unknown;

    // Handle nested fields
    if (sortField.includes(".")) {
      valueA = getNestedProperty(a, sortField);
      valueB = getNestedProperty(b, sortField);
    } else {
      valueA = a[sortField as keyof typeof a];
      valueB = b[sortField as keyof typeof b];
    }

    // Safely compare values
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      // Numeric comparison
      return sortDirection === "asc" 
        ? valueA - valueB 
        : valueB - valueA;
    } else {
      // String comparison or fallback for other types
      const strA = String(valueA || '');
      const strB = String(valueB || '');
      
      return sortDirection === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
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
      <div className="bg-white dark:bg-slate-800 overflow-x-auto rounded-lg">
        <Table>
          <TableHeader className='bg-blue-50 dark:bg-slate-700'>
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
                  className="flex items-center space-x-1 cursor-pointer dark:text-slate-200" 
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
                  <span className="dark:text-slate-200">Holdings</span>
                  <span className='text-xs text-gray-500 dark:text-slate-400'>Current Market Rate</span>
                  {renderSortIcon("totalHolding")}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center space-x-1 cursor-pointer dark:text-slate-200" 
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
                  className="flex items-center space-x-1 cursor-pointer dark:text-slate-200" 
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
                  className="flex items-center space-x-1 cursor-pointer dark:text-slate-200" 
                  onClick={() => handleSort("ltcg.gain")}
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by long-term gain"
                >
                  <span>Long-Term Gain</span>
                  {renderSortIcon("ltcg.gain")}
                </div>
              </TableHead>
              <TableHead className="dark:text-slate-200">Amount to Sell</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedHoldings.map((holding) => {
              const isSelected = selectedHoldingIds.has(holding.coin);
              
              return (
                <TableRow 
                  key={holding.coin}
                  className={isSelected ? "bg-blue-50 dark:bg-blue-900/20 selection-animate" : "hover:bg-gray-50 dark:hover:bg-slate-700/50"}
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
                      {imageFallbacks[holding.coin] ? (
                        <Image 
                          src="/fallback-coin.svg"
                          alt={holding.coin} 
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <Image 
                          src={holding.logo} 
                          alt={holding.coin} 
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                          onError={() => handleImageError(holding.coin)}
                          unoptimized={!holding.logo.startsWith('/')} // Use unoptimized for external URLs
                        />
                      )}
                      <div>
                        <div className="font-medium dark:text-white">{holding.coin}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[180px]">
                          {holding.coinName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium dark:text-white">{formatNumber(holding.totalHolding)}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{`${formatCurrency(holding.averageBuyPrice)}/${holding.coin}`}</div>
                  </TableCell>
                  <TableCell className="dark:text-white">
                      <NumberWithTooltip value={holding.currentPrice} isCurrency={true} />
                  </TableCell>
                  <TableCell>
                    <div className={holding.stcg.gain > 0 
                                    ? "text-green-600 dark:text-green-400" 
                                    : holding.stcg.gain < 0 
                                      ? "text-red-600 dark:text-red-400" 
                                      : "dark:text-white"
                    }>
                      <NumberWithTooltip value={holding.stcg.gain} isCurrency={true} />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      <NumberWithTooltip value={holding.stcg.balance} isCurrency={false} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={holding.ltcg.gain > 0 
                      ? "text-green-600 dark:text-green-400" 
                      : holding.ltcg.gain < 0 
                        ? "text-red-600 dark:text-red-400" 
                        : "dark:text-white"
                    }>
                      <NumberWithTooltip value={holding.ltcg.gain} isCurrency={true} />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">
                      <NumberWithTooltip value={holding.ltcg.balance} isCurrency={false} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`transition-all duration-200 ${isSelected ? "font-medium dark:text-white" : "text-gray-400 dark:text-slate-500"}`}>
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
            className='underline text-[#0052FE] dark:text-blue-400 p-0'
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