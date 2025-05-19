"use client";

import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NormalTooltipProps {
  text?: string;
  tooltipContent: ReactNode;
  className?: string;
}

export default function NormalTooltip({
  text = "",
  tooltipContent,
  className = "",
}: NormalTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`font-medium text-sm underline text-primary cursor-pointer ${className}`}>
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-md p-5 bg-popover text-popover-foreground border-none rounded-md shadow-lg dark:bg-slate-900"
          sideOffset={5}
        >
          {tooltipContent}
          <div className="tooltip-arrow" 
            style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "8px solid var(--popover, rgb(17, 24, 39))"
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}