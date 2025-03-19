import React from "react";

interface InfoCardProps {
  title: string;
  content: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};
