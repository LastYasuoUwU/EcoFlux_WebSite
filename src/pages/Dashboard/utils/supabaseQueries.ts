

// Fetch monthly consumption pivot
import {supabase} from "../../../supabaseClients.ts";

export async function fetchMonthlyConsumption() {
    const { data, error } = await supabase.rpc(
        "get_energy_consumption"
    );

    if (error) throw error;
    return data;
}

// Fetch yearly sums
export async function fetchYearlyConsumption() {
    const { data, error } = await supabase
        .from("energy_consumption")
        .select("year, total");

    if (error) throw error;

    // Aggregate yearly totals
    const yearly = data.reduce<Record<string, number>>((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + row.total;
        return acc;
    }, {});

    return Object.entries(yearly).map(([year, consumption]) => ({
        year,
        consumption,
    }));
}

// Fetch yearly carbon impact
export async function fetchCarbonImpact() {
    // Fetch energy consumption data
    const { data: energyData, error: energyError } = await supabase
        .from("energy_consumption")
        .select("year, total");

    if (energyError) throw energyError;

    // Fetch comments + workDays
    const { data: impactData, error: impactError } = await supabase
        .from("carbon_impact")
        .select("year, comment, workDays");

    if (impactError) throw impactError;

    // Calculate yearly impact
    const yearly = energyData.reduce<Record<string, number>>((acc, row) => {
        acc[row.year] = (acc[row.year] || 0) + row.total * 0.65;
        return acc;
    }, {});

    // Merge energy + carbon impact data
    return Object.entries(yearly).map(([year, impact]) => {
        const extra = impactData.find((d) => d.year === Number(year));
        return {
            year: Number(year),
            impact,
            comment: extra?.comment || "Pas de commentaire",
            workDays: extra?.workDays || 0,
        };
    });
}

