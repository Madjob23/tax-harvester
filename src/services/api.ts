import { CapitalGains, Holding } from "@/types";

// Mock API data for holdings
const HOLDINGS_DATA: Holding[] = [
  {
    "coin": "USDC",
    "coinName": "USDC",
    "logo": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    "currentPrice": 85.41,
    "totalHolding": 0.0015339999999994802,
    "averageBuyPrice": 1.5863185433764244,
    "stcg": {
      "balance": 0.0015339999999994802,
      "gain": 0.12858552735441697
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "WETH",
    "coinName": "Polygon PoS Bridged WETH (Polygon POS)",
    "logo": "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
    "currentPrice": 211756,
    "totalHolding": 0.00023999998390319965,
    "averageBuyPrice": 3599.856066001555,
    "stcg": {
      "balance": 0.00023999998390319965,
      "gain": 49.957471193511736
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "WPOL",
    "coinName": "Wrapped POL",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 22.08,
    "totalHolding": 2.3172764293128694,
    "averageBuyPrice": 0.5227311370876341,
    "stcg": {
      "balance": 1.3172764293128694,
      "gain": 49.954151016387065
    },
    "ltcg": {
      "balance": 1,
      "gain": 20
    }
  },
  {
    "coin": "MATIC",
    "coinName": "Polygon",
    "logo": "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
    "currentPrice": 22.22,
    "totalHolding": 2.75145540184285,
    "averageBuyPrice": 0.6880274617804887,
    "stcg": {
      "balance": 2.75145540184285,
      "gain": 59.244262152615974
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "GONE",
    "coinName": "Gone",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.0001462,
    "totalHolding": 696324.3075326696,
    "averageBuyPrice": 0.00001637624055112482,
    "stcg": {
      "balance": 696324.3075326696,
      "gain": 90.39943939952589
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "ETH",
    "coinName": "Ethereum",
    "logo": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    "currentPrice": 216182,
    "totalHolding": 0.0004211938732637162,
    "averageBuyPrice": 3909.792264648455,
    "stcg": {
      "balance": 0.0004211938732637162,
      "gain": 89.40775336229291
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "EZ",
    "coinName": "EasyFi V2",
    "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    "currentPrice": 0.885074,
    "totalHolding": 0.0005424384664524931,
    "averageBuyPrice": 6.539367177529248,
    "stcg": {
      "balance": 0.0005424384664524931,
      "gain": -0.0030671061200917595
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  },
  {
    "coin": "FRM",
    "coinName": "Ferrum Network",
    "logo": "https://coin-images.coingecko.com/coins/images/8251/large/FRM.png?1696508455",
    "currentPrice": 0.093794,
    "totalHolding": 6.442993445432421e-7,
    "averageBuyPrice": 0.453964789704584,
    "stcg": {
      "balance": 6.442993445432421e-7,
      "gain": -2.3205780373028534e-7
    },
    "ltcg": {
      "balance": 0,
      "gain": 0
    }
  }
];

// Mock API data for capital gains
const CAPITAL_GAINS_DATA: CapitalGains = {
  stcg: { profits: 70200.88, losses: 1548.53 },
  ltcg: { profits: 5020, losses: 3050 },
};

/**
 * Fetches the holdings data
 * @returns Promise that resolves to the holdings data
 */
export const fetchHoldings = (): Promise<Holding[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => resolve(HOLDINGS_DATA), 800);
  });
};

/**
 * Fetches the capital gains data
 * @returns Promise that resolves to the capital gains data
 */
export const fetchCapitalGains = (): Promise<CapitalGains> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => resolve(CAPITAL_GAINS_DATA), 600);
  });
};