import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface NumberWithTooltipProps {
  value: number;
  isCurrency?: boolean;
  className?: string;
}

const NumberWithTooltip: React.FC<NumberWithTooltipProps> = ({
  value,
  isCurrency = false,
  className = '',
}) => {
  // Don't show tooltip for zero values
  if (value === 0) {
    return (
      <span className={className}>
        {isCurrency ? formatCurrency(value) : formatNumber(value)}
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>
          {isCurrency ? formatCurrency(value) : formatNumber(value)}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isCurrency 
            ? new Intl.NumberFormat("en-US", { 
                style: "currency", 
                currency: "USD",
                minimumFractionDigits: 8,
                maximumFractionDigits: 8 
                }).format(value)
            : value.toFixed(8)
            }
        </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NumberWithTooltip;