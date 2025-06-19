import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  Activity,
  Power,
  Gauge,
  TrendingUp,
  Wifi,
  WifiOff,
  Clock,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

interface ElectricalData {
  id?: number;
  timestamp: string;
  compteur_horaire?: number;
  U12?: number;
  U23?: number;
  U31?: number;
  V1?: number;
  V2?: number;
  V3?: number;
  FREQUENCE?: number;
  I1?: number;
  I2?: number;
  I3?: number;
  In?: number;
  Ptot?: number;
  Qtot?: number;
  Stot?: number;
  Ea_plus?: number;
  Isys?: number;
  Usys?: number;
  Vsys?: number;
  FPtot2?: number;
  status: string;
}

interface ChartDataPoint {
  time: string;
  timestamp: number;
  U12?: number;
  U23?: number;
  U31?: number;
  V1?: number;
  V2?: number;
  V3?: number;
  I1?: number;
  I2?: number;
  I3?: number;
  Ptot?: number;
  Qtot?: number;
  Stot?: number;
  FREQUENCE?: number;
  FPtot2?: number;
}

const MeterDashboard: React.FC = () => {
  const [data, setData] = useState<ElectricalData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [totalEnergyCounter, setTotalEnergyCounter] = useState<number>(2480.7);
  const [hourCounter, setHourCounter] = useState<number>(8760);

  // Configuration
  const FETCH_INTERVAL = 1000; // 1 second
  const MAX_CHART_POINTS = 60; // Keep last 60 data points (1 minute at 1sec interval)

  // Generate realistic electrical data for Morocco
  const generateElectricalData = (): ElectricalData => {
    const now = new Date();
    const timeOfDay = now.getHours() + now.getMinutes() / 60;

    // Base values for Morocco's electrical system (220V/380V, 50Hz)
    const baseVoltage = 380; // 380V system (Morocco standard)
    const baseFrequency = 50; // 50 Hz (Morocco standard)

    // Simulate daily load variation (higher during peak hours: 7-9 AM and 7-10 PM)
    const isPeakMorning = timeOfDay >= 7 && timeOfDay <= 9;
    const isPeakEvening = timeOfDay >= 19 && timeOfDay <= 22;
    const isOffPeak = timeOfDay >= 23 || timeOfDay <= 6;

    let loadFactor = 0.4; // Base load
    if (isPeakMorning || isPeakEvening) {
      loadFactor = 0.8 + Math.random() * 0.2; // Peak load
    } else if (isOffPeak) {
      loadFactor = 0.2 + Math.random() * 0.2; // Off-peak load
    } else {
      loadFactor = 0.4 + Math.random() * 0.3; // Normal load
    }

    // Add some realistic noise and variation
    const voltageVariation = () => baseVoltage + (Math.random() - 0.5) * 15;
    const currentVariation = () => (15 + Math.random() * 25) * loadFactor;
    const frequencyVariation = () =>
      baseFrequency + (Math.random() - 0.5) * 0.3;

    // Phase voltages (line to neutral) - Morocco uses 220V phase voltage
    const phaseVoltage = 220;
    const V1 = phaseVoltage + (Math.random() - 0.5) * 10;
    const V2 = phaseVoltage + (Math.random() - 0.5) * 10;
    const V3 = phaseVoltage + (Math.random() - 0.5) * 10;

    // Line voltages (line to line) - Morocco uses 380V line voltage
    const U12 = voltageVariation();
    const U23 = voltageVariation();
    const U31 = voltageVariation();

    // Phase currents (typical for Moroccan residential/commercial)
    const I1 = currentVariation();
    const I2 = currentVariation();
    const I3 = currentVariation();
    const In = Math.abs(I1 - I2 - I3) * 0.08; // Neutral current (small for balanced load)

    // System values
    const Usys = (U12 + U23 + U31) / 3;
    const Vsys = (V1 + V2 + V3) / 3;
    const Isys = (I1 + I2 + I3) / 3;

    // Power calculations (typical Moroccan power factor)
    const powerFactor = 0.82 + Math.random() * 0.12; // Morocco typical range
    const Ptot = (Usys * Isys * Math.sqrt(3) * powerFactor) / 1000; // kW
    const Qtot = Ptot * Math.tan(Math.acos(powerFactor)); // kVAR
    const Stot = Math.sqrt(Ptot * Ptot + Qtot * Qtot); // kVA

    // Frequency (Morocco grid frequency)
    const FREQUENCE = frequencyVariation();

    // Update counters (simulated increment)
    const energyIncrement = Ptot / 3600; // kWh increment per second
    setTotalEnergyCounter((prev) => prev + energyIncrement);
    setHourCounter((prev) => prev + 1 / 3600);

    return {
      timestamp: now.toISOString(),
      compteur_horaire: Math.round(hourCounter * 10) / 10,
      U12: Math.round(U12 * 100) / 100,
      U23: Math.round(U23 * 100) / 100,
      U31: Math.round(U31 * 100) / 100,
      V1: Math.round(V1 * 100) / 100,
      V2: Math.round(V2 * 100) / 100,
      V3: Math.round(V3 * 100) / 100,
      FREQUENCE: Math.round(FREQUENCE * 100) / 100,
      I1: Math.round(I1 * 100) / 100,
      I2: Math.round(I2 * 100) / 100,
      I3: Math.round(I3 * 100) / 100,
      In: Math.round(In * 100) / 100,
      Ptot: Math.round(Ptot * 100) / 100,
      Qtot: Math.round(Qtot * 100) / 100,
      Stot: Math.round(Stot * 100) / 100,
      Ea_plus: Math.round(totalEnergyCounter * 100) / 100,
      Isys: Math.round(Isys * 100) / 100,
      Usys: Math.round(Usys * 100) / 100,
      Vsys: Math.round(Vsys * 100) / 100,
      FPtot2: Math.round(powerFactor * 1000) / 1000,
      status: "active",
    };
  };

  const fetchElectricalData = (): void => {
    try {
      const fetchedData = generateElectricalData();
      setData(fetchedData);
      setIsConnected(true);
      setError(null);

      // Calculate instantaneous consumption (kW)
      const currentConsumption = fetchedData.Ptot;

      // Add to chart data
      const newChartPoint: ChartDataPoint = {
        time: new Date(fetchedData.timestamp).toLocaleTimeString(),
        timestamp: new Date(fetchedData.timestamp).getTime(),
        U12: fetchedData.U12,
        U23: fetchedData.U23,
        U31: fetchedData.U31,
        V1: fetchedData.V1,
        V2: fetchedData.V2,
        V3: fetchedData.V3,
        I1: fetchedData.I1,
        I2: fetchedData.I2,
        I3: fetchedData.I3,
        Ptot: fetchedData.Ptot,
        Qtot: fetchedData.Qtot,
        Stot: fetchedData.Stot,
        FREQUENCE: fetchedData.FREQUENCE,
        FPtot2: fetchedData.FPtot2,
        Ea_plus: fetchedData.Ea_plus,
        Consommation: currentConsumption,
      };

      setChartData((prevData) => {
        const newData = [...prevData, newChartPoint];
        return newData.slice(-MAX_CHART_POINTS);
      });

      if (isLoading) {
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Failed to generate electrical data:", err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : "Unknown error occurred");

      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  const startRealTimeUpdates = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    fetchElectricalData();

    intervalRef.current = setInterval(() => {
      fetchElectricalData();
    }, FETCH_INTERVAL);
  };

  const stopRealTimeUpdates = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startRealTimeUpdates();
    return () => {
      stopRealTimeUpdates();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRealTimeUpdates();
      } else {
        startRealTimeUpdates();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-cyan-400 border-r-purple-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-cyan-400/30 mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Chargement des données électriques
          </h2>
          <p className="text-white/70">Connexion en cours...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Connexion échouée
          </h2>
          <button
            onClick={startRealTimeUpdates}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Réessayer la connexion
          </button>
        </div>
      </div>
    );
  }

  const formatValue = (
    value: number | undefined,
    unit: string = "",
    decimals: number = 2
  ): string => {
    if (value === undefined || value === null) return "N/A";
    return `${value.toFixed(decimals)} ${unit}`.trim();
  };

  const chartColors = {
    voltage: ["#06b6d4", "#8b5cf6", "#f59e0b"],
    current: ["#ef4444", "#06b6d4", "#8b5cf6"],
    consumption: "#10b981",
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-white/20 rounded-xl shadow-2xl">
          <p className="text-sm font-semibold text-gray-800 mb-2">{`Temps: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm font-medium"
              style={{ color: entry.color }}
            >
              {`${entry.dataKey}: ${entry.value?.toFixed(2)} ${getUnit(
                entry.dataKey
              )}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getUnit = (key: string): string => {
    if (key.includes("U") || key.includes("V")) return "V";
    if (key.includes("I")) return "A";
    if (key === "Ptot" || key === "Consommation") return "kWh";
    if (key === "Qtot") return "kVAR";
    if (key === "Stot") return "kVA";
    if (key === "FREQUENCE") return "Hz";
    if (key === "FPtot2") return "";
    if (key === "Ea_plus") return "kWh";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Moniteur de données électriques
                </h1>
                <p className="text-gray-600">
                  Mesures du consommation électrique en temps réel
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-2">
                  {isConnected ? (
                    <Wifi className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      isConnected ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isConnected ? "Connecté" : "Déconnecté"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {data?.timestamp
                      ? new Date(data.timestamp).toLocaleString()
                      : "No data"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Voltage Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Tensions</h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 10", "dataMax + 10"]}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="V1"
                    stroke={chartColors.voltage[0]}
                    strokeWidth={2}
                    dot={false}
                    name="V1"
                  />
                  <Line
                    type="monotone"
                    dataKey="V2"
                    stroke={chartColors.voltage[1]}
                    strokeWidth={2}
                    dot={false}
                    name="V2"
                  />
                  <Line
                    type="monotone"
                    dataKey="V3"
                    stroke={chartColors.voltage[2]}
                    strokeWidth={2}
                    dot={false}
                    name="V3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Courants</h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={["dataMin - 5", "dataMax + 5"]}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="I1"
                    stroke={chartColors.current[0]}
                    strokeWidth={2}
                    dot={false}
                    name="I1"
                  />
                  <Line
                    type="monotone"
                    dataKey="I2"
                    stroke={chartColors.current[1]}
                    strokeWidth={2}
                    dot={false}
                    name="I2"
                  />
                  <Line
                    type="monotone"
                    dataKey="I3"
                    stroke={chartColors.current[2]}
                    strokeWidth={2}
                    dot={false}
                    name="I3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Consumption Chart */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 xl:col-span-2">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg mr-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Consommation en Temps Réel
              </h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis
                    stroke="#888"
                    domain={["dataMin - 5", "dataMax + 5"]}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="Consommation"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voltage Measurements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Tensions</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-3">
                Tensions Composées
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">U12:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.U12, "V")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">U23:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.U23, "V")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">U31:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.U31, "V")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">
                Tensions Simples
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">V1:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.V1, "V")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">V2:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.V2, "V")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">V3:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.V3, "V")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">
                Tensions du Système
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Usys:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Usys, "V")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Vsys:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Vsys, "V")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current & Frequency */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Gauge className="h-6 w-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Courant et Fréquence
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-3">Courants</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">I1:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.I1, "A")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">I2:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.I2, "A")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">I3:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.I3, "A")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">In:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.In, "A")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-medium text-indigo-900 mb-3">
                Courant du Système
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-700">Isys:</span>
                <span className="font-mono font-medium text-lg">
                  {formatValue(data?.Isys, "A")}
                </span>
              </div>
            </div>

            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="font-medium text-teal-900 mb-3">Fréquence</h3>
              <div className="flex justify-between">
                <span className="text-gray-700">Fréquence:</span>
                <span className="font-mono font-medium text-lg">
                  {formatValue(data?.FREQUENCE, "Hz")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Power & Energy */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Power className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Puissance et Consommation
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">Puissance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Ptot:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Ptot, "kW")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Qtot:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Qtot, "kVAR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Stot:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Stot, "kVA")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900 mb-3">
                Consommation et Compteur Horaire Total{" "}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Ea+:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.Ea_plus, "kWh")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Compteur Horaire Total:</span>
                  <span className="font-mono font-medium">
                    {formatValue(data?.compteur_horaire, "h", 1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-3">
                Facteur de Puissance
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-700">FPtot2:</span>
                <span className="font-mono font-medium text-lg">
                  {formatValue(data?.FPtot2, "", 3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterDashboard;
