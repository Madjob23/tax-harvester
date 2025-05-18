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
          <span className={`font-medium text-sm underline text-[#0052FE] cursor-pointer ${className}`}>
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-md p-5 bg-gray-900 text-white border-none rounded-md shadow-lg"
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
              borderBottom: "8px solid rgb(17, 24, 39)"
            }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}