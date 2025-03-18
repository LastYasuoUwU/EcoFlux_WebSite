import React from 'react';
import { BarChart3, Home, Lightbulb, Settings, Sun, Zap, AlertTriangle, Calendar } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false }) => {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
        active
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      {text}
    </a>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold">EnergyTrack</h1>
        </div>
      </div>
      <nav className="mt-6">
        <NavItem icon={<Home />} text="Vue d'ensemble" active />
        <NavItem icon={<BarChart3 />} text="Consommation" />
        <NavItem icon={<Sun />} text="Production" />
        <NavItem icon={<Lightbulb />} text="Appareils" />
        <NavItem icon={<Calendar />} text="Planification" />
        <NavItem icon={<AlertTriangle />} text="Alertes" />
        <NavItem icon={<Settings />} text="Paramètres" />
      </nav>
    </aside>
  );
};