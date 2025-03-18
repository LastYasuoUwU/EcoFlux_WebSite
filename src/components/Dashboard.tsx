import React from 'react';
import { StatCard } from './StatCard';
import { ConsumptionChart } from './ConsumptionChart';
import { InfoCard } from './InfoCard';
import { DeviceList } from './DeviceList';

export const Dashboard: React.FC = () => {
  return (
    <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
        <p className="text-gray-600">Vue d'ensemble de votre consommation énergétique</p>
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

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Consommation en Temps Réel</h3>
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

      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Appareils Connectés</h3>
        <DeviceList />
      </section>
    </main>
  );
};