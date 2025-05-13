import React from 'react';

const AboutCompany: React.FC = () => {
  const keyFigures = [
    { label: "Année de création", value: "1988" },
    { label: "Effectif", value: "plus de 700 personnes" },
    { label: "Localisation", value: "Marrakech, Maroc" },
    { label: "Marché principal", value: "Export, principalement France (Petit Bateau)" }
  ];

  const values = [
    { title: "Confiance", description: "Communication ouverte, respect et esprit d'équipe." },
    { title: "Responsabilité", description: "Engagement individuel et autonomie." },
    { title: "Collaboration", description: "Synergie entre les services et entraide." },
    { title: "Reconnaissance", description: "Valorisation des contributions, fidélisation des talents." }
  ];

  const hierarchyData = [
    { role: "Cadres supérieurs", count: 8 },
    { role: "Cadres moyens", count: 16 },
    { role: "Agents de maîtrise", count: 41 },
    { role: "Opérateurs et opératrices", count: "700+" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-2">TENMAR</h1>
        <p className="text-xl mb-4">L'Excellence Textile Marocaine</p>
        <p className="text-lg opacity-90">L'alliance de l'excellence artisanale marocaine et de l'innovation industrielle au service du textile international.</p>
      </div>

      {/* Présentation générale */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Présentation générale</h2>
        <p className="text-gray-600 leading-relaxed">
          Créée en 1988 à Marrakech, <strong>TENMAR (Textile Nouvelle Marrakech)</strong> est une référence de l'industrie textile marocaine et la filiale du Groupe Rocher (Petit Bateau). Forte de plus de 700 collaborateurs, l'entreprise conjugue le savoir-faire artisanal marocain à l'exigence industrielle internationale.
        </p>
      </div>

      {/* Activité */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Activité</h2>
        <p className="text-gray-600 leading-relaxed">
          TENMAR est spécialisée dans la confection industrielle de vêtements et sous-vêtements, d'abord pour enfants puis, depuis les années 2000, pour adultes, principalement pour la marque Petit Bateau. L'entreprise se distingue par l'intégration de technologies de pointe (système Lectra, SAP, SISCO) pour garantir une qualité irréprochable et une production optimisée.
        </p>
      </div>

      {/* Valeurs */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Valeurs</h2>
        <p className="text-gray-600 mb-4">TENMAR fonde sa culture sur quatre piliers :</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {values.map((value, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 italic">
          Ses valeurs fondamentales sont la passion, le respect, l'engagement et l'exigence, guidant chaque décision et chaque innovation.
        </p>
      </div>

      {/* Organisation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Organisation</h2>
        <p className="text-gray-600 mb-4">
          TENMAR est structurée en S.A.R.L., dirigée par M. Mohamed Chlyeh, avec une organisation hiérarchique pyramidale :
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {hierarchyData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{item.count}</div>
              <div className="text-gray-700 text-sm font-medium">{item.role}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-600">
          L'entreprise dispose de services fonctionnels performants (logistique, approvisionnement, personnel, informatique, développement) qui assurent la fluidité et la qualité de la chaîne de valeur.
        </p>
      </div>

      {/* Engagement et innovation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Engagement et innovation</h2>
        <p className="text-gray-600">
          TENMAR investit continuellement dans l'innovation et la formation. Elle adopte des outils de gestion intégrée, des systèmes de traçabilité et des solutions de pilotage énergétique pour répondre aux défis de la compétitivité, de la qualité et du développement durable.
        </p>
      </div>

      {/* Responsabilité sociale et environnementale */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Responsabilité sociale et environnementale</h2>
        <p className="text-gray-600">
          L'entreprise accorde une importance majeure à la sécurité, à la santé de ses collaborateurs et à la préservation de l'environnement. Elle s'engage dans une démarche d'amélioration continue, de formation et de respect des normes internationales.
        </p>
      </div>

      {/* Chiffres clés */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chiffres clés</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {keyFigures.map((figure, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">{figure.label}</span>
              <span className="font-bold text-blue-600">{figure.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;