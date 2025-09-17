import {useEnergyData} from "./hooks/useEnergyData";
import MonthlyConsumptionChart from "./charts/MonthlyConsumptionChart.tsx";
import HistoricalChart from "./charts/HistoricalConsumptionChart.tsx";
import CarbonImpactChart from "./charts/CarbonImpactChart.tsx";
import ConsumtptionTable from "./ConsumtptionTable";
import MeterDashboard from "../MeterDashboard";

export default function DashboardPage() {
    const {monthlyData, yearlyData, carbonData} = useEnergyData();
    const months = Object.keys(monthlyData[0] ?? []).filter((k) => k !== "month_name");

    return (
        <div className="w-full p-6 space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Mesures électriques sous tension
                </h1>
            </div>
            <MeterDashboard/>

            <ConsumtptionTable months={months} rows={monthlyData}/>
            <MonthlyConsumptionChart data={monthlyData}/>
            <HistoricalChart data={yearlyData}/>
            <CarbonImpactChart data={carbonData}/>
        </div>
    );
}
