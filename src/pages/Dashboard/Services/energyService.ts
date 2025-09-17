import {supabase} from "../../../supabaseClients.ts";

export async function getEnergyConsumptionPivot() {
    const {data, error} = await supabase
        .from("energy_consumption")
        .select("*")
        .order("month", {ascending: true});

    if (error) throw error;
    return data;
}

// ✅ Sum of months grouped by year
export async function getAnnualConsumption() {
    const {data, error} = await supabase
        .from("energy_consumption")
        .select("year, total")
        .order("year", {ascending: true});

    if (error) throw error;

    // Group by year and sum totals
    const yearly: { [key: string]: number } = {};
    data.forEach((row: { year: number, total: number }) => {
        yearly[row.year] = (yearly[row.year] || 0) + row.total;
    });

    return Object.entries(yearly).map(([year, consumption]) => ({
        year,
        consumption,
    }));
}

// ✅ Carbon impact = annual sum * 0.65
export async function getCarbonImpact() {
    const annual = await getAnnualConsumption();
    return annual.map((row) => ({
        year: row.year,
        impact: row.consumption * 0.65,
    }));
}
