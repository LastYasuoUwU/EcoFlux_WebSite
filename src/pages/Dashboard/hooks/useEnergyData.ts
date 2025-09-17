import { useEffect, useState } from "react";
import {
    fetchMonthlyConsumption,
    fetchYearlyConsumption,
    fetchCarbonImpact,
} from "../utils/supabaseQueries";
import {supabase} from "../../../supabaseClients.ts";

export function useEnergyData() {
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [yearlyData, setYearlyData] = useState<any[]>([]);
    const [carbonData, setCarbonData] = useState<any[]>([]);

    const loadData = async () => {
        const [m, y, c] = await Promise.all([
            fetchMonthlyConsumption(),
            fetchYearlyConsumption(),
            fetchCarbonImpact(),
        ]);
        setMonthlyData(m);
        setYearlyData(y);
        setCarbonData(c);
    };

    useEffect(() => {
        loadData();

        // Subscribe to realtime updates
        const channel = supabase
            .channel("energy-updates")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "energy_consumption" },
                () => loadData()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return { monthlyData, yearlyData, carbonData };
}
