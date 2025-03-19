import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  positive,
}) => {
  return (
    <div className=" rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <h3 className="text-sm font-medium ">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold ">{value}</p>
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
};
