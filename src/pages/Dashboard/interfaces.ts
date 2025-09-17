export interface EnergyConsumptionPivot {
  month_name: string;
  year: number | null;
}

// Types
export interface MonthlyData {
  month: string;
  [key: string]: number | string;
}

export interface HistoricalData {
  year: number;
  consumption: number;
  days: number;
  comment?: string;
}

export interface CarbonImpactData {
  year: number;
  impact: number;
  days: number;
  comment?: string;
}

export interface EnhancedTooltipInterface {
  active?: boolean;
  payload?: {
    color?: string;
    name: string;
    value: number;
    payload: {
      comment?: string;
      consumption?: number;
      days?: number;
      year?: number;
    };
  }[];
  label?: string;
  dataName?: string;
  unit?: string;
}

export interface EnergyRow {
    year: string;
    [month: string]: number | string;
}