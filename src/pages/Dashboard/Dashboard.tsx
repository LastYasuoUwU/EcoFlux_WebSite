import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import Consumption from "./Consumptions";
import Analytics from "./Analytics";
import Reports from "./Reports";
import Settings from "./Settings";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Navigation items configuration
  const navItems = [
    { id: "dashboard", label: "Tableau du board", component: DashboardPage },
    { id: "consumption", label: "Consommation", component: Consumption },
    { id: "analytics", label: "Analyses", component: Analytics },
    { id: "reports", label: "Rapports", component: Reports },
    { id: "settings", label: "Paramètres", component: Settings },
  ];

  // Get the active component based on the selected tab
  const ActiveComponent =
    navItems.find((item) => item.id === activeTab)?.component || Dashboard;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="">
          {/* Device Summary */}
          <div className="border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mr-4">
                  <h2 className="text-lg font-medium">
                    PowerLogic™ PM5100 - Model EAV15105-FR11
                  </h2>
                  <p className="text-sm text-wrap">
                    Compteur de puissance avancé avec des capacités de
                    surveillance et de mesure de haute précision
                  </p>
                </div>
                <div className="mt-2 md:mt-0 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500">Serie:</span>
                    <span className="ml-2 font-medium">PM51-22871</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">Firmware:</span>
                    <span className="ml-2 font-medium">v3.2.1</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 font-medium text-green-600">
                      Online
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">dernier mise à jour:</span>
                    <span className="ml-2 font-medium">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex space-x-6 overflow-x-auto">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`py-4 px-2 font-medium flex items-center border-b-2 ${
                      activeTab === item.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content - Renders the active component */}
          <main className="container mx-auto px-4 py-8">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
