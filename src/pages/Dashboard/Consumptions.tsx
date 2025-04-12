import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Download, Filter, ArrowUp, ArrowDown } from "lucide-react";

// Mock data for demonstration
const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      consumption: Math.random() * 15 + 5,
      demand: Math.random() * 10 + 3,
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days.map((day) => ({
    day,
    consumption: Math.random() * 150 + 50,
    peak: Math.random() * 20 + 10,
  }));
};

const generateMonthlyData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    const month = new Date(2025, i - 1, 1).toLocaleString("default", {
      month: "short",
    });
    data.push({
      month,
      consumption: Math.random() * 3000 + 1000,
      cost: Math.random() * 400 + 100,
    });
  }
  return data;
};

const generateDistributionData = () => {
  return [
    { name: "HVAC", value: 40 },
    { name: "Lighting", value: 20 },
    { name: "Equipment", value: 25 },
    { name: "Other", value: 15 },
  ];
};

export default function Consumption() {
  const [timeframe, setTimeframe] = useState("daily");
  const [chartData, setChartData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [compareMode, setCompareMode] = useState(false);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

  useEffect(() => {
    setLoading(true);

    // Simulate loading data based on selected timeframe
    setTimeout(() => {
      switch (timeframe) {
        case "daily":
          setChartData(generateHourlyData());
          break;
        case "weekly":
          setChartData(generateWeeklyData());
          break;
        case "monthly":
          setChartData(generateMonthlyData());
          break;
        default:
          setChartData(generateHourlyData());
      }

      setDistributionData(generateDistributionData());
      setLoading(false);
    }, 500);
  }, [timeframe]);

  // Calculate key metrics
  const totalConsumption = chartData
    .reduce((sum, item) => sum + (item.consumption || 0), 0)
    .toFixed(2);

  const averageConsumption = (
    totalConsumption / (chartData.length || 1)
  ).toFixed(2);

  const peakConsumption =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.consumption || 0)).toFixed(2)
      : 0;

  const renderTimeframeChart = () => {
    switch (timeframe) {
      case "daily":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="hour"
                tickFormatter={(hour) => `${hour}:00`}
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} unit="kW" />
              <Tooltip
                contentStyle={{ borderRadius: "8px" }}
                formatter={(value) => [`${value.toFixed(2)} kW`, "Consumption"]}
                labelFormatter={(hour) => `${hour}:00`}
              />
              <Legend />
              <Line
                name="Power Consumption"
                type="monotone"
                dataKey="consumption"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              {compareMode && (
                <Line
                  name="Previous Period"
                  type="monotone"
                  dataKey="demand"
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "weekly":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} unit="kWh" />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Legend />
              <Bar
                name="Energy Consumption"
                dataKey="consumption"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              {compareMode && (
                <Bar
                  name="Peak Demand"
                  dataKey="peak"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case "monthly":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#9ca3af"
                fontSize={12}
                unit="kWh"
              />
              {compareMode && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f59e0b"
                  fontSize={12}
                  unit="$"
                />
              )}
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Legend />
              <Line
                yAxisId="left"
                name="Energy Consumption"
                type="monotone"
                dataKey="consumption"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              {compareMode && (
                <Line
                  yAxisId="right"
                  name="Energy Cost"
                  type="monotone"
                  dataKey="cost"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return <p>Select a timeframe to view consumption data</p>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-700">Loading consumption data...</span>
      </div>
    );
  }

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Energy Consumption
          </h2>
          <div className="flex bg-gray-100 rounded-lg">
            <button
              onClick={() => setTimeframe("daily")}
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === "daily" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeframe("weekly")}
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === "weekly" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe("monthly")}
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === "monthly" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{dateRange}</span>
          </div>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-1 text-sm rounded-lg border ${
              compareMode
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "bg-white border-gray-300 text-gray-600"
            }`}
          >
            Compare
          </button>

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Download size={18} />
          </button>

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <ArrowDown size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Consumption</p>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">
                {totalConsumption}
              </p>
              <p className="ml-1 text-gray-600">
                {timeframe === "daily"
                  ? "kWh"
                  : timeframe === "weekly"
                    ? "kWh"
                    : "MWh"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
          <div className="bg-green-100 p-3 rounded-lg">
            <ArrowUp size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Peak Consumption</p>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">
                {peakConsumption}
              </p>
              <p className="ml-1 text-gray-600">
                {timeframe === "daily" ? "kW" : "kWh"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Filter size={24} className="text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Average Consumption</p>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">
                {averageConsumption}
              </p>
              <p className="ml-1 text-gray-600">
                {timeframe === "daily" ? "kW" : "kWh"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {timeframe === "daily"
              ? "Hourly"
              : timeframe === "weekly"
                ? "Daily"
                : "Monthly"}{" "}
            Consumption
          </h3>
          <div className="h-80">{renderTimeframeChart()}</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Consumption Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} %`, "Consumption"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Optimization Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800">
              Peak Shaving Opportunity
            </h4>
            <p className="text-sm text-green-700 mt-1">
              Shifting 20% of your consumption from peak hours (9AM-12PM) could
              save approximately $120 monthly.
            </p>
          </div>
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800">
              Power Factor Improvement
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Improving power factor from 0.92 to 0.98 could eliminate power
              factor penalties and improve efficiency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
