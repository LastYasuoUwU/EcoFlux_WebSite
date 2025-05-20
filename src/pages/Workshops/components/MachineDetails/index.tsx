// import { useState } from "react";
import { XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the type for our machine data
interface MachineData {
  Machine: string;
  Fonction: string;
  Marque?: string;
  "Pu en Kw": number;
  "Consommation Kwh": number;
  "Impact carbone en kgCO2e": number;
  [key: string]: any; // For other possible properties
}

interface MachinesDetailsProps {
  data: MachineData[];
  isOpen: boolean;
  onClose: () => void;
  machineName: string;
}

export default function MachinesDetails({
  data,
  isOpen,
  onClose,
  machineName,
}: MachinesDetailsProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen || !data.length) return null;

  // Prepare chart data
  const chartData = data.map((item) => ({
    name: item.Fonction,
    power: item["Consommation Kwh"],
    carbonImpact: item["Impact carbone en kgCO2e"],
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-3xl overflow-auto p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{machineName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* Charts Section */}
          <div className="space-y-6">
            {/* First Chart: Function vs Power */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Consommation (en Kwh)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="power" name="PU (kW)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Second Chart: Function vs Carbon Impact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Impact carbone (en kgCO2e)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="carbonImpact"
                      name="Impact carbone (kgCO2e)"
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm mt-8"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
