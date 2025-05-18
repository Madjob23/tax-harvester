# Tax Loss Harvesting Tool

A sophisticated web application designed to help cryptocurrency investors optimize their tax strategy by identifying opportunities for tax loss harvesting.

![Tax Loss Harvesting Dashboard](public/dashboard-screenshot.png)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Overview

This Tax Loss Harvesting Tool helps crypto investors minimize their tax liability by strategically selling assets at a loss to offset capital gains. The application visualizes your current capital gains situation and allows you to select specific holdings to harvest for tax benefits.

## Features

- **Real-time Capital Gains Tracking**: View your short-term and long-term capital gains/losses
- **Interactive Holdings Table**: Sort and select cryptocurrency holdings for tax loss harvesting
- **Tax Savings Calculator**: Instantly see potential tax savings based on selected assets
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
src/
├── app/               # Next.js app directory
├── components/        # UI components
├── context/           # TaxHarvestingContext for state management
├── lib/               # Utility functions and calculations
├── services/          # API service functions
└── types/             # TypeScript type definitions
```

## Key Components

- **Dashboard**: Main container for the application UI
- **CapitalGainsCard**: Displays capital gains information
- **HoldingsTable**: Interactive table for selecting assets to harvest
- **TaxHarvestingContext**: Manages application state and calculations

## Assumptions

This application makes the following assumptions:

1. **Tax Rate**: Uses standard tax rates for short-term and long-term capital gains calculations (actual rates may vary by jurisdiction and income level)
2. **Asset Cost Basis**: Calculates using the first-in, first-out (FIFO) method
3. **Holding Period**: Assumes assets held more than 1 year qualify for long-term capital gains treatment
4. **Wash Sale Rules**: While traditional securities have wash sale restrictions, this tool assumes cryptocurrency transactions are not subject to wash sale rules (as per current regulations in many jurisdictions)
5. **Data Freshness**: Price data should be updated regularly for accurate calculations

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Lucide React](https://lucide.dev/) - Icon library

## Screenshots

![Capital Gains Overview](public/capital-gains-screenshot.png)
![Holdings Selection Interface](public/holdings-screenshot.png)

## Customization

You can customize the application by:

1. Modifying the tax rates in the calculations
2. Updating the UI theme in `src/app/globals.css`
3. Adding additional asset types to the data model
