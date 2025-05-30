import React, { useEffect, useState } from "react";
import { Activity, Zap, AlertCircle } from "lucide-react";

interface Reading {
  voltage: number;
  current?: number;
  power?: number;
  frequency?: number;
  timestamp?: string;
}

export default function MeterDashboard() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Reading[]>([]);

  useEffect(() => {
    // Mock data generator
    const generateMockReading = (): Reading => ({
      voltage: 220 + Math.random() * 20 - 10, // 210-230V range
      current: 5 + Math.random() * 10, // 5-15A range
      power: 1000 + Math.random() * 2000, // 1000-3000W range
      frequency: 49.8 + Math.random() * 0.4, // 49.8-50.2Hz range
      timestamp: new Date().toISOString(),
    });

    // Generate initial reading
    const initialReading = generateMockReading();
    setReading(initialReading);
    setHistory([initialReading]);

    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newReading = generateMockReading();

      setReading(newReading);

      // Keep last 50 readings for trend
      setHistory((prev) => [...prev.slice(-49), newReading]);

      // Occasionally simulate errors (3% chance)
      if (Math.random() < 0.03) {
        setError("Sensor reading anomaly detected");
        setTimeout(() => setError(null), 3000);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatValue = (
    value: number | undefined,
    unit: string,
    decimals: number = 2
  ) => {
    if (value === undefined) return "N/A";
    return `${value.toFixed(decimals)} ${unit}`;
  };

  const getVoltageStatus = (voltage: number) => {
    if (voltage < 200) return { color: "text-red-500", status: "Low" };
    if (voltage > 250) return { color: "text-orange-500", status: "High" };
    return { color: "text-green-500", status: "Normal" };
  };

  const voltageStatus = reading ? getVoltageStatus(reading.voltage) : null;

  return (
    <div className=" bg-white p-4 rounded shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mesures électriques sous tension
          </h1>
        </div>

        {/* useless Error Alert */}
        {/* {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center justify-center gap-3 max-w-md mx-auto">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Alert</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )} */}

        {/* Main Dashboard Layout */}
        <div className="relative flex items-center justify-center min-h-96">
          {/* Left Side Metrics */}
          <div className="absolute left-0 space-y-6">
            {/* Voltage Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 w-80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Voltage</h3>
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              {reading ? (
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {reading.voltage.toFixed(2)}
                    <span className="text-lg font-normal text-gray-600 ml-1">
                      V
                    </span>
                  </p>
                  {voltageStatus && (
                    <p className={`text-sm font-medium ${voltageStatus.color}`}>
                      {voltageStatus.status}
                    </p>
                  )}
                </div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              )}
            </div>

            {/* Current Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 w-80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Current</h3>
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              {reading ? (
                <p className="text-3xl font-bold text-gray-900">
                  {formatValue(reading.current, "A")}
                </p>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              )}
            </div>
          </div>

          {/* Center Device Circle */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-4 relative overflow-hidden">
              {/* Animated pulse ring */}
              <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
              <div className="relative z-10 text-center text-white">
                <Activity className="h-12 w-12 mx-auto mb-2" />
                <h2 className="text-xl font-bold">DIRIS</h2>
                <p className="text-sm opacity-90">A-30</p>
              </div>
            </div>
          </div>

          {/* Right Side Metrics */}
          <div className="absolute right-0 space-y-6">
            {/* Power Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 w-80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Power</h3>
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              {reading ? (
                <p className="text-3xl font-bold text-gray-900">
                  {formatValue(reading.power, "W")}
                </p>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              )}
            </div>

            {/* Frequency Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 w-80">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Frequency
                </h3>
                <Activity className="h-6 w-6 text-orange-500" />
              </div>
              {reading ? (
                <p className="text-3xl font-bold text-gray-900">
                  {formatValue(reading.frequency, "Hz", 1)}
                </p>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
