'use client';

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { TaxHarvestingState, TaxHarvestingAction } from "@/types";
import { fetchCapitalGains, fetchHoldings } from "@/services/api";
import { calculatePostHarvestingGains } from "@/lib/calculations";

// Initial state
const initialState: TaxHarvestingState = {
  holdings: [],
  capitalGains: {
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  },
  postHarvestingGains: {
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  },
  selectedHoldingIds: new Set<string>(),
  isLoading: false,
  error: null,
};

// Reducer function
const reducer = (state: TaxHarvestingState, action: TaxHarvestingAction): TaxHarvestingState => {
  switch (action.type) {
    case "FETCH_DATA_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        holdings: action.payload.holdings,
        capitalGains: action.payload.capitalGains,
        postHarvestingGains: action.payload.capitalGains, // Initially the same
        isLoading: false,
      };
    case "FETCH_DATA_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SELECT_HOLDING": {
      const newSelectedIds = new Set(state.selectedHoldingIds);
      newSelectedIds.add(action.payload);
      
      return {
        ...state,
        selectedHoldingIds: newSelectedIds,
        postHarvestingGains: calculatePostHarvestingGains(
          state.capitalGains,
          state.holdings,
          newSelectedIds
        ),
      };
    }
    case "DESELECT_HOLDING": {
      const newSelectedIds = new Set(state.selectedHoldingIds);
      newSelectedIds.delete(action.payload);
      
      return {
        ...state,
        selectedHoldingIds: newSelectedIds,
        postHarvestingGains: calculatePostHarvestingGains(
          state.capitalGains,
          state.holdings,
          newSelectedIds
        ),
      };
    }
    case "SELECT_ALL_HOLDINGS": {
      const allIds = new Set(state.holdings.map(h => h.coin));
      
      return {
        ...state,
        selectedHoldingIds: allIds,
        postHarvestingGains: calculatePostHarvestingGains(
          state.capitalGains,
          state.holdings,
          allIds
        ),
      };
    }
    case "DESELECT_ALL_HOLDINGS":
      return {
        ...state,
        selectedHoldingIds: new Set(),
        postHarvestingGains: state.capitalGains, // Reset to initial
      };
    default:
      return state;
  }
};

// Context type
interface TaxHarvestingContextType {
  state: TaxHarvestingState;
  dispatch: React.Dispatch<TaxHarvestingAction>;
}

// Create the context
const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined);

// Provider component
export const TaxHarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_DATA_START" });
      try {
        const [holdings, capitalGains] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        dispatch({ 
          type: "FETCH_DATA_SUCCESS", 
          payload: { holdings, capitalGains } 
        });
      } catch (error) {
        dispatch({ 
          type: "FETCH_DATA_ERROR", 
          payload: `Failed to fetch data. ${error}` 
        });
      }
    };
    
    fetchData();
  }, []);

  return (
    <TaxHarvestingContext.Provider value={{ state, dispatch }}>
      {children}
    </TaxHarvestingContext.Provider>
  );
};

// Custom hook to use the context
export const useTaxHarvesting = () => {
  const context = useContext(TaxHarvestingContext);
  if (context === undefined) {
    throw new Error("useTaxHarvesting must be used within a TaxHarvestingProvider");
  }
  return context;
};