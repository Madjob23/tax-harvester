import { CapitalGains, Holding } from "@/types";

/**
 * Calculates the net gains from capital gains data
 * @param gains Capital gains data
 * @returns Object containing netSTCG, netLTCG, and realisedGains
 */
export const calculateNetGains = (gains: CapitalGains) => {
  const netSTCG = gains.stcg.profits - gains.stcg.losses;
  const netLTCG = gains.ltcg.profits - gains.ltcg.losses;
  const realisedGains = netSTCG + netLTCG;
  
  return {
    netSTCG,
    netLTCG,
    realisedGains,
  };
};

/**
 * Calculates the post-harvesting gains based on selected holdings
 * @param initialGains Initial capital gains from API
 * @param holdings List of all holdings
 * @param selectedHoldingIds Set of selected holding IDs
 * @returns Updated capital gains after harvesting
 */
export const calculatePostHarvestingGains = (
  initialGains: CapitalGains,
  holdings: Holding[],
  selectedHoldingIds: Set<string>
): CapitalGains => {
  // Create a deep copy of the initial gains
  const postHarvestGains: CapitalGains = {
    stcg: { ...initialGains.stcg },
    ltcg: { ...initialGains.ltcg },
  };

  // Get selected holdings
  const selectedHoldings = holdings.filter(holding => selectedHoldingIds.has(holding.coin));

  // Update gains based on selected holdings
  selectedHoldings.forEach(holding => {
    // Short-term gains
    if (holding.stcg.gain > 0) {
      postHarvestGains.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      postHarvestGains.stcg.losses += Math.abs(holding.stcg.gain);
    }

    // Long-term gains
    if (holding.ltcg.gain > 0) {
      postHarvestGains.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      postHarvestGains.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  });

  return postHarvestGains;
};

/**
 * Calculates the tax savings between pre and post harvesting
 * @param preHarvestGains Pre-harvesting capital gains
 * @param postHarvestGains Post-harvesting capital gains
 * @returns The amount saved (or 0 if no savings)
 */
export const calculateTaxSavings = (
  preHarvestGains: CapitalGains,
  postHarvestGains: CapitalGains
): number => {
  const { realisedGains: preRealisedGains } = calculateNetGains(preHarvestGains);
  const { realisedGains: postRealisedGains } = calculateNetGains(postHarvestGains);

  return preRealisedGains > postRealisedGains 
    ? preRealisedGains - postRealisedGains 
    : 0;
};