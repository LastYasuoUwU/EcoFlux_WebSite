import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  BatteryCharging,
  Battery,
  ArrowDownCircle,
  DollarSign,
} from "lucide-react";

// Mock data URL - In production, replace with actual API endpoint
const DATA_URL =
  "https://docs.google.com/spreadsheets/d/1DJwf0gs7aZmwT1UrR8fWFIHugYMt1YnB/edit?usp=drive_link&ouid=102773507595007994476&rtpof=true&sd=true";

// Mock data generator functions
const generatePowerData = () => {
  const now = new Date();
  const data = [];
  for (let i = 0; i < 24; i++) {
    const hour = (now.getHours() - 23 + i + 24) % 24;
    data.push({
      time: `${hour}:00`,
      consumption: Math.random() * 15 + 5,
      voltage: Math.random() * 5 + 220,
      current: Math.random() * 10 + 2,
    });
  }
  return data;
};

const generateDailyData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: i + 1,
      consumption: Math.random() * 100 + 50,
      cost: Math.random() * 15 + 5,
    });
  }
  return data;
};

const generateRealtimeData = () => {
  // In a real implementation, this would fetch from your API
  const realtimeData = [];
  const now = new Date();

  // Generate data for the last 2 minutes in 5-second intervals
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (24 - i) * 5000);
    realtimeData.push({
      time: time.toLocaleTimeString(),
      value: Math.random() * 8 + 10, // Random value between 10-18 kW
    });
  }

  return realtimeData;
};

export default function DashboardPage() {
  const [powerData, setPowerData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [realtimeData, setRealtimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);

  // Initial data load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a production environment, you would fetch actual data from your API
        // For demonstration, we're using mock data but mentioning the Google Sheets URL
        console.log("Data would be fetched from:", DATA_URL);

        const hourlyData = generatePowerData();
        const monthlyData = generateDailyData();
        const rtData = generateRealtimeData();

        setPowerData(hourlyData);
        setDailyData(monthlyData);
        setRealtimeData(rtData);
        setCurrentUsage(rtData[rtData.length - 1].value);
        setVoltage(hourlyData[hourlyData.length - 1].voltage);
        setCurrent(hourlyData[hourlyData.length - 1].current);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Real-time data update every 5 seconds
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setRealtimeData((prevData) => {
        const newData = [...prevData.slice(1)];
        const now = new Date();
        const newValue = Math.random() * 8 + 10; // Random value between 10-18 kW

        newData.push({
          time: now.toLocaleTimeString(),
          value: newValue,
        });

        setCurrentUsage(newValue);
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  // Calculate some additional metrics
  const averageConsumption = powerData.length
    ? powerData.reduce((sum, item) => sum + item.consumption, 0) /
      powerData.length
    : 0;

  const dailyTotal = powerData.length
    ? powerData.reduce((sum, item) => sum + item.consumption, 0)
    : 0;

  const monthlyCost = dailyData.length
    ? dailyData.reduce((sum, item) => sum + item.cost, 0).toFixed(2)
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 bg-gray-50">
        <div className="text-blue-600 animate-spin w-16 h-16">
          <Zap size={64} />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          chargement PowerLogic™ PM5100 Data...
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Device Summary */}
      <div>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm">
            <div className="mr-4">
              <h2 className="text-lg font-medium">
                PowerLogic™ PM5100 - Model EAV15105-FR11
              </h2>
              <p className="text-sm text-wrap">
                Compteur de puissance avancé avec des capacités de surveillance
                et de mesure de haute précision
              </p>
            </div>
            <div className="mt-2 md:mt-0 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500">Serie:</span>
                <span className="ml-2 font-medium">PM51-22871</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Firmware:</span>
                <span className="ml-2 font-medium">v3.2.1</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Status:</span>
                <span className="ml-2 font-medium text-green-600">Online</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">dernier mise à jour:</span>
                <span className="ml-2 font-medium">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">
              Puissance actuelle
            </h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-800">
                {currentUsage.toFixed(2)}
              </p>
              <p className="text-lg ml-2 text-gray-600">kW</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Consommation en temps réel
            </p>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownCircle size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12% moins</span>
            <span className="text-gray-500 ml-1">qu'hier</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Tention</h3>
            <div className="p-2 bg-amber-100 rounded-lg">
              <BatteryCharging size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-800">
                {voltage.toFixed(1)}
              </p>
              <p className="text-lg ml-2 text-gray-600">V</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">Niveau de tension CA</p>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              Normal
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Courant</h3>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Battery size={20} className="text-indigo-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-800">
                {current.toFixed(2)}
              </p>
              <p className="text-lg ml-2 text-gray-600">A</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">Flux de courant</p>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              heures de pointe
            </div>
          </div>
        </div>
      </div>

      {/* Real-time chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Consommation d’énergie en temps réel
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Données en direct mises à jour toutes les 5 secondes
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={realtimeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                unit="kW"
                domain={[0, "auto"]}
              />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="#93c5fd"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Consommation d’énergie 24 heures
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={powerData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} unit="kW" />
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Consommation mensuelle
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} unit="kWh" />
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Legend />
                <Bar
                  dataKey="consumption"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Aperçu quotidien
          </h3>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-gray-500 text-sm">Total Consumption</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {dailyTotal.toFixed(2)} kWh
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Average Load</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {averageConsumption.toFixed(2)} kW
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Coût mensuel
          </h3>
          <div className="flex items-center mt-4">
            {/* <DollarSign size={28} className="text-green-600 mr-2" /> */}
            <p className="text-3xl font-bold text-gray-800">{monthlyCost} <span className="text-3xl font-bold text-green-600">MAD</span></p>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Économies prévues</span>
              <span className="text-green-600 font-medium">12.45</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Qualité de puissance
          </h3>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Facteur de puissance
              </span>
              <span className="text-sm font-medium text-gray-800">0.92</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">THD (%)</span>
              <span className="text-sm font-medium text-gray-800">2.7%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "27%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
