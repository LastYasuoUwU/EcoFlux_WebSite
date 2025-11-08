export const machinesNames: Record<string, string> = {
  machines: "Machine à Coudre",
  atelier_coupe: "Atelier Coupe",
  atelier_detachage: "Atelier Détachage",
  climatiseurs: "Climatiseurs",
  decors: "Atelier Décors",
  equipements: "Équipements",
  materiel_informatiques: "Matériels informatiques",
  repassage: "Repassage",
};

export type Machine = {
  name: string;
  sum_pu_kw: number;
  sum_consumption: number;
  sum_impact_carbone: number;
};

export function getMachineName(machine: string): string {
  return machinesNames[machine];
}
