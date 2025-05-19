import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

export default function DisclaimersAccordion() {
  return (
    <Accordion type="single" collapsible className="border rounded-lg border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30">
      <AccordionItem value="disclaimers" className="border-none">
        <AccordionTrigger className="px-4 py-3 text-base font-medium text-left flex hover:no-underline">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="dark:text-white">Important Notes & Disclaimers</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4 dark:text-slate-300">
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}