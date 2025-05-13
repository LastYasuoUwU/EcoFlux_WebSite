import React from 'react';

const MeasuringSystemPage: React.FC = () => {
  const mainFeatures = [
    {
      title: "Monitoring temps réel",
      description: "Suivi en continu des consommations électriques de chaque machine, atelier ou ligne de production grâce à l'intégration avec la centrale SOCOMEC DIRIS A30."
    },
    {
      title: "Visualisation intuitive",
      description: "Tableaux de bord dynamiques, graphiques et indicateurs clés pour une lecture rapide et précise des données énergétiques."
    },
    {
      title: "Analyse et reporting",
      description: "Accès à l'historique des consommations, comparaison par période, identification des pics et des dérives, génération de rapports personnalisés."
    },
    {
      title: "Pilotage énergétique",
      description: "Outil d'aide à la décision pour optimiser les horaires de fonctionnement, planifier la maintenance et cibler les actions d'économie d'énergie."
    }
  ];

  const benefits = [
    {
      title: "Maîtrise des coûts",
      description: "Réduction des dépenses énergétiques grâce à une surveillance fine et à la détection proactive des dérives."
    },
    {
      title: "Performance opérationnelle",
      description: "Amélioration continue de l'efficacité énergétique et de la compétitivité industrielle."
    },
    {
      title: "Démarche durable",
      description: "Contribution à la stratégie RSE de TENMAR, réduction de l'empreinte carbone et alignement sur les meilleures pratiques internationales."
    }
  ];

  const targetUsers = [
    "Responsables de production",
    "Managers énergie",
    "Maintenance industrielle",
    "Direction générale"
  ];

  const whyChoose = [
    "Solution sur-mesure, adaptée aux besoins spécifiques de TENMAR et de l'industrie textile.",
    "Interface simple, ergonomique et accessible depuis tout support connecté.",
    "Intégration transparente avec les équipements existants (SOCOMEC DIRIS A30).",
    "Support et évolution continue par l'équipe interne."
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Eco Flux</h1>
        <p className="text-xl mb-4">La plateforme intelligente de gestion énergétique pour l'industrie</p>
        <p className="text-lg opacity-90 italic">Transformez vos données énergétiques en levier de performance et de compétitivité.</p>
      </div>

      {/* Présentation générale */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Présentation générale</h2>
        <p className="text-gray-600 leading-relaxed">
          Eco Flux est une application web innovante, développée en interne chez TENMAR, dédiée à la supervision, l'analyse et l'optimisation des consommations énergétiques en temps réel au sein des sites industriels.
        </p>
      </div>

      {/* Fonctionnalités principales */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Fonctionnalités principales</h2>
        <div className="space-y-4">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avantages pour l'entreprise */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Avantages pour l'entreprise</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pour qui ? */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pour qui ?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {targetUsers.map((user, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-lg font-medium text-gray-700">{user}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pourquoi choisir Eco Flux ? */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pourquoi choisir Eco Flux ?</h2>
        <div className="space-y-3">
          {whyChoose.map((reason, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-4"></div>
              <p className="text-gray-600 leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeasuringSystemPage;