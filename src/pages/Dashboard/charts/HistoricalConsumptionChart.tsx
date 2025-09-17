import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import ChartContainer from "../ChartContainer.tsx";
import EnhancedTooltip from "../EnhancedTooltip.tsx";

export default function HistoricalChart({ data }: { data: any[] }) {

    return (
        <ChartContainer title="Aperçu de la consommation annuelle (en kWh)">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip content={<EnhancedTooltip dataName="Consommation" unit="kWh" />} />
                    <Bar dataKey="consumption" name="Consommation" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
