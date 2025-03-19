import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", consumption: 2.1, production: 0 },
  { time: "02:00", consumption: 1.8, production: 0 },
  { time: "04:00", consumption: 1.5, production: 0 },
  { time: "06:00", consumption: 2.3, production: 0.2 },
  { time: "08:00", consumption: 3.8, production: 1.5 },
  { time: "10:00", consumption: 3.2, production: 2.8 },
  { time: "12:00", consumption: 2.9, production: 3.1 },
  { time: "14:00", consumption: 2.7, production: 2.9 },
  { time: "16:00", consumption: 3.1, production: 2.1 },
  { time: "18:00", consumption: 4.2, production: 0.8 },
  { time: "20:00", consumption: 3.9, production: 0 },
  { time: "22:00", consumption: 2.8, production: 0 },
];

export const ConsumptionChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="consumption"
            name="Consommation"
            stroke="#3B82F6"
            fill="#93C5FD"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="production"
            name="Production Solaire"
            stroke="#10B981"
            fill="#6EE7B7"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
