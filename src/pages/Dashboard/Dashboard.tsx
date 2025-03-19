import React from "react";
import { StatCard } from "./components/StatCard";
import { ConsumptionChart } from "./components/ConsumptionChart";
import { InfoCard } from "./components/InfoCard";
import { DeviceList } from "./components/DeviceList";
import { version } from "../../../package.json";

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold ">Tableau de bord</h2>
          <p className="">Vue d'ensemble de votre consommation énergétique</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Consommation Actuelle"
            value="3.2 kW"
            trend="-12%"
            positive
          />
          <StatCard
            title="Consommation Journalière"
            value="24.7 kWh"
            trend="+5%"
            positive={false}
          />
          <StatCard
            title="Production Solaire"
            value="2.8 kW"
            trend="+25%"
            positive
          />
        </div>

        <section className="rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Consommation en Temps Réel
          </h3>
          <ConsumptionChart />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InfoCard
            title="Conseils d'Économie"
            content="Optimisez votre consommation en programmant votre chauffage selon vos horaires de présence. Nous avons détecté une surconsommation possible entre 18h et 20h."
          />
          <InfoCard
            title="Alertes Écowatt"
            content="Aucune alerte pour aujourd'hui. La consommation nationale est stable. Prévision pour demain : consommation modérée (vert)."
          />
        </div>

        <section className="rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Appareils Connectés</h3>
          <DeviceList />
        </section>
      </div>
      <div>
        &copy;copyright <span className="text-bold">FADWA BOUKACHABA</span> 2025
        - projet version {version}
      </div>
    </div>
  );
};
