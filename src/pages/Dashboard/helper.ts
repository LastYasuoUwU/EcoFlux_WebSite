import { supabase } from "../../supabaseClients";
import { numberOfDays } from "./data";
import {
  CarbonImpactData,
  EnergyConsumptionPivot,
  HistoricalData,
  MonthlyData,
} from "./interfaces";

export async function getEnergyConsumptionPivot(): Promise<
  EnergyConsumptionPivot[]
> {
  try {
    const { data: energyConsumption, error } = await supabase.rpc(
      "get_energy_consumption"
    );

    if (error) {
      console.error("Error fetching energy consumption pivot:", error);
      throw error;
    }

    return energyConsumption || [];
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
}

// -------------------------------------------------------------------------------

// Utility functions
const parseNumber = (value: string): number => {
  if (!value || value === "") return 0;
  return parseFloat(value.replace(/,/g, ""));
};

// Helper function to get days data for a specific year
const getDaysForYear = (year: number): { days?: number; comment?: string } => {
  const dayData = numberOfDays.find((d) => d.year === year);
  return {
    days: dayData?.daysNumber || undefined,
    comment: dayData?.comment || undefined,
  };
};

const findRowIndex = (values: any[][], label: string): number =>
  values.findIndex((row) => row[0] === label);

export const extractMonthlyData = (
  values: any[][],
  start: number,
  end: number
): MonthlyData[] => {
  const months = values[start].slice(1, 13) as string[];

  return months.map((month, index) => {
    const dataPoint: MonthlyData = { month };

    for (let rowIndex = start + 1; rowIndex < end; rowIndex++) {
      const row = values[rowIndex];
      if (row?.[0]) {
        const year = row[0] as string;
        const value = row[index + 1] as string;
        dataPoint[year] = parseNumber(value);
      }
    }

    return dataPoint;
  });
};

export const extractHistoricalData = (
  values: any[][],
  label: string
): HistoricalData[] => {
  const index = findRowIndex(values, label);
  if (index === -1) return [];

  const yearRow = values[index + 1];
  const consumptionRow = values[index + 3]; // using kWh row

  if (!yearRow || !consumptionRow) return [];

  return yearRow
    .slice(3)
    .map((yearStr, i) => {
      const year = parseNumber(yearStr as string);
      const consumption = parseNumber(consumptionRow[i + 3] as string);
      if (!year || !consumption) return null;

      const dayData = getDaysForYear(year);
      return {
        year,
        consumption,
        days: dayData.days,
        comment: dayData.comment,
      };
    })
    .filter(Boolean) as HistoricalData[];
};

export const extractCarbonImpactData = (
  values: any[][],
  label: string
): CarbonImpactData[] => {
  const index = findRowIndex(values, label);
  if (index === -1) return [];

  const yearRow = values[index + 1];
  const impactRow = values[index + 2];

  if (!yearRow || !impactRow) return [];

  return yearRow
    .map((yearStr, i) => {
      const year = parseNumber(yearStr as string);
      const impact = parseNumber(impactRow[i] as string);
      if (!year || !impact) return null;

      const dayData = getDaysForYear(year);
      return {
        year,
        impact,
        days: dayData.days,
        comment: dayData.comment,
      };
    })
    .filter(Boolean) as CarbonImpactData[];
};

export const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#82d982",
];
