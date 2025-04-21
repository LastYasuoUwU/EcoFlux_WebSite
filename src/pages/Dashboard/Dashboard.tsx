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
