// src/services/energyStatsService.ts
import { supabase } from "../../../supabaseClients";
import { Machine, totalViewWorkshops } from "../types";

export const fetchEnergyStats = async () => {
  const { data: stats, error } = await supabase.rpc("get_all_energy_stats");

  if (error) throw error;

  const totals = stats?.reduce(
    (acc: totalViewWorkshops, item: Machine) => {
      const puissance = item.sum_pu_kw || 0;
      const consommation = item.sum_consumption || 0;
      const impact = item.sum_impact_carbone || 0;

      acc.puissance += puissance;
      acc.consommation += consommation;
      acc.impact += impact;

      return acc;
    },
    { puissance: 0, consommation: 0, impact: 0 }
  );

  return { stats: stats || [], totals };
};
