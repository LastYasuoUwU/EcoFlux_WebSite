import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  Calendar,
  Download,
  Zap,
  Battery,
} from "lucide-react";

// Mock data generation
const generateAnalyticsData = (days = 30) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    // Generate power quality metrics
    const powerFactor = 0.85 + Math.random() * 0.15;
    const thd = Math.random() * 5;
    const voltage = 220 + Math.random() * 10;
    const frequency = 49.8 + Math.random() * 0.4;

    // Add occasional anomalies
    const hasAnomaly = Math.random() > 0.9; // 10% chance for anomaly

    data.push({
      date: date.toLocaleDateString("fr-FR", {
        month: "short",
        day: "numeric",
      }),
      powerFactor,
      thd,
      voltage,
      frequency,
      anomaly: hasAnomaly ? 1 : 0,
      anomalyType: hasAnomaly
        ? Math.random() > 0.5
          ? "Chute de tension"
          : "Distorsion harmonique"
        : null,
    });
  }
  return data;
};

const generateEnergyQualityData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: i,
      voltage: 220 + Math.sin(i / 3) * 8 + Math.random() * 4,
      current: 10 + Math.sin(i / 6) * 5 + Math.random() * 2,
      harmonics: 2 + Math.sin(i / 4) * 1.5 + Math.random(),
    });
  }
  return data;
};

const generateFrequencyData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      time: i,
      frequency: 50 + Math.sin(i / 10) * 0.2 + Math.random() * 0.1 - 0.05,
    });
  }
  return data;
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState([]);
  const [energyQualityData, setEnergyQualityData] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Simulate data loading
    setTimeout(() => {
      const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
      const data = generateAnalyticsData(days);

      setAnalyticsData(data);
      setEnergyQualityData(generateEnergyQualityData());
      setFrequencyData(generateFrequencyData());

      // Extract anomalies
      const anomalyData = data.filter((item) => item.anomaly === 1);
      setAnomalies(anomalyData);

      setLoading(false);
    }, 800);
  }, [timeRange]);

  // Calculate metrics
  const avgPowerFactor = analyticsData.length
    ? (
        analyticsData.reduce((sum, item) => sum + item.powerFactor, 0) /
        analyticsData.length
      ).toFixed(2)
    : 0;

  const avgTHD = analyticsData.length
    ? (
        analyticsData.reduce((sum, item) => sum + item.thd, 0) /
        analyticsData.length
      ).toFixed(2)
    : 0;

  const avgVoltage = analyticsData.length
    ? (
        analyticsData.reduce((sum, item) => sum + item.voltage, 0) /
        analyticsData.length
      ).toFixed(1)
    : 0;

  const totalAnomalies = anomalies.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-700">
          Chargement des données d'analyse...
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Analyse de la Qualité d'Énergie
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Surveillance et analyse des indicateurs de qualité d'énergie
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="flex bg-gray-100 rounded-lg">
            <button
              onClick={() => setTimeRange("7d")}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === "7d" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Semaine
            </button>
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === "30d" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Mois
            </button>
            <button
              onClick={() => setTimeRange("90d")}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === "90d" ? "bg-blue-600 text-white" : "text-gray-600"}`}
            >
              Trimestre
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Période personnalisée</span>
          </div>

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">
              Facteur de puissance
            </h3>
            <TrendingUp size={18} className="text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {avgPowerFactor}
          </p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${Number(avgPowerFactor) > 0.9 ? "bg-green-500" : Number(avgPowerFactor) > 0.85 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${Number(avgPowerFactor) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {Number(avgPowerFactor) > 0.9
              ? "Excellent"
              : Number(avgPowerFactor) > 0.85
                ? "Bon"
                : "Amélioration nécessaire"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">THD (%)</h3>
            <TrendingUp size={18} className="text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{avgTHD}%</p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${Number(avgTHD) < 3 ? "bg-green-500" : Number(avgTHD) < 5 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${Math.min(Number(avgTHD) * 20, 100)}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {Number(avgTHD) < 3
              ? "Faible distorsion"
              : Number(avgTHD) < 5
                ? "Modérée"
                : "Forte distorsion"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Tension</h3>
            <Battery size={18} className="text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">{avgVoltage}V</p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${Math.abs(Number(avgVoltage) - 230) < 5 ? "bg-green-500" : Math.abs(Number(avgVoltage) - 230) < 10 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {Math.abs(Number(avgVoltage) - 230) < 5
              ? "Plage normale"
              : Math.abs(Number(avgVoltage) - 230) < 10
                ? "Légère variation"
                : "Hors plage"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Anomalies</h3>
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            {totalAnomalies}
          </p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${totalAnomalies < 3 ? "bg-green-500" : totalAnomalies < 5 ? "bg-yellow-500" : "bg-red-500"}`}
              style={{ width: `${Math.min(totalAnomalies * 10, 100)}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {totalAnomalies === 0
              ? "Aucun problème détecté"
              : `Détectées ces ${timeRange === "7d" ? "7 jours" : timeRange === "30d" ? "30 jours" : "90 jours"}`}
          </p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Tendances du facteur de puissance et THD
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#3b82f6"
                  fontSize={12}
                  domain={[0.8, 1]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f59e0b"
                  fontSize={12}
                  domain={[0, 10]}
                />
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Legend />
                <Line
                  yAxisId="left"
                  name="Facteur de puissance"
                  type="monotone"
                  dataKey="powerFactor"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  name="THD (%)"
                  type="monotone"
                  dataKey="thd"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="anomaly"
                  fill="#ef4444"
                  stroke="none"
                  opacity={0.3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Analyse de tension et courant
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={energyQualityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={(hour) => `${hour}:00`}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#3b82f6"
                  fontSize={12}
                  domain={[200, 240]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                  fontSize={12}
                  domain={[0, 20]}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "8px" }}
                  labelFormatter={(hour) => `${hour}:00`}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  name="Tension (V)"
                  type="monotone"
                  dataKey="voltage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  name="Courant (A)"
                  type="monotone"
                  dataKey="current"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  name="Harmoniques (%)"
                  type="monotone"
                  dataKey="harmonics"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Variation de fréquence
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={frequencyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis domain={[49.5, 50.5]} stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
                <Line
                  name="Fréquence (Hz)"
                  type="monotone"
                  dataKey="frequency"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  name="Cible"
                  type="monotone"
                  strokeDasharray="5 5"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  dot={false}
                  data={[
                    { time: 0, frequency: 50 },
                    { time: 99, frequency: 50 },
                  ]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Anomalies détectées
          </h3>
          {anomalies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tension
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Facteur de puissance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      THD
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sévérité
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalies.map((anomaly, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anomaly.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anomaly.anomalyType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anomaly.voltage.toFixed(1)}V
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anomaly.powerFactor.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {anomaly.thd.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            anomaly.thd > 4 || anomaly.powerFactor < 0.85
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {anomaly.thd > 4 || anomaly.powerFactor < 0.85
                            ? "Élevée"
                            : "Moyenne"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Zap size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500">
                Aucune anomalie détectée dans la période sélectionnée
              </p>
              <p className="text-sm text-gray-400 mt-2">
                La qualité d'énergie est dans les paramètres acceptables
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations and Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Recommandations et analyses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {avgPowerFactor < 0.9 && (
            <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800">
                Amélioration du facteur de puissance
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                Envisagez d'installer des condensateurs de correction du facteur
                de puissance pour améliorer le facteur de puissance de{" "}
                {avgPowerFactor} à plus de 0,95. Cela pourrait réduire les
                factures d'électricité d'environ 3-5%.
              </p>
            </div>
          )}

          {avgTHD > 3 && (
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800">
                Filtrage harmonique nécessaire
              </h4>
              <p className="text-sm text-red-700 mt-1">
                THD de {avgTHD}% dépasse les limites recommandées. Envisagez
                d'installer des filtres harmoniques pour protéger les
                équipements sensibles et réduire les pertes d'énergie.
              </p>
            </div>
          )}

          {Math.abs(Number(avgVoltage) - 230) > 5 && (
            <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800">
                Régulation de tension
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                Votre tension moyenne de {avgVoltage}V s'écarte de la tension
                nominale de 230V. Envisagez d'installer un stabilisateur de
                tension pour protéger les équipements et améliorer l'efficacité.
              </p>
            </div>
          )}

          {totalAnomalies > 3 && (
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800">
                Planifier un audit de qualité d'énergie
              </h4>
              <p className="text-sm text-red-700 mt-1">
                Plusieurs événements de qualité d'énergie détectés (
                {totalAnomalies} événements). Nous recommandons de planifier un
                audit complet de la qualité d'énergie pour identifier et
                résoudre les causes profondes.
              </p>
            </div>
          )}

          {avgPowerFactor >= 0.9 &&
            avgTHD <= 3 &&
            Math.abs(Number(avgVoltage) - 230) <= 5 &&
            totalAnomalies <= 3 && (
              <div className="border border-green-200 bg-green-50 p-4 rounded-lg col-span-2">
                <h4 className="font-medium text-green-800">
                  Qualité d'énergie dans les paramètres
                </h4>
                <p className="text-sm text-green-700 mt-1">
                  Tous les indicateurs de qualité d'énergie sont dans les
                  paramètres acceptables. Continuez la surveillance pour
                  maintenir des performances optimales et une efficacité
                  énergétique.
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
