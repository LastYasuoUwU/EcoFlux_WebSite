import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import ChartContainer from "../ChartContainer";

export default function CarbonImpactChart({ data }: { data: any[] }) {
    return (
        <ChartContainer title="Impact carbone annuel (en kgCO2e)">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => v.toLocaleString()} />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const d = payload[0].payload;
                                return (
                                    <div className="bg-white p-4 border rounded shadow-lg">
                                        <p className="font-medium">Année: {label}</p>
                                        <p>Impact carbone: {d.impact.toLocaleString()} kgCO2e</p>
                                        <p className={'text-blue-600 text-sm'}>Jours du travails: {d.workDays}</p>
                                        <p className={'text-red-600 text-sm'}>Commentaire: {d.comment}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar dataKey="impact" name="Impact carbone" fill="#4CAF50" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
