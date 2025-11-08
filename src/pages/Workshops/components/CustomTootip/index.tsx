import { TooltipProps } from "recharts";

export const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{ background: "#fff", padding: "8px", border: "1px solid #ccc" }}
      >
        <p>
          <strong>Machine:</strong> {data.machine}
        </p>
        {payload[0].dataKey === "pu_kw" ? (
          <p>
            <strong>Puissance en kW:</strong> {data.pu_kw.toFixed(2)} kWh
          </p>
        ) : (
          <p>
            <strong>Impact carbone en kgCO₂:</strong>
            {data.impact_carbone_kgco2e.toFixed(2)} kgCO2e
          </p>
        )}
      </div>
    );
  }
  return null;
};
