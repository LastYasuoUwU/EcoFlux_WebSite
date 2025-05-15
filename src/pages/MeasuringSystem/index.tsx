import React from "react";
import {
  Activity,
  BarChart3,
  FileText,
  Zap,
  TrendingDown,
  Gauge,
  Leaf,
  Smartphone,
  Plug,
} from "lucide-react";
import DISPOSTIIVE from "../../assets/diris_a30.jpg";

const MeasuringSystemPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">Eco Flux</h1>
        <p className="text-green-100 mt-2">
          La plateforme intelligente pour la gestion énergétique industrielle
        </p>
        <p className="text-blue-100 mt-3 text-lg italic">
          Transformez vos données énergétiques en un levier de performance et de
          compétitivité.
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Présentation générale */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Présentation générale
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Eco Flux est une application web innovante, développée en interne
            par TENMAR, qui permet de superviser, analyser et optimiser en temps
            réel la consommation énergétique du Site.
          </p>
        </section>

        {/* Fonctionnalités principales avec image */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Fonctionnalités principales
          </h2>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left column - Features */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Monitoring
                </h3>
                <p className="text-gray-600 text-sm">
                  Suivi en temps réel de la consommation d'énergie du matériels
                  et machines, ateliers ou lignes de production, grâce à
                  l'intégration de la centrale SOCOMEC DIRIS A30.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Visualisation intuitive
                </h3>
                <p className="text-gray-600 text-sm">
                  Des tableaux de bord dynamiques et des graphiques clairs
                  permettent une lecture rapide et précise des données
                  énergétiques.
                </p>
              </div>
            </div>

            {/* Center - Image */}
            <div className="flex justify-center">
              <img
                src={DISPOSTIIVE}
                alt="SOCOMEC DIRIS A30 Device"
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </div>

          {/* Bottom row - Additional features */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Suivi et rapports
              </h3>
              <p className="text-gray-600 text-sm">
                Consultez facilement l'historique de vos consommations, comparez
                les périodes pour repérer les tendances, identifiez rapidement
                les anomalies et générez des rapports pour mieux comprendre et
                optimiser vos usages énergétiques.
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Pilotage énergétique
              </h3>
              <p className="text-gray-600 text-sm">
                Un outil d'aide à la décision pour optimiser les horaires de
                fonctionnement, planifier la maintenance et identifier les
                actions d'économie d'énergie à mettre en place.
              </p>
            </div>
          </div>
        </section>

        {/* Avantages pour l'entreprise */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Avantages pour l'entreprise
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Maîtrise des coûts
              </h3>
              <p className="text-gray-600 text-sm">
                Réduction des dépenses énergétiques grâce à une surveillance
                fine et la détection précoce des dérives.
              </p>
            </div>

            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <Gauge className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Performance opérationnelle
              </h3>
              <p className="text-gray-600 text-sm">
                Amélioration continue de l'efficacité énergétique et de la
                compétitivité industrielle.
              </p>
            </div>

            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <Leaf className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Démarche durable
              </h3>
              <p className="text-gray-600 text-sm">
                Un soutien à la stratégie RSE de TENMAR, avec une réduction de
                l'empreinte carbone et un alignement sur les meilleures
                pratiques internationales.
              </p>
            </div>
          </div>
        </section>

        {/* Pourquoi Eco Flux ? */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Pourquoi Eco Flux ?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <Zap className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Solution sur mesure
              </h3>
              <p className="text-gray-600 text-sm">
                Développée spécialement pour TENMAR, pour répondre aux besoins
                uniques de l'entreprise et du secteur textile.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <Smartphone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Interface intuitive
              </h3>
              <p className="text-gray-600 text-sm">
                Facile à prendre en main et accessible sur tous vos appareils
                connectés.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <Plug className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Intégration simple
              </h3>
              <p className="text-gray-600 text-sm">
                Se connecte facilement avec les équipements déjà en place
                (SOCOMEC DIRIS A30)
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MeasuringSystemPage;
