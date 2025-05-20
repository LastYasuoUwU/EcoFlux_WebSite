import { atelierCoupeData } from "./data/AtelierCoupeData";
import { atelierDecorsData } from "./data/AtelierDecorsData";
import { atelierDetachageData } from "./data/AtelierDetachageData";
import { climatiseursBureauxData } from "./data/ClimatiseursBureauxData";
import { eclairageData } from "./data/EclairageData";
import { equipementsData } from "./data/EquipementsData";
import { machineACoudreData } from "./data/MachineACoudreData";
import { materielsInformatiquesData } from "./data/MaterielsInformatiquesData";
import { repassageData } from "./data/RepassageData";

export const zoneData = [
  {
    machineAcoudre: {
      name: "Machine Â Coudre",
      PU: 370.93,
      consumption: 849429.7,
      carboneImpact: 552129.3,
      machinesData: machineACoudreData,
    },
    ateliersDecors: {
      name: "Atelier Décors",
      PU: 351.89,
      consumption: 805828.1,
      carboneImpact: 523788.27,
      machinesData: atelierDecorsData,
    },
    ateliersCoupe: {
      name: "Atelier Coupe",
      PU: 74.94,
      consumption: 171617.2,
      carboneImpact: 111551.17,
      machinesData: atelierCoupeData,
    },
    repassage: {
      name: "Repassage",
      PU: 45.3,
      consumption: 103737,
      carboneImpact: 67429.05,
      machinesData: repassageData,
    },
    climatiseur: {
      name: "Climatiseurs Bureaux",
      PU: 43.13,
      consumption: 33339.49,
      carboneImpact: 21670.67,
      machinesData: climatiseursBureauxData,
    },
    equipement: {
      name: "Équipements",
      PU: 150.52,
      consumption: 190260.55,
      carboneImpact: 123669.36,
      machinesData: equipementsData,
    },
    atelierDetachage: {
      name: "Atelier Détachage",
      PU: 17.63,
      consumption: 37953.5,
      carboneImpact: 24669.78,
      machinesData: atelierDetachageData,
    },
    materielsInformatique: {
      name: "Matériels Informatiques",
      PU: 18.06,
      consumption: 235759.1,
      carboneImpact: 153243.41,
      machinesData: materielsInformatiquesData,
    },
    eclairage: {
      name: "Éclairage",
      PU: 3.43,
      consumption: 57444.66,
      carboneImpact: 37339.03,
      machinesData: eclairageData,
    },
  },
];
