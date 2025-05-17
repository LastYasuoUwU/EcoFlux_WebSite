import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { zoneData } from "./data";

// Convert the data structure to an array format suitable for Recharts
const prepareChartData = () => {
  const data = [];

  // Extract the first (and only) object from the zoneData array
  const zones = zoneData[0];

  // Loop through all the properties (zones) in the object
  Object.keys(zones).forEach((key) => {
    const zone = zones[key];
    data.push({
      name: zone.name,
      PU: zone.PU,
      consumption: zone.consumption,
      carboneImpact: zone.carboneImpact,
    });
  });

  return data;
};

// Colors for the pie chart segments
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

export default function WorkshopsManagement() {
  const [chartData] = useState(prepareChartData());

  // Labels for the three charts
  const chartLabels = [
    { title: "Consommation en kWh", dataKey: "consumption" },
    { title: "Puissance en kW", dataKey: "PU" },
    { title: "Impact carbone en kgCO2e", dataKey: "carboneImpact" },
  ];

  // Format large numbers with thousands separator
  const formatNumber = (value) => {
    return new Intl.NumberFormat("fr-FR").format(value);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Custom tooltip to show full values
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = payload[0].value;

      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          <p className="font-bold">{data.name}</p>
          <p>{`${payload[0].name}: ${formatNumber(value)}`}</p>
        </div>
      );
    }

    return null;
  };

  // Calculate totals for each metric
  const calculateTotal = (dataKey) => {
    return chartData.reduce((sum, item) => sum + item[dataKey], 0);
  };

  const totalConsumption = calculateTotal("consumption");
  const totalPU = calculateTotal("PU");
  const totalCarbonImpact = calculateTotal("carboneImpact");

  // Sort data for each chart to show biggest segments first
  const getSortedData = (dataKey) => {
    return [...chartData].sort((a, b) => b[dataKey] - a[dataKey]);
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 p-6 rounded-lg">
      {chartLabels.map((chart, index) => {
        const sortedData = getSortedData(chart.dataKey);
        const totalValue = calculateTotal(chart.dataKey);

        return (
          <div
            key={index}
            className="w-full max-w-6xl mb-16 bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              {chart.title}
            </h2>

            <div className="flex flex-col md:flex-row items-center">
              {/* Left side: Chart */}
              <div className="h-96 w-full md:w-2/3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sortedData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={140}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey={chart.dataKey}
                      paddingAngle={2}
                    >
                      {sortedData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Right side: Additional info */}
              <div className="w-full md:w-1/3 mt-8 md:mt-0 md:pl-8">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-blue-800 mb-2">
                    Total {chart.title}
                  </h3>
                  <p className="text-2xl font-bold">
                    {formatNumber(totalValue)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-800 mb-2">
                    Top Contributors
                  </h3>
                  <ul className="space-y-2">
                    {sortedData.slice(0, 3).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b pb-1"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[idx % COLORS.length],
                            }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="font-medium">
                          {formatNumber(item[chart.dataKey])}
                          <span className="text-xs text-gray-500 ml-1">
                            (
                            {((item[chart.dataKey] / totalValue) * 100).toFixed(
                              1
                            )}
                            %)
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Table beneath chart showing all values */}
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border text-left">Zone</th>
                    <th className="py-2 px-4 border text-right">
                      {chart.title}
                    </th>
                    <th className="py-2 px-4 border text-right">Pourcentage</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-4 border">{item.name}</td>
                      <td className="py-2 px-4 border text-right">
                        {formatNumber(item[chart.dataKey])}
                      </td>
                      <td className="py-2 px-4 border text-right">
                        {((item[chart.dataKey] / totalValue) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200 font-bold">
                    <td className="py-2 px-4 border">Total</td>
                    <td className="py-2 px-4 border text-right">
                      {formatNumber(totalValue)}
                    </td>
                    <td className="py-2 px-4 border text-right">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
