import { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  Layers,
  Award,
  Monitor,
  BarChart3,
  Settings,
  Wifi,
  Activity,
} from "lucide-react";

const DirisA30Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("multimeasure");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "Ergonomie optimisée",
      description:
        "Interface claire avec écran rétroéclairé multi-affichage et accès direct aux fonctions, pour une utilisation simple et efficace.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Fiabilité de l'installation",
      description:
        "Intègre une fonction avancée de détection des erreurs de câblage, garantissant une mise en service sécurisée.",
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      title: "Évolutivité et modularité",
      description:
        "Compatible avec des modules additionnels (communication, entrées/sorties numériques ou analogiques), offrant une flexibilité durable.",
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Conformité aux standards internationaux",
      description:
        "Certifié IEC 61557-12, assurant des performances mesurées et une fiabilité éprouvée dans les environnements industriels.",
    },
  ];

  const controlButtons = [
    { num: 1, desc: "Écran LCD rétroéclairé" },
    {
      num: 2,
      desc: "Bouton poussoir des courants et de la fonction de correction du raccordement",
    },
    { num: 3, desc: "Bouton poussoir des tensions et de la fréquence" },
    {
      num: 4,
      desc: "Bouton poussoir des puissances active, réactive, apparente et du facteur de puissance",
    },
    {
      num: 5,
      desc: "Bouton poussoir des valeurs maximales et moyennes des courants et puissances",
    },
    { num: 6, desc: "Bouton poussoir des harmoniques" },
    {
      num: 7,
      desc: "Bouton poussoir des compteurs d'énergie électrique, horaire et impulsionnels",
    },
  ];

  const functionalityTabs = {
    multimeasure: {
      title: "Multimesure",
      icon: <Activity className="w-5 h-5" />,
      items: [
        "Courants",
        "Tensions & Fréquence",
        "Puissances",
        "Facteurs de puissance",
        "Kfactor",
        "Températures",
      ],
    },
    counting: {
      title: "Comptage",
      icon: <BarChart3 className="w-5 h-5" />,
      items: [
        "Énergie active: +/- kWh",
        "Énergie réactive: +/- kvarh",
        "Énergie apparente: kVAh",
        "Horaire",
      ],
    },
    harmonic: {
      title: "Analyse harmonique",
      icon: <Zap className="w-5 h-5" />,
      items: ["Taux de distorsion harmonique", "Individuels jusqu'au 63e rang"],
    },
    curves: {
      title: "Courbes de charges",
      icon: <Monitor className="w-5 h-5" />,
      items: [
        "Puissances actives & réactives: ΣP+/-; ΣQ+/-",
        "Tensions & fréquences: V1, V2, V3, U12, U23, U31, F",
      ],
    },
    communications: {
      title: "Communications",
      icon: <Wifi className="w-5 h-5" />,
      items: [
        "RS485 (Modbus & Profibus-DP)",
        "Ethernet (Modbus/TCP ou Modbus RTU)",
        "Ethernet avec passerelle RS485 Modbus RTU sur TCP",
      ],
    },
    io: {
      title: "Entrées/Sorties",
      icon: <Settings className="w-5 h-5" />,
      items: [
        "Comptage d'impulsions",
        "Contrôle/commande d'appareillages",
        "Report d'alarmes",
        "Report d'impulsions",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30"></div>
        <div
          className={`container mx-auto px-6 py-20 relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DIRIS A-30
            </h1>
            <p className="text-2xl mb-8 text-gray-700 font-medium">
              Solution intelligente de mesure et de supervision électrique
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Le DIRIS A-30 met à disposition toutes les données essentielles
              pour optimiser l'efficacité énergétique et assurer un contrôle
              fiable de la distribution. Grâce à son intégration avec des
              logiciels spécialisés, l'analyse et l'exploitation des
              informations peuvent se faire en toute simplicité.
            </p>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Découvrir les fonctionnalités
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Avantages du{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DIRIS A-30
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Interface Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Façade du{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DIRIS A-30
            </span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Actual Device Image */}
              <div className="relative">
                {/* <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl shadow-xl border border-gray-300 hover:border-blue-400 transition-all duration-500">
                  <div className="relative overflow-hidden rounded-xl">
                    <div
                      className="w-full rounded-xl shadow-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-400"
                      style={{ minHeight: "350px" }}
                    >
                      <div className="text-center p-8">
                        <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-600">
                          <div className="bg-gradient-to-r from-green-400 to-blue-400 h-20 rounded flex items-center justify-center text-sm font-bold text-gray-900">
                            LCD DISPLAY
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                            <div
                              key={num}
                              className={`${index === 6 ? "col-span-4" : ""}`}
                            >
                              <button className="bg-gradient-to-br from-gray-600 to-gray-700 hover:from-blue-600 hover:to-blue-700 w-full h-10 rounded text-sm font-bold transition-all duration-300 border border-gray-500">
                                {num}
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-xs text-gray-400">
                          DIRIS A-30 Interface
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                      Interface utilisateur avec écran LCD rétroéclairé et
                      boutons de navigation
                    </p>
                  </div>
                </div> */}
                <img
                  alt="DIRIS A30 image"
                  src={
                    "https://res.cloudinary.com/dbhv2ff2q/image/upload/v1757880971/DIRIS%20A30/pic1_obfnm9.png"
                  }
                />
              </div>

              {/* Controls Description */}
              <div className="space-y-4">
                {controlButtons.map((button, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {button.num}
                      </span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {button.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Architecture du Système de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Monitoring Énergétique
            </span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <img
                alt="alt o sf"
                src={
                  "https://res.cloudinary.com/dbhv2ff2q/image/upload/v1757880971/DIRIS%20A30/pic2_nba0yc.png"
                }
              />

              <img
                alt="alt o sf"
                src="https://res.cloudinary.com/dbhv2ff2q/image/upload/v1757880971/DIRIS%20A30/pic3_pypssy.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Functionalities Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fonctionnalités
            </span>
          </h2>
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.keys(functionalityTabs).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === tabKey
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {functionalityTabs[tabKey].icon}
                  <span className="text-sm font-medium">
                    {functionalityTabs[tabKey].title}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 flex items-center justify-center gap-3">
                {functionalityTabs[activeTab].icon}
                {functionalityTabs[activeTab].title}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {functionalityTabs[activeTab].items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  >
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DirisA30Page;
