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

// Mock API response (your JSON data)
const mockApiResponse = {
  range: "'Consommation 2019-2025'!A1:Z1000",
  majorDimension: "ROWS",
  values: [
    ["", "", "", "", "", "", "ELECTRICITE"],
    [
      "",
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
      "Total",
    ],
    [
      "2025",
      "61,335",
      "66,236",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "127,571",
    ],
    [
      "2024",
      "67,118",
      "72,339",
      "49,859",
      "29,023",
      "35,157",
      "33,455",
      "37,390",
      "19,458",
      "56,073",
      "71,161",
      "70,227",
      "64,395",
      "605,655",
    ],
    [
      "2023",
      "46,741",
      "33,518",
      "29,334",
      "29,485",
      "35,551",
      "77,536",
      "74,164",
      "51,318",
      "55,217",
      "72,171",
      "82,494",
      "69,306",
      "656,835",
    ],
    [
      "2022",
      "75,417",
      "78,963",
      "71,945",
      "77,248",
      "71,219",
      "88,530",
      "77,412",
      "48,643",
      "58,489",
      "68,531",
      "64,999",
      "63,104",
      "844,500",
    ],
    [
      "2021",
      "84,135",
      "86,044",
      "77,063",
      "83,149",
      "70,818",
      "100,351",
      "96,356",
      "65,640",
      "88,231",
      "88,412",
      "84,031",
      "77,470",
      "1,001,700",
    ],
    [
      "2020",
      "97,502",
      "93,251",
      "84,953",
      "54,736",
      "70,541",
      "98,166",
      "106,033",
      "80,830",
      "92,278",
      "101,067",
      "85,324",
      "91,876",
      "1,056,557",
    ],
    [],
    [
      "2019",
      "78,400",
      "82,420",
      "82,320",
      "86,900",
      "81,650",
      "81,390",
      "100,330",
      "73,100",
      "69,320",
      "103,060",
      "100,190",
      "91,210",
      "1,030,290",
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ["Historique Consommation"],
    [
      "",
      "",
      "",
      "2,013",
      "2,014",
      "2,015",
      "2,016",
      "2,017",
      "2,018",
      "2,019",
      "2,020",
      "2,021",
      "2,022",
      "2,023",
      "2,024",
    ],
    [
      "Consommation électricité en [MWh]",
      "",
      "",
      "809",
      "843",
      "956",
      "998",
      "1,082",
      "971",
      "1,030",
      "1,057",
      "1,002",
      "845",
      "657",
      "606",
    ],
    [
      "Consommation électricité en [KWh]",
      "",
      "",
      "808,000",
      "842,000",
      "956,000",
      "998,000",
      "1,082,190",
      "971,190",
      "1,030,280",
      "1,056,557",
      "1,001,700",
      "844,500",
      "656,835",
      "605,655",
    ],
  ],
};

// Type definitions
interface MonthlyData {
  month: string;
  [key: string]: number | string;
}

interface HistoricalData {
  year: number;
  consumption: number;
}

// Utility function to parse numbers with comma as thousands separator
const parseNumber = (value: string): number => {
  if (!value || value === "") return 0;
  return parseFloat(value.replace(/,/g, ""));
};

// Transform the API response into usable data
const transformApiResponse = (response: typeof mockApiResponse) => {
  const values = response.values;

  // Find the monthly data (starts from row index 1)
  const monthlyDataStart = 1;
  const monthlyDataEnd = 9; // Adjust based on your data structure

  // Extract months from header row
  const months = values[monthlyDataStart].slice(1, 13) as string[];

  // Transform monthly data for line chart
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

  // Find historical data (looks for row with "Historique Consommation")
  let historicalStartIndex = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] && values[i][0] === "Historique Consommation") {
      historicalStartIndex = i;
      break;
    }
  }

  // Transform historical data for bar chart (using kWh row instead of MWh)
  let historicalData: HistoricalData[] = [];
  if (historicalStartIndex !== -1 && values[historicalStartIndex + 3]) {
    const yearRow = values[historicalStartIndex + 1];
    const consumptionRow = values[historicalStartIndex + 3]; // Using kWh row instead of MWh

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

  return { monthlyChartData, historicalData };
};

// Custom tooltip to format numbers nicely
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} kWh`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardPage: React.FC = () => {
  // Transform the API response data
  const { monthlyChartData, historicalData } = useMemo(() => {
    return transformApiResponse(mockApiResponse);
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
        Tableau de bord de la consommation d’électricité
      </h1>

      {/* Monthly Consumption Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Consommation mensuelle par année (en Kwh)
        </h2>
        <div className="h-96">
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
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    connectNulls={false}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Overview Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Aperçu de la consommation annuelle (en Kwh)
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString()} kWh`,
                  "Consumption",
                ]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar dataKey="consumption" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
