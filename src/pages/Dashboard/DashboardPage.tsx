import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { dashboardData } from "./data";

// Types
interface MonthlyData {
  month: string;
  [key: string]: number | string;
}

interface HistoricalData {
  year: number;
  consumption: number;
}

interface CarbonImpactData {
  year: number;
  impact: number;
}

// Utility functions
const parseNumber = (value: string): number => {
  if (!value || value === "") return 0;
  return parseFloat(value.replace(/,/g, ""));
};

// Component for chart container
const ChartContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="h-96">{children}</div>
  </div>
);

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
  unit = "kWh",
  dataName = "Consumption",
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${
              entry.name || dataName
            }: ${entry.value.toLocaleString()} ${unit}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardPage: React.FC = () => {
  // Transform the API response data
  const { monthlyChartData, historicalData, carbonImpactData } = useMemo(() => {
    const values = dashboardData.values;

    // MONTHLY DATA EXTRACTION
    const monthlyDataStart = 1;
    const monthlyDataEnd = 9;
    const months = values[monthlyDataStart].slice(1, 13) as string[];

    const monthlyChartData: MonthlyData[] = months.map((month, index) => {
      const dataPoint: MonthlyData = { month };

      for (
        let rowIndex = monthlyDataStart + 1;
        rowIndex < monthlyDataEnd;
        rowIndex++
      ) {
        const row = values[rowIndex];
        if (row && row[0] && row[0] !== "") {
          const year = row[0] as string;
          const value = row[index + 1] as string;
          dataPoint[year] = parseNumber(value);
        }
      }

      return dataPoint;
    });

    // HISTORICAL DATA EXTRACTION
    let historicalData: HistoricalData[] = [];
    let historicalDataIndex = -1;

    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === "Historique Consommation") {
        historicalDataIndex = i;
        break;
      }
    }

    if (historicalDataIndex !== -1) {
      const yearRow = values[historicalDataIndex + 1];
      const consumptionRow = values[historicalDataIndex + 3]; // Using kWh row

      if (yearRow && consumptionRow) {
        for (let i = 3; i < yearRow.length; i++) {
          const year = parseNumber(yearRow[i] as string);
          const consumption = parseNumber(consumptionRow[i] as string);

          if (year && consumption) {
            historicalData.push({ year, consumption });
          }
        }
      }
    }

    // CARBON IMPACT DATA EXTRACTION
    let carbonImpactData: CarbonImpactData[] = [];
    let carbonDataIndex = -1;

    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === "Impact carbone en kgCO2e") {
        carbonDataIndex = i;
        break;
      }
    }

    if (carbonDataIndex !== -1) {
      const yearRow = values[carbonDataIndex + 1];
      const impactRow = values[carbonDataIndex + 2];

      if (yearRow && impactRow) {
        for (let i = 0; i < yearRow.length; i++) {
          if (yearRow[i]) {
            const year = parseNumber(yearRow[i] as string);
            const impact = parseNumber(impactRow[i] as string);

            if (year && impact) {
              carbonImpactData.push({ year, impact });
            }
          }
        }
      }
    }

    return { monthlyChartData, historicalData, carbonImpactData };
  }, []);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#82d982",
  ];

  return (
    <div className="w-full p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tableau de bord de la consommation d'électricité
      </h1>

      {/* Monthly Consumption Chart */}
      <ChartContainer title="Consommation mensuelle par année (en kWh)">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {Object.keys(monthlyChartData[0] || {})
              .filter((key) => key !== "month")
              .map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={year}
                  name={year}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  connectNulls={true}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Historical Overview Chart */}
      <ChartContainer title="Aperçu de la consommation annuelle (en kWh)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
            <Tooltip content={<CustomTooltip dataName="Consommation" />} />
            <Bar dataKey="consumption" name="Consommation" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Carbon Impact Chart */}
      <ChartContainer title="Impact carbone annuel (en kgCO2e)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={carbonImpactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
            <Tooltip
              content={
                <CustomTooltip unit="kgCO2e" dataName="Impact carbone" />
              }
            />
            <Bar dataKey="impact" name="Impact carbone" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default DashboardPage;
