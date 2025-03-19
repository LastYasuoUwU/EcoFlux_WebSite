<!-- TODO: update it -->

# Documentation du Code - Application de Gestion Énergétique

## Table des matières

- [package.json](#package-json)
- [index.html](#index-html)
- [vite.config.ts](#vite-config-ts)
- [tailwind.config.js](#tailwind-config-js)
- [src/index.css](#src-index-css)
- [src/main.tsx](#src-main-tsx)
- [src/App.tsx](#src-App-tsx)
- [src/components/Dashboard.tsx](#src-components-Dashboard-tsx)
- [src/components/Sidebar.tsx](#src-components-Sidebar-tsx)
- [src/components/ConsumptionChart.tsx](#src-components-ConsumptionChart-tsx)
- [src/components/StatCard.tsx](#src-components-StatCard-tsx)
- [src/components/InfoCard.tsx](#src-components-InfoCard-tsx)
- [src/components/DeviceList.tsx](#src-components-DeviceList-tsx)

## Structure du projet

Cette application React utilise:

- Vite comme bundler
- TypeScript pour le typage
- Tailwind CSS pour le style
- Recharts pour les graphiques
- Lucide React pour les icônes

## Fichiers source

### package.json

```json
{
  "name": "ecoflux",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "export": "node export-code.js"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Application de suivi et gestion de la consommation énergétique"
    />
    <title>EnergyTrack - Gestion Énergétique</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
    },
  },
  plugins: [],
};
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### src/main.tsx

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### src/App.tsx

```typescript
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
```

### src/components/Dashboard.tsx

```typescript
import React from "react";
import { StatCard } from "./StatCard";
import { ConsumptionChart } from "./ConsumptionChart";
import { InfoCard } from "./InfoCard";
import { DeviceList } from "./DeviceList";

export const Dashboard: React.FC = () => {
  return (
    <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tableau de bord</h2>
        <p className="text-gray-600">
          Vue d'ensemble de votre consommation énergétique
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Consommation Actuelle"
          value="3.2 kW"
          trend="-12%"
          positive
        />
        <StatCard
          title="Consommation Journalière"
          value="24.7 kWh"
          trend="+5%"
          positive={false}
        />
        <StatCard
          title="Production Solaire"
          value="2.8 kW"
          trend="+25%"
          positive
        />
      </div>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Consommation en Temps Réel
        </h3>
        <ConsumptionChart />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <InfoCard
          title="Conseils d'Économie"
          content="Optimisez votre consommation en programmant votre chauffage selon vos horaires de présence. Nous avons détecté une surconsommation possible entre 18h et 20h."
        />
        <InfoCard
          title="Alertes Écowatt"
          content="Aucune alerte pour aujourd'hui. La consommation nationale est stable. Prévision pour demain : consommation modérée (vert)."
        />
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Appareils Connectés</h3>
        <DeviceList />
      </section>
    </main>
  );
};
```

### src/components/Sidebar.tsx

```typescript
import React from "react";
import {
  BarChart3,
  Home,
  Lightbulb,
  Settings,
  Sun,
  Zap,
  AlertTriangle,
  Calendar,
} from "lucide-react";

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
        active ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
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
```

### src/components/ConsumptionChart.tsx

```typescript
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", consumption: 2.1, production: 0 },
  { time: "02:00", consumption: 1.8, production: 0 },
  { time: "04:00", consumption: 1.5, production: 0 },
  { time: "06:00", consumption: 2.3, production: 0.2 },
  { time: "08:00", consumption: 3.8, production: 1.5 },
  { time: "10:00", consumption: 3.2, production: 2.8 },
  { time: "12:00", consumption: 2.9, production: 3.1 },
  { time: "14:00", consumption: 2.7, production: 2.9 },
  { time: "16:00", consumption: 3.1, production: 2.1 },
  { time: "18:00", consumption: 4.2, production: 0.8 },
  { time: "20:00", consumption: 3.9, production: 0 },
  { time: "22:00", consumption: 2.8, production: 0 },
];

export const ConsumptionChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="consumption"
            name="Consommation"
            stroke="#3B82F6"
            fill="#93C5FD"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="production"
            name="Production Solaire"
            stroke="#10B981"
            fill="#6EE7B7"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
```

### src/components/StatCard.tsx

```typescript
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  positive,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
};
```

### src/components/InfoCard.tsx

```typescript
import React from "react";

interface InfoCardProps {
  title: string;
  content: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};
```

### src/components/DeviceList.tsx

```typescript
import React from "react";
import { Tv, Laptop, Refrigerator, WashingMachine, Coffee } from "lucide-react";

interface Device {
  id: number;
  name: string;
  consumption: string;
  status: "on" | "off" | "standby";
  icon: React.ReactNode;
}

const devices: Device[] = [
  {
    id: 1,
    name: "Télévision Salon",
    consumption: "120W",
    status: "on",
    icon: <Tv className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Ordinateur Bureau",
    consumption: "85W",
    status: "standby",
    icon: <Laptop className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "Réfrigérateur",
    consumption: "150W",
    status: "on",
    icon: <Refrigerator className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "Machine à Laver",
    consumption: "0W",
    status: "off",
    icon: <WashingMachine className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "Cafetière",
    consumption: "0W",
    status: "off",
    icon: <Coffee className="w-5 h-5" />,
  },
];

const statusColors = {
  on: "bg-green-100 text-green-800",
  off: "bg-gray-100 text-gray-800",
  standby: "bg-yellow-100 text-yellow-800",
};

export const DeviceList: React.FC = () => {
  return (
    <div className="divide-y divide-gray-200">
      {devices.map((device) => (
        <div key={device.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">{device.icon}</div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {device.name}
              </h4>
              <p className="text-sm text-gray-500">{device.consumption}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[device.status]
            }`}
          >
            {device.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};
```
