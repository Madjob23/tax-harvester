export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
}

export interface CapitalGains {
  stcg: {
    profits: number;
    losses: number;
  };
  ltcg: {
    profits: number;
    losses: number;
  };
}

export interface TaxHarvestingState {
  holdings: Holding[];
  capitalGains: CapitalGains;
  postHarvestingGains: CapitalGains;
  selectedHoldingIds: Set<string>;
  isLoading: boolean;
  error: string | null;
}

export type SortDirection = "asc" | "desc";

export type SortableField = 
  | "coin" 
  | "totalHolding" 
  | "currentPrice" 
  | "stcg.gain" 
  | "ltcg.gain"
  | "averageBuyPrice";

export type TaxHarvestingAction =
  | { type: "FETCH_DATA_START" }
  | { type: "FETCH_DATA_SUCCESS"; payload: { holdings: Holding[]; capitalGains: CapitalGains } }
  | { type: "FETCH_DATA_ERROR"; payload: string }
  | { type: "SELECT_HOLDING"; payload: string }
  | { type: "DESELECT_HOLDING"; payload: string }
  | { type: "SELECT_ALL_HOLDINGS" }
  | { type: "DESELECT_ALL_HOLDINGS" };