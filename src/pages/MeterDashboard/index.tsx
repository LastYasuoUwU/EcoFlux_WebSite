// // import { useEffect, useState } from "react";
// // import { Activity, Zap } from "lucide-react";

// // interface Reading {
// //   voltage: number;
// //   current?: number;
// //   power?: number;
// //   frequency?: number;
// //   timestamp?: string;
// // }

// // export default function MeterDashboard() {
// //   const [reading, setReading] = useState<Reading | null>(null);

// //   useEffect(() => {
// //     // Mock data generator
// //     const generateMockReading = (): Reading => ({
// //       voltage: 220 + Math.random() * 20 - 10, // 210-230V range
// //       current: 5 + Math.random() * 10, // 5-15A range
// //       power: 1000 + Math.random() * 2000, // 1000-3000W range
// //       frequency: 49.8 + Math.random() * 0.4, // 49.8-50.2Hz range
// //       timestamp: new Date().toISOString(),
// //     });

// //     // Generate initial reading
// //     const initialReading = generateMockReading();
// //     setReading(initialReading);

// //     // Simulate real-time data updates
// //     const interval = setInterval(() => {
// //       const newReading = generateMockReading();

// //       setReading(newReading);
// //     }, 1000); // Update every second

// //     return () => {
// //       clearInterval(interval);
// //     };
// //   }, []);

// //   const formatValue = (
// //     value: number | undefined,
// //     unit: string,
// //     decimals: number = 2
// //   ) => {
// //     if (value === undefined) return "N/A";
// //     return `${value.toFixed(decimals)} ${unit}`;
// //   };

// //   const getVoltageStatus = (voltage: number) => {
// //     if (voltage < 200) return { color: "text-red-500", status: "Low" };
// //     if (voltage > 250) return { color: "text-orange-500", status: "High" };
// //     return { color: "text-green-500", status: "Normal" };
// //   };

// //   const voltageStatus = reading ? getVoltageStatus(reading.voltage) : null;

// //   return (
// //     <div className=" bg-white py-4 px-1 rounded shadow-lg">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Main Dashboard Layout */}
// //         <div className="relative flex items-center justify-center min-h-96">
// //           {/* Left Side Metrics */}
// //           <div className="absolute left-0 space-y-6">
// //             {/* Voltage Card */}
// //             <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 w-80">
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="text-lg font-semibold text-gray-700">Voltage</h3>
// //                 <Zap className="h-6 w-6 text-blue-500" />
// //               </div>
// //               {reading ? (
// //                 <div>
// //                   <p className="text-3xl font-bold text-gray-900">
// //                     {reading.voltage.toFixed(2)}
// //                     <span className="text-lg font-normal text-gray-600 ml-1">
// //                       V
// //                     </span>
// //                   </p>
// //                   {voltageStatus && (
// //                     <p className={`text-sm font-medium ${voltageStatus.color}`}>
// //                       {voltageStatus.status}
// //                     </p>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <div className="animate-pulse">
// //                   <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
// //                   <div className="h-4 bg-gray-200 rounded w-16"></div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Current Card */}
// //             <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 w-80">
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="text-lg font-semibold text-gray-700">Courant</h3>
// //                 <Activity className="h-6 w-6 text-green-500" />
// //               </div>
// //               {reading ? (
// //                 <p className="text-3xl font-bold text-gray-900">
// //                   {formatValue(reading.current, "A")}
// //                 </p>
// //               ) : (
// //                 <div className="animate-pulse">
// //                   <div className="h-8 bg-gray-200 rounded w-24"></div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Center Device Circle */}
// //           <div className="flex flex-col items-center">
// //             <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-4 relative overflow-hidden">
// //               {/* Animated pulse ring */}
// //               <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
// //               <div className="relative z-10 text-center text-white">
// //                 <Activity className="h-12 w-12 mx-auto mb-2" />
// //                 <h2 className="text-xl font-bold">DIRIS</h2>
// //                 <p className="text-sm opacity-90">A-30</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side Metrics */}
// //           <div className="absolute right-0 space-y-6">
// //             {/* Power Card */}
// //             <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 w-80">
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="text-lg font-semibold text-gray-700">
// //                   Puissance
// //                 </h3>
// //                 <Zap className="h-6 w-6 text-purple-500" />
// //               </div>
// //               {reading ? (
// //                 <p className="text-3xl font-bold text-gray-900">
// //                   {formatValue(reading.power, "W")}
// //                 </p>
// //               ) : (
// //                 <div className="animate-pulse">
// //                   <div className="h-8 bg-gray-200 rounded w-24"></div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Frequency Card */}
// //             <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 w-80">
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="text-lg font-semibold text-gray-700">
// //                   Fréquence
// //                 </h3>
// //                 <Activity className="h-6 w-6 text-orange-500" />
// //               </div>
// //               {reading ? (
// //                 <p className="text-3xl font-bold text-gray-900">
// //                   {formatValue(reading.frequency, "Hz", 1)}
// //                 </p>
// //               ) : (
// //                 <div className="animate-pulse">
// //                   <div className="h-8 bg-gray-200 rounded w-24"></div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useRef } from 'react';
// import { Zap, Clock, Activity, BarChart3, Power, Gauge, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

// interface ElectricalData {
//   id?: number;
//   timestamp: string;
//   compteur_horaire?: number;
//   U12?: number;
//   U23?: number;
//   U31?: number;
//   V1?: number;
//   V2?: number;
//   V3?: number;
//   FREQUENCE?: number;
//   I1?: number;
//   I2?: number;
//   I3?: number;
//   In?: number;
//   Ptot?: number;
//   Qtot?: number;
//   Stot?: number;
//   Ea_plus?: number;
//   Isys?: number;
//   Usys?: number;
//   Vsys?: number;
//   FPtot2?: number;
//   status: string;
// }

// const MeterDashboard: React.FC = () => {
//   const [data, setData] = useState<ElectricalData | null>(null);
//   const [isConnected, setIsConnected] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
//   // Configuration - adjust these based on your backend setup
//   const API_BASE_URL = 'http://localhost:8000';
//   const FETCH_INTERVAL = 1000; // 1 second

//   const fetchElectricalData = async (): Promise<void> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/device/data`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // Add timeout to prevent hanging requests
//         signal: AbortSignal.timeout(5000)
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const fetchedData: ElectricalData = await response.json();
      
//       // Convert timestamp string to proper format if needed
//       if (typeof fetchedData.timestamp === 'string') {
//         fetchedData.timestamp = fetchedData.timestamp;
//       }

//       setData(fetchedData);
//       setIsConnected(true);
//       setError(null);
//       setLastUpdated(new Date());
      
//       if (isLoading) {
//         setIsLoading(false);
//       }
//     } catch (err) {
//       console.error('Failed to fetch electrical data:', err);
//       setIsConnected(false);
//       setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
//       if (isLoading) {
//         setIsLoading(false);
//       }
//     }
//   };

//   const startRealTimeUpdates = (): void => {
//     // Clear existing interval if any
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     // Fetch immediately
//     fetchElectricalData();

//     // Set up interval for real-time updates
//     intervalRef.current = setInterval(() => {
//       fetchElectricalData();
//     }, FETCH_INTERVAL);
//   };

//   const stopRealTimeUpdates = (): void => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startRealTimeUpdates();

//     // Cleanup interval on component unmount
//     return () => {
//       stopRealTimeUpdates();
//     };
//   }, []); // Empty dependency array means this runs once on mount

//   // Handle visibility change to pause/resume updates when tab is not active
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         stopRealTimeUpdates();
//       } else {
//         startRealTimeUpdates();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
    
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Electrical Data</h2>
//           <p className="text-gray-600">Connecting to backend...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
//           <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Failed</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={startRealTimeUpdates}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Retry Connection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const formatValue = (value: number | undefined, unit: string = "", decimals: number = 2): string => {
//     if (value === undefined || value === null) return "N/A";
//     return `${value.toFixed(decimals)} ${unit}`.trim();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'warning': return 'bg-yellow-100 text-yellow-800';
//       case 'error': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Zap className="h-8 w-8 text-blue-600" />
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Electrical Data Monitor</h1>
//                 <p className="text-gray-600">Real-time electrical system measurements</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="flex items-center space-x-4 mb-2">
//                 <div className="flex items-center space-x-2">
//                   {isConnected ? (
//                     <Wifi className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <WifiOff className="h-5 w-5 text-red-500" />
//                   )}
//                   <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
//                     {isConnected ? 'Connected' : 'Disconnected'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Clock className="h-5 w-5 text-gray-500" />
//                   <span className="text-sm text-gray-600">
//                     {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'No data'}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data?.status || 'unknown')}`}>
//                   {(data?.status || 'UNKNOWN').toUpperCase()}
//                 </span>
//                 {lastUpdated && (
//                   <span className="text-xs text-gray-500">
//                     Updated: {lastUpdated.toLocaleTimeString()}
//                   </span>
//                 )}
//               </div>
//               {error && (
//                 <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
//                   {error}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Voltage Measurements */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <Activity className="h-6 w-6 text-purple-600 mr-2" />
//               <h2 className="text-xl font-semibold text-gray-900">Voltage Measurements</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="bg-purple-50 rounded-lg p-4">
//                 <h3 className="font-medium text-purple-900 mb-3">Line-to-Line Voltages</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">U12:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.U12, "V")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">U23:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.U23, "V")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">U31:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.U31, "V")}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <h3 className="font-medium text-blue-900 mb-3">Phase Voltages</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">V1:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.V1, "V")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">V2:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.V2, "V")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">V3:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.V3, "V")}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-green-50 rounded-lg p-4">
//                 <h3 className="font-medium text-green-900 mb-3">System Voltages</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Usys:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Usys, "V")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Vsys:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Vsys, "V")}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Current & Frequency */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <Gauge className="h-6 w-6 text-orange-600 mr-2" />
//               <h2 className="text-xl font-semibold text-gray-900">Current & Frequency</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="bg-orange-50 rounded-lg p-4">
//                 <h3 className="font-medium text-orange-900 mb-3">Phase Currents</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">I1:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.I1, "A")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">I2:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.I2, "A")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">I3:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.I3, "A")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">In:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.In, "A")}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-indigo-50 rounded-lg p-4">
//                 <h3 className="font-medium text-indigo-900 mb-3">System Current</h3>
//                 <div className="flex justify-between">
//                   <span className="text-gray-700">Isys:</span>
//                   <span className="font-mono font-medium text-lg">{formatValue(data?.Isys, "A")}</span>
//                 </div>
//               </div>

//               <div className="bg-teal-50 rounded-lg p-4">
//                 <h3 className="font-medium text-teal-900 mb-3">Frequency</h3>
//                 <div className="flex justify-between">
//                   <span className="text-gray-700">Frequency:</span>
//                   <span className="font-mono font-medium text-lg">{formatValue(data?.FREQUENCE, "Hz")}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Power & Energy */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <Power className="h-6 w-6 text-green-600 mr-2" />
//               <h2 className="text-xl font-semibold text-gray-900">Power & Energy</h2>
//             </div>
//             <div className="space-y-4">
//               <div className="bg-green-50 rounded-lg p-4">
//                 <h3 className="font-medium text-green-900 mb-3">Power Values</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Ptot:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Ptot, "kW")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Qtot:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Qtot, "kVAR")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Stot:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Stot, "kVA")}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-yellow-50 rounded-lg p-4">
//                 <h3 className="font-medium text-yellow-900 mb-3">Energy & Meter</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Ea+:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.Ea_plus, "kWh")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-700">Hour Counter:</span>
//                     <span className="font-mono font-medium">{formatValue(data?.compteur_horaire, "h", 1)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-red-50 rounded-lg p-4">
//                 <h3 className="font-medium text-red-900 mb-3">Power Factor</h3>
//                 <div className="flex justify-between">
//                   <span className="text-gray-700">FPtot2:</span>
//                   <span className="font-mono font-medium text-lg">{formatValue(data?.FPtot2, "", 3)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* System Info */}
//         <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
//           <div className="flex items-center mb-4">
//             <BarChart3 className="h-6 w-6 text-gray-600 mr-2" />
//             <h2 className="text-xl font-semibold text-gray-900">System Information</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-50 rounded-lg p-4">
//               <span className="text-sm font-medium text-gray-600">Device ID</span>
//               <p className="text-lg font-mono">{data?.id || "N/A"}</p>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <span className="text-sm font-medium text-gray-600">Measurement Range</span>
//               <p className="text-lg font-mono">50512 - 50590</p>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <span className="text-sm font-medium text-gray-600">CT/VT Status</span>
//               <p className="text-lg font-mono">Operational</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeterDashboard;
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Activity, BarChart3, Power, Gauge, Wifi, WifiOff, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Configuration
  const API_BASE_URL ='http://localhost:8000';
  const FETCH_INTERVAL = 1000; // 1 second
  const MAX_CHART_POINTS = 60; // Keep last 60 data points (1 minute at 1sec interval)

  const fetchElectricalData = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/device/data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchedData: ElectricalData = await response.json();
      
      // Convert timestamp string to proper format if needed
      if (typeof fetchedData.timestamp === 'string') {
        fetchedData.timestamp = fetchedData.timestamp;
      }

      setData(fetchedData);
      setIsConnected(true);
      setError(null);
      setLastUpdated(new Date());
      
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
        FPtot2: fetchedData.FPtot2
      };

      setChartData(prevData => {
        const newData = [...prevData, newChartPoint];
        // Keep only the last MAX_CHART_POINTS
        return newData.slice(-MAX_CHART_POINTS);
      });
      
      if (isLoading) {
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Failed to fetch electrical data:', err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  const startRealTimeUpdates = (): void => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Fetch immediately
    fetchElectricalData();

    // Set up interval for real-time updates
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

    // Cleanup interval on component unmount
    return () => {
      stopRealTimeUpdates();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle visibility change to pause/resume updates when tab is not active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRealTimeUpdates();
      } else {
        startRealTimeUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement des données électriques</h2>
          <p className="text-gray-600">Connexion en cours...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connexion a échoué</h2>
          <button
            onClick={startRealTimeUpdates}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Réssayer la connexion
          </button>
        </div>
      </div>
    );
  }

  const formatValue = (value: number | undefined, unit: string = "", decimals: number = 2): string => {
    if (value === undefined || value === null) return "N/A";
    return `${value.toFixed(decimals)} ${unit}`.trim();
  };

  // Chart colors
  const chartColors = {
    voltage: ['#8884d8', '#82ca9d', '#ffc658'],
    current: ['#ff7c7c', '#8dd1e1', '#d084d0'],
    power: ['#ffb347', '#87ceeb', '#dda0dd']
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600">{`Temps: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value?.toFixed(2)} ${getUnit(entry.dataKey)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get unit for measurement
  const getUnit = (key: string): string => {
    if (key.includes('U') || key.includes('V')) return 'V';
    if (key.includes('I')) return 'A';
    if (key === 'Ptot') return 'kW';
    if (key === 'Qtot') return 'kVAR';
    if (key === 'Stot') return 'kVA';
    if (key === 'FREQUENCE') return 'Hz';
    if (key === 'FPtot2') return '';
    return '';
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
                <h1 className="text-3xl font-bold text-gray-900">Moniteur de données électriques</h1>
                <p className="text-gray-600">Mesures du consommation électrique en temps réel</p>
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
                  <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                    {isConnected ? 'Connecté' : 'Déconnecté'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'No data'}
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
                    domain={['dataMin - 10', 'dataMax + 10']}
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
                    domain={['dataMin - 5', 'dataMax + 5']}
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

          {/* Power Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Power className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Puissances</h2>
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
                    domain={['dataMin - 10', 'dataMax + 10']}
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="Ptot" 
                    stroke={chartColors.power[0]} 
                    strokeWidth={2}
                    dot={false}
                    name="Ptot"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Qtot" 
                    stroke={chartColors.power[1]} 
                    strokeWidth={2}
                    dot={false}
                    name="Qtot"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Stot" 
                    stroke={chartColors.power[2]} 
                    strokeWidth={2}
                    dot={false}
                    name="Stot"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Frequency & Power Factor Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Gauge className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Facteur du Fréquence et puissance</h2>
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
                    yAxisId="freq"
                    orientation="left"
                    domain={[49, 51]}
                    tick={{ fontSize: 10 }}
                    label={{ value: 'Fréquence (Hz)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => value.toFixed(2)}
                  />
                  <YAxis 
                    yAxisId="pf"
                    orientation="right"
                    domain={[0, 1]}
                    tick={{ fontSize: 10 }}
                    label={{ value: 'Facteur de puissance', angle: 90, position: 'insideRight' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    yAxisId="freq"
                    type="monotone" 
                    dataKey="FREQUENCE" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={false}
                    name="Frequency"
                  />
                  <Line 
                    yAxisId="pf"
                    type="monotone" 
                    dataKey="FPtot2" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                    dot={false}
                    name="Power Factor"
                  />
                </LineChart>
              </ResponsiveContainer>
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
                <h3 className="font-medium text-purple-900 mb-3">Tensions Composées</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">U12:</span>
                    <span className="font-mono font-medium">{formatValue(data?.U12, "V")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">U23:</span>
                    <span className="font-mono font-medium">{formatValue(data?.U23, "V")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">U31:</span>
                    <span className="font-mono font-medium">{formatValue(data?.U31, "V")}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-3">Tensions Simples</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">V1:</span>
                    <span className="font-mono font-medium">{formatValue(data?.V1, "V")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">V2:</span>
                    <span className="font-mono font-medium">{formatValue(data?.V2, "V")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">V3:</span>
                    <span className="font-mono font-medium">{formatValue(data?.V3, "V")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-3">Tensions du Système</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Usys:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Usys, "V")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Vsys:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Vsys, "V")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current & Frequency */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Gauge className="h-6 w-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Courant et Fréquence</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-3">Courants</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">I1:</span>
                    <span className="font-mono font-medium">{formatValue(data?.I1, "A")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">I2:</span>
                    <span className="font-mono font-medium">{formatValue(data?.I2, "A")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">I3:</span>
                    <span className="font-mono font-medium">{formatValue(data?.I3, "A")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">In:</span>
                    <span className="font-mono font-medium">{formatValue(data?.In, "A")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-medium text-indigo-900 mb-3">Courant du Système</h3>
                <div className="flex justify-between">
                  <span className="text-gray-700">Isys:</span>
                  <span className="font-mono font-medium text-lg">{formatValue(data?.Isys, "A")}</span>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-medium text-teal-900 mb-3">Fréquence</h3>
                <div className="flex justify-between">
                  <span className="text-gray-700">Fréquence:</span>
                  <span className="font-mono font-medium text-lg">{formatValue(data?.FREQUENCE, "Hz")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Power & Energy */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Power className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Puissance et Consommation</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-3">Puissance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ptot:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Ptot, "kW")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Qtot:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Qtot, "kVAR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Stot:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Stot, "kVA")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-3">Consommation et Compteur Horaire Total </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Ea+:</span>
                    <span className="font-mono font-medium">{formatValue(data?.Ea_plus, "kWh")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Compteur Horaire Total:</span>
                    <span className="font-mono font-medium">{formatValue(data?.compteur_horaire, "h", 1)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-medium text-red-900 mb-3">Facteur de Puissance</h3>
                <div className="flex justify-between">
                  <span className="text-gray-700">FPtot2:</span>
                  <span className="font-mono font-medium text-lg">{formatValue(data?.FPtot2, "", 3)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterDashboard;