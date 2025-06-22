import React, { useState, useEffect, useRef } from "react";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  Activity,
  Power,
  TrendingUp,
  Clock,
  Wifi,
  WifiOff,
  AlertTriangle,
  Gauge,
} from "lucide-react";

const MetricDashboard: React.FC = () => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [totalEnergyCounter, setTotalEnergyCounter] = useState<number>(24.8);
  const [hourCounter, setHourCounter] = useState<number>(8760);

  // Configuration
  const FETCH_INTERVAL = 1000; // 1 second
  const MAX_CHART_POINTS = 60; // Keep last 60 data points (1 minute at 1sec interval)

  // Generate realistic electrical data for Morocco
  const generateElectricalData = () => {
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
      const newChartPoint = {
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
        Usys: fetchedData.Usys,
        Vsys: fetchedData.Vsys,
        Isys: fetchedData.Isys,
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

  // Prepare data for charts
  const powerData = chartData.map((d) => ({
    time: d.time,
    "P (kW)": d.Ptot,
    "Q (kVAR)": d.Qtot,
    "S (kVA)": d.Stot,
  }));

  const voltageData = chartData.map((d) => ({
    time: d.time,
    "U sys (V)": d.Usys,
    "V sys (V)": d.Vsys,
  }));

  const electricdata = chartData.map((d) => ({
    time: d.time,
    "I1 (A)": d.I1,
    "I2 (A)": d.I2,
    "I3 (A)": d.I3,
    "In (A)": d.In,
    "I sys (A)": d.Isys,
  }));

  const frequencyData = chartData.map((d) => ({
    time: d.time,
    "Fréquence (Hz)": d.FREQUENCE,
  }));

  const currentDistribution = data
    ? [
        { name: "I1", value: data.I1 || 0, color: "#8884d8" },
        { name: "I2", value: data.I2 || 0, color: "#82ca9d" },
        { name: "I3", value: data.I3 || 0, color: "#ffc658" },
        { name: "In", value: data.In || 0, color: "#ff7300" },
      ]
    : [];

  const StatCard = ({ title, value, unit, icon: Icon, color }: any) => (
    <div
      className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">
            {value?.toFixed(2)} <span className="text-lg">{unit}</span>
          </p>
        </div>
        <Icon className="w-8 h-8 text-white/80" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Consommation Totale"
            value={data?.Ea_plus}
            unit="kWh"
            icon={Zap}
            color="from-blue-600 to-blue-800"
          />
          <StatCard
            title="Puissance Active"
            value={data?.Ptot}
            unit="kW"
            icon={Power}
            color="from-green-600 to-green-800"
          />
          <StatCard
            title="Tension Système"
            value={data?.Usys}
            unit="V"
            icon={TrendingUp}
            color="from-purple-600 to-purple-800"
          />
          <StatCard
            title="Fréquence"
            value={data?.FREQUENCE}
            unit="Hz"
            icon={Activity}
            color="from-orange-600 to-orange-800"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Power Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <Power className="w-5 h-5 mr-2 text-green-400" />
              Puissance (P, Q, S)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    // backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="P (kW)"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="Q (kVAR)"
                  stackId="2"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="S (kVA)"
                  stackId="3"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Voltage Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
              Tensions du Système
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={voltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    // backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="U sys (V)"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="V sys (V)"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Current Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
              <Activity className="w-5 h-5 mr-2 text-yellow-400" />
              Courants
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={electricdata.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    // backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Legend />
                <Bar dataKey="I1 (A)" fill="#8884d8" radius={[2, 2, 0, 0]} />
                <Bar dataKey="I2 (A)" fill="#82ca9d" radius={[2, 2, 0, 0]} />
                <Bar dataKey="I3 (A)" fill="#ffc658" radius={[2, 2, 0, 0]} />
                <Bar dataKey="In (A)" fill="#ff7300" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Current Distribution Pie Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className=" mb-4 flex items-center text-xl font-semibold text-gray-900">
              <Zap className="w-5 h-5 mr-2 text-blue-400" />
              Distribution des Courants
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}A`}
                >
                  {currentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    // backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                  formatter={(value: number) => value.toFixed(2) + " A"}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Frequency Monitor */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
            <Activity className="w-5 h-5 mr-2 text-orange-400" />
            Surveillance de la Fréquence
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                domain={[49.5, 50.5]}
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value: number) => value.toFixed(2)}
              />
              <Tooltip
                contentStyle={{
                  // backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
                formatter={(value: number) => value.toFixed(2)}
              />
              <Line
                type="monotone"
                dataKey="Fréquence (Hz)"
                stroke="#F59E0B"
                strokeWidth={4}
                dot={{ r: 6, fill: "#F59E0B" }}
              />
            </LineChart>
          </ResponsiveContainer>
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
                      {formatValue(data?.Ea_plus, "kWh", 2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Compteur Horaire Total:
                    </span>
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
    </div>
  );
};

export default MetricDashboard;