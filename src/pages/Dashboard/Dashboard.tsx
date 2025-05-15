import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import AboutUs from "../AboutUs";
import MeasuringSystemPage from "../MeasuringSystem";
import MachinesPage from "../Machines";
import WorkshopsManagement from "../Workshops";
import AboutCompany from "../AboutCompany";

// Navigation items configuration
const navItems = [
  { id: "dashboard", label: "Tableau du bord", component: DashboardPage },
  {
    id: "zone",
    label: "Zone",
    subItems: [
      { id: "workshops", label: "Ateliers", component: WorkshopsManagement },
      { id: "machines", label: "Machines", component: MachinesPage },
    ],
  },
  {
    id: "measuring-system",
    label: "Système de mesure",
    component: MeasuringSystemPage,
  },
  {
    id: "about",
    label: "Qui nous ?",
    component: AboutUs,
    subItems: [
      { id: "aboutTeam", label: "L'équipe dirigeant", component: AboutUs },
      { id: "aboutCompany", label: "L'Entreprise", component: AboutCompany },
    ],
  },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const handleTabClick = (itemId: string) => {
    const item = navItems.find((item) => item.id === itemId);

    if (item?.subItems) {
      // If item has sub-items, set it as active and select first sub-item
      setActiveTab(itemId);
      setActiveSubItem(item.subItems[0].id);
    } else {
      // If no sub-items, just set as active tab
      setActiveTab(itemId);
      setActiveSubItem(null);
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveSubItem(subItemId);
  };

  // Get the active component based on the selected tab and sub-item
  const getActiveComponent = () => {
    const currentItem = navItems.find((item) => item.id === activeTab);

    if (currentItem?.subItems && activeSubItem) {
      const subItem = currentItem.subItems.find(
        (sub) => sub.id === activeSubItem
      );
      return subItem?.component || currentItem.component;
    }

    return currentItem?.component || Dashboard;
  };

  const ActiveComponent = getActiveComponent();

  // Get current active item to check for sub-items
  const currentActiveItem = navItems.find((item) => item.id === activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="">
          {/* Navigation */}
          <nav className="shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex space-x-6 overflow-x-auto">
                {/* Main navigation items */}
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`py-4 px-2 font-medium flex items-center border-b-2 whitespace-nowrap ${
                      activeTab === item.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Sub-navigation items - Show when active tab has sub-items */}
                {currentActiveItem?.subItems && (
                  <>
                    <div className="border-l border-gray-300 self-center h-8"></div>
                    {currentActiveItem.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleSubItemClick(subItem.id)}
                        className={`py-4 px-2 font-medium flex items-center border-b-2 whitespace-nowrap ${
                          activeSubItem === subItem.id
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </>
                )}
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
