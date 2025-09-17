import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import ChartContainer from "../ChartContainer.tsx";
import CustomTooltip from "../CustomTootip.tsx";

const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#82d982",
];

export default function MonthlyConsumptionChart({ data }: { data: any[] }) {
    if (!data.length) return null;

    // ✅ Flatten data so Recharts can use it
    const formattedData = data.map((item) => ({
        month_name: item.month_name,
        ...item.year_data,
    }));

    // ✅ Extract all available years
    const years = Object.keys(formattedData[0]).filter((k) => k !== "month_name");

    return (
        <ChartContainer title="Consommation mensuelle par année (en kWh)">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month_name" />
                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {years.map((year, i) => (
                        <Line
                            key={year}
                            type="monotone"
                            dataKey={year}
                            name={year}
                            stroke={colors[i % colors.length]}
                            strokeWidth={2}
                            connectNulls
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
