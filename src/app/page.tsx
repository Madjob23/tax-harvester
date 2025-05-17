'use client';

import { Suspense } from 'react';
import { TaxHarvestingProvider } from '@/context/TaxHarvestingContext';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Tax Loss Harvesting Tool
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TaxHarvestingProvider>
            <Dashboard />
          </TaxHarvestingProvider>
        </Suspense>
      </div>
    </main>
  );
}