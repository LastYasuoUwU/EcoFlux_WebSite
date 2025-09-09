import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import AboutUs from "../AboutUs";
import MeasuringSystemPage from "../MeasuringSystem";
import WorkshopsManagement from "../Workshops";
import AboutCompany from "../AboutCompany";
import { Button, Menu, MenuItem } from "@mui/material";

type NavSubItem = {
  id: string;
  label: string;
  component: React.ComponentType;
};

type NavItem = {
  id: string;
  label: string;
  component?: React.ComponentType;
  subItems?: NavSubItem[];
};

// Navigation items configuration
const navItems = [
  { id: "dashboard", label: "Tableau du bord", component: DashboardPage },
  {
    id: "zone",
    label: "Zone",
    component: WorkshopsManagement,
  },
  {
    id: "measuring-system",
    label: "Système de mesure",
    component: MeasuringSystemPage,
  },
  {
    id: "about",
    label: "Qui sommes-nous ?",
    component: AboutUs,
  },
];

const Dashboard: React.FC = () => {
  // track which main tab is selected
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  // track which submenu item is selected (if any)
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  // state for MUI Menu anchor + which menu is open
  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null;
    itemId: string | null;
  }>({ anchorEl: null, itemId: null });

  // click on a main button
  const handleMainClick = (
    event: MouseEvent<HTMLButtonElement>,
    item: NavItem
  ) => {
    if (item.subItems) {
      // open its submenu
      setMenuState({ anchorEl: event.currentTarget, itemId: item.id });
    } else {
      // no submenu → just activate
      setActiveTab(item.id);
      setActiveSubItem(null);
    }
  };

  // close whichever menu is open
  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, itemId: null });
  };

  // click on a submenu item
  const handleSubItemClick = (parentId: string, sub: NavSubItem) => {
    setActiveTab(parentId);
    setActiveSubItem(sub.id);
    handleMenuClose();
  };

  // decide which component to render
  const renderActive = () => {
    const main = navItems.find((n) => n.id === activeTab)!;
    if (main.subItems && activeSubItem) {
      const sub = main.subItems.find((s) => s.id === activeSubItem)!;
      return <sub.component />;
    }
    return main.component ? <main.component /> : null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAV */}
      <nav className="shadow-sm bg-white">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 overflow-x-auto">
            {navItems.map((item) => {
              const isActiveMain = activeTab === item.id && !item.subItems;
              const isActiveParent = activeTab === item.id && !!activeSubItem;

              return (
                <div key={item.id} className="relative">
                  <Button
                    onClick={(e) => handleMainClick(e, item)}
                    endIcon={
                      item.subItems ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          className="fill-current"
                        >
                          <path d="M8 11L3 6h10l-5 5z" />
                        </svg>
                      ) : undefined
                    }
                    className={`
                      capitalize font-medium border-b-2 whitespace-nowrap
                      ${
                        isActiveMain || isActiveParent
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                      }
                    `}
                  >
                    {item.label}
                  </Button>

                  {item.subItems && menuState.itemId === item.id && (
                    <Menu
                      anchorEl={menuState.anchorEl}
                      open={Boolean(menuState.anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {item.subItems.map((sub) => (
                        <MenuItem
                          key={sub.id}
                          onClick={() => handleSubItemClick(item.id, sub)}
                          className={`whitespace-nowrap w-40 ${
                            activeSubItem === sub.id
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          {sub.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="container mx-auto px-4 py-8">{renderActive()}</main>
    </div>
  );
};

export default Dashboard;
