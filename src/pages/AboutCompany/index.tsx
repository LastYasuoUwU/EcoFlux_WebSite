import React from "react";
import {
  Calendar,
  Users,
  MapPin,
  Globe,
  Briefcase,
  Heart,
  Award,
  Activity,
} from "lucide-react";
import LOGO from "./../../assets/Tenmar_LOGO.jpeg";

const AboutCompany: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
        <h1 className="text-3xl font-bold">TENMAR</h1>
        <p className="text-blue-100 mt-2">
          Référence en matière de sous-vêtements et de vêtements pour enfant
        </p>
        <p className="text-blue-100 mt-3 text-lg italic">
          Depuis 1989, un partenaire de confiance pour la mode enfantine et
          adulte
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Présentation Générale with Logo */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Présentation Générale
          </h2>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left column - Content */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                Depuis sa création en 1989 à Marrakech, TENMAR s'est imposée
                comme un acteur incontournable du textile au Maroc. Filiale de
                la marque Petit Bateau, l'entreprise réunit aujourd'hui plus de
                600 collaborateurs engagés, et se distingue par sa maîtrise des
                procédés industriels et son engagement envers les standards de
                qualité internationaux.
              </p>
            </div>

            {/* Right column - Image */}
            <div className="flex justify-center">
              <img
                src={LOGO}
                alt="TENMAR Logo"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Activité */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Activité
          </h2>
          <div className="bg-blue-50 p-5 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              Chez TENMAR, la confection de vêtements et de sous-vêtements est
              au cœur du métier. L'aventure a commencé avec des produits
              destinés aux enfants, avant de s'ouvrir, au début des années 2000,
              à la mode adulte. Partenaire fidèle de Petit Bateau, l'entreprise
              met un point d'honneur à allier efficacité et qualité. Pour y
              parvenir, elle s'appuie sur des technologies de pointe à travers
              un système d'information comme, SAP, GPAO Maintenance, Lectra et
              SISCO,SEC qui permettent de garantir une production fluide,
              précise et parfaitement maîtrisée.
            </p>
          </div>
        </section>

        {/* Valeurs */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            Valeurs
          </h2>
          <p className="text-gray-600 mb-4">
            Chez TENMAR, les valeurs ne sont pas que des mots : elles se vivent
            au quotidien.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">🤝</span>
                Confiance
              </h3>
              <p className="text-gray-600 text-sm">
                Se construit par une communication ouverte, du respect et un
                vrai esprit d'équipe.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="mr-2">💪</span>
                Responsabilité
              </h3>
              <p className="text-gray-600 text-sm">
                Encourage chacun à s'impliquer pleinement et à faire preuve
                d'autonomie.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                <span className="mr-2">🤲</span>
                Collaboration
              </h3>
              <p className="text-gray-600 text-sm">
                Se reflète dans le travail main dans la main entre les équipes,
                à tous les niveaux.
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                <span className="mr-2">⭐</span>
                Reconnaissance
              </h3>
              <p className="text-gray-600 text-sm">
                Passe par la valorisation des efforts et l'envie de faire
                évoluer les talents.
              </p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-center italic">
            Guidée par la passion, le respect, l'engagement et l'exigence,
            TENMAR avance avec l'ambition de grandir ensemble, dans un
            environnement où chacun compte vraiment.
          </p>
        </section>

        {/* Engagement et Innovation */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-amber-600" />
            Engagement et Innovation
          </h2>
          <div className="bg-amber-50 p-5 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              Chez TENMAR, l'innovation va de pair avec l'engagement.
              L'entreprise investit en continu dans la formation de ses équipes
              et l'amélioration de ses outils. Grâce à des systèmes de gestion
              intégrée, de traçabilité et de pilotage énergétique, TENMAR relève
              avec confiance les défis de la compétitivité, de la qualité et du
              développement durable.
            </p>
          </div>
        </section>

        {/* Responsabilité sociale et environnementale */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2 text-teal-600" />
            Responsabilité sociale et environnementale
          </h2>
          <div className="bg-teal-50 p-5 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              TENMAR place la sécurité et la santé de ses collaborateurs au cœur
              de ses priorités, tout en veillant à minimiser son impact sur
              l'environnement. L'entreprise s'engage dans une démarche
              d'amélioration continue, en formant ses équipes et en respectant
              rigoureusement les normes internationales.
            </p>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Nos Piliers
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <span className="text-yellow-400 text-4xl">👐</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">LIBERTÉ</h3>
              <p className="text-gray-600 text-sm">
                Favoriser l'expression et l'épanouissement de chacun
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <span className="text-green-500 text-4xl">🍃</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">QUALITÉ</h3>
              <p className="text-gray-600 text-sm">
                Garantir l'excellence dans chaque produit
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-3 w-16 h-16 mx-auto mb-3 shadow-md">
                <span className="text-orange-400 text-4xl">💡</span>
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">DURABILITÉ</h3>
              <p className="text-gray-600 text-sm">
                S'engager pour un avenir responsable et pérenne
              </p>
            </div>
          </div>
        </section>

        {/* Chiffres Clés */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Chiffres Clés
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-800">1989</p>
              <p className="text-sm text-gray-600">Année de création</p>
            </div>
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-800">615</p>
              <p className="text-sm text-gray-600">Collaborateurs</p>
            </div>
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <p className="text-lg font-bold text-red-800">Marrakech</p>
              <p className="text-sm text-gray-600">Localisation</p>
            </div>
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <Globe className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-lg font-bold text-purple-800">Export</p>
              <p className="text-sm text-gray-600">France (Petit Bateau)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutCompany;
