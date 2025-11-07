import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { zoneData } from "./data";
import MachinesDetails from "./components/MachineDetails";

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const prepareChartData = () => {
  const data = [];

  // Extract the first (and only) object from the zoneData array
  const zones = zoneData[0];

  // Loop through all the properties (zones) in the object
  Object.keys(zones).forEach((key) => {
    const zone = zones[key];
    data.push({
      name: zone.name,
      PU: zone.PU,
      consumption: zone.consumption,
      carboneImpact: zone.carboneImpact,
      machinesData: zone.machinesData,
    });
  });

  return data;
};

// Colors for the chart segments
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#5210C2",
  "#53D042",
];

export default function WorkshopsManagement() {
  // const [chartData] = useState(prepareChartData());
  const [selectedZone, setSelectedZone] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [chartData, setChartData] = useState(prepareChartData());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [newZone, setNewZone] = useState<{
    name: string;
    PU: number;
    consumption: number;
    carboneImpact: number;
    machinesData?: any[];
  }>({
    name: "",
    PU: 0,
    consumption: 0,
    carboneImpact: 0,
    machinesData: [],
  });

  // Labels for the three metrics
  const metrics = [
    { title: "Puissance en kW", dataKey: "PU", color: "#0088FE" },
    { title: "Consommation en kWh", dataKey: "consumption", color: "#00C49F" },
    {
      title: "Impact carbone en kgCO2e",
      dataKey: "carboneImpact",
      color: "#FF8042",
    },
  ];

  // Format large numbers with thousands separator
  const formatNumber = (value) => {
    return new Intl.NumberFormat("fr-FR").format(value);
  };

  // Calculate totals for each metric
  const calculateTotal = (dataKey) => {
    return chartData.reduce((sum, item) => sum + item[dataKey], 0);
  };

  // Sort data for each metric to show biggest segments first
  const getSortedData = (dataKey) => {
    return [...chartData].sort((a, b) => b[dataKey] - a[dataKey]);
  };

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = payload[0].value;

      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
          <p className="font-bold">{data.name}</p>
          <p>{`${payload[0].name}: ${formatNumber(value)}`}</p>
        </div>
      );
    }

    return null;
  };

  // Pie chart label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Handle opening the popup with zone details
  const handleViewDetails = (zone) => {
    setSelectedZone(zone);
    setShowPopup(true);
  };

  // Popup component for zone details
  const ZoneDetailsPopup = ({ zone }) => {
    if (!zone) return null;

    return (
      <MachinesDetails
        machineName={zone.name}
        data={zone.machinesData}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    );
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 p-6 rounded-lg">
      <div className="w-full max-w-6xl mb-16 bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-blue-800">
            Vue d'ensemble des Ateliers
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border text-left">Zone</th>
                <th className="py-2 px-4 border text-right">Puissance en kW</th>
                <th className="py-2 px-4 border text-right">
                  Consommation en kWh
                </th>
                <th className="py-2 px-4 border text-right">
                  Impact carbone en kgCO2e
                </th>
                <th className="py-2 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/*
                Use chartData (the state with setter) filtered by searchQuery.
                The code below expects `chartData` and `setChartData` to be defined at component top as instructed.
              */}
              {chartData
                .filter((z) =>
                  z.name
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
                )
                .sort((a, b) => b.consumption - a.consumption)
                .map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border text-right">
                      {formatNumber(item.PU)}
                    </td>
                    <td className="py-2 px-4 border text-right">
                      {formatNumber(item.consumption)}
                    </td>
                    <td className="py-2 px-4 border text-right">
                      {formatNumber(item.carboneImpact)}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td className="py-2 px-4 border">Total</td>
                <td className="py-2 px-4 border text-right">
                  {formatNumber(calculateTotal("PU"))}
                </td>
                <td className="py-2 px-4 border text-right">
                  {formatNumber(calculateTotal("consumption"))}
                </td>
                <td className="py-2 px-4 border text-right">
                  {formatNumber(calculateTotal("carboneImpact"))}
                </td>
                <td className="py-2 px-4 border"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add Zone Dialog (Material UI) */}
        <Dialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Ajouter un Atelier</DialogTitle>
          <DialogContent className="space-y-4 flex flex-col gap-4">
            <TextField
              label="Nom de la zone"
              fullWidth
              value={newZone.name}
              onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
            />
            <TextField
              label="Puissance en kW"
              type="number"
              fullWidth
              value={newZone.PU}
              onChange={(e) =>
                setNewZone({ ...newZone, PU: Number(e.target.value) })
              }
            />
            <TextField
              label="Consommation en kWh"
              type="number"
              fullWidth
              value={newZone.consumption}
              onChange={(e) =>
                setNewZone({ ...newZone, consumption: Number(e.target.value) })
              }
            />
            <TextField
              label="Impact carbone en kgCO2e"
              type="number"
              fullWidth
              value={newZone.carboneImpact}
              onChange={(e) =>
                setNewZone({
                  ...newZone,
                  carboneImpact: Number(e.target.value),
                })
              }
            />
            {/* If you want to add machines data you can add a textarea or a custom UI here. */}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Annuler</Button>
            <Button
              variant="contained"
              onClick={() => {
                // Basic validation
                if (!newZone.name.trim()) return;

                const itemToAdd = {
                  name: newZone.name.trim(),
                  PU: Number(newZone.PU) || 0,
                  consumption: Number(newZone.consumption) || 0,
                  carboneImpact: Number(newZone.carboneImpact) || 0,
                  machinesData: newZone.machinesData || [],
                };

                // update chartData state (replace earlier chartData declaration with setter as instructed)
                setChartData((prev) => [...prev, itemToAdd]);

                // reset form and close dialog
                setNewZone({
                  name: "",
                  PU: 0,
                  consumption: 0,
                  carboneImpact: 0,
                  machinesData: [],
                });
                setOpenAddDialog(false);
              }}
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Three charts below the table */}
      {metrics.map((metric, index) => {
        const sortedData = getSortedData(metric.dataKey);
        const totalValue = calculateTotal(metric.dataKey);

        return (
          <div
            key={index}
            className="w-full max-w-6xl mb-16 bg-white p-8 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
              {metric.title}
            </h2>

            <div className="flex flex-col md:flex-row items-center">
              {/* Left side: Chart */}
              <div className="h-96 w-full md:w-2/3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sortedData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={140}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey={metric.dataKey}
                      paddingAngle={2}
                    >
                      {sortedData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Right side: Additional info */}
              <div className="w-full md:w-1/3 mt-8 md:mt-0 md:pl-8">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-lg text-blue-800 mb-2">
                    Total {metric.title}
                  </h3>
                  <p className="text-2xl font-bold">
                    {formatNumber(totalValue)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-800 mb-2">
                    Ateliers Energivores
                  </h3>
                  <ul className="space-y-2">
                    {sortedData.slice(0, 3).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b pb-1"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[idx % COLORS.length],
                            }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="font-medium">
                          {formatNumber(item[metric.dataKey])}
                          <span className="text-xs text-gray-500 ml-1">
                            (
                            {(
                              (item[metric.dataKey] / totalValue) *
                              100
                            ).toFixed(1)}
                            %)
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Details Popup */}
      {showPopup && <ZoneDetailsPopup zone={selectedZone} />}
    </div>
  );
}
