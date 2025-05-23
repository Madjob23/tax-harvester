'use client';

import { Suspense } from 'react';
import { TaxHarvestingProvider } from '@/context/TaxHarvestingContext';
import Dashboard from '@/components/Dashboard';
import NormalTooltip from '@/components/NormalTooltip';
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 gap-3 flex items-center justify-between">
          Tax Harvesting
          <NormalTooltip
            text="How it works?" 
            tooltipContent={
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.{" "}
                <a href="#" className="text-primary underline">Know More</a>
              </p>
            }
          />
        </h1>
          <ThemeToggle />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TaxHarvestingProvider>
            <Dashboard />
          </TaxHarvestingProvider>
        </Suspense>
        <a href="https://www.flaticon.com/free-icons/yield" title="yield icons">Yield icons created by Awicon - Flaticon</a>
      </div>
    </main>
  );
}