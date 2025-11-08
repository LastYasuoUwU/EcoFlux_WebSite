import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { getMachineName, Machine, totalViewWorkshops } from "../../types";
import { fetchEnergyStats } from "../../Services/energyStatsService";
import { supabase } from "../../../../supabaseClients";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "../CustomTootip";

const EnergyStatsDashboard = () => {
  const [data, setData] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totals, setTotals] = useState<totalViewWorkshops>({
    puissance: 0,
    consommation: 0,
    impact: 0,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [selectedMachine, setSelectedMachine] = useState<string>();
  const [detailsData, setDetailsData] = useState<any[]>([]);
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const { stats, totals } = await fetchEnergyStats();
        setData(stats);
        setTotals(totals);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // const handleShowDetails = async (machine: string) => {
  //   setSelectedMachine(machine);
  //   setOpen(true);
  //   setDetailsLoading(true);

  //   try {
  //     const { data: machineDetails, error } = await supabase
  //       .from("atelier_coupe")
  //       .select("machine, pu_kw, impact_carbone_kgco2e");

  //     if (error) throw error;

  //     setDetailsData(machineDetails || []);
  //   } catch (err: any) {
  //     console.error(err.message);
  //   } finally {
  //     setDetailsLoading(false);
  //   }
  // };

  const handleShowDetails = async (machine: string) => {
    setSelectedMachine(machine);
    setOpen(true);
    setDetailsLoading(true);

    try {
      const { data: machineDetails, error } = await supabase.rpc(
        "get_machine_energy_details",
        { table_name: machine }
      );

      if (error) throw error;

      setDetailsData(machineDetails || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const formatNumber = (num: number): string =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <CircularProgress size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Alert severity="error" className="max-w-2xl">
          <strong>Error:</strong> {error}
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Statistiques Énergétiques
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Vue d'ensemble de la consommation et de l'impact carbone
        </Typography>
      </div>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-bold text-gray-700">
                Machines
              </TableCell>
              <TableCell align="right" className="font-bold text-gray-700">
                Puissance (kW)
              </TableCell>
              <TableCell align="right" className="font-bold text-gray-700">
                Consommation (kWh)
              </TableCell>
              <TableCell align="right" className="font-bold text-gray-700">
                Impact Carbone (kg CO₂e)
              </TableCell>
              <TableCell align="center" className="font-bold text-gray-700">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                hover
              >
                <TableCell>
                  <Chip
                    label={getMachineName(row.machine)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {formatNumber(row.sum_pu_kw ?? 0)}
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {formatNumber(row.sum_consumption ?? 0)}
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {formatNumber(row.sum_impact_carbone ?? 0)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleShowDetails(row.machine)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-indigo-50">
              <TableCell className="font-bold text-lg">TOTAL</TableCell>
              <TableCell align="right" className="font-bold text-lg font-mono">
                {formatNumber(totals.puissance)}
              </TableCell>
              <TableCell align="right" className="font-bold text-lg font-mono">
                {formatNumber(totals.consommation)}
              </TableCell>
              <TableCell align="right" className="font-bold text-lg font-mono">
                {formatNumber(totals.impact)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Détails de {getMachineName(selectedMachine || "")}
        </DialogTitle>
        <DialogContent>
          {detailsLoading ? (
            <CircularProgress />
          ) : detailsData.length > 0 ? (
            <>
              <Typography variant="h6" className="mb-4">
                Puissance (kW)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={detailsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="machine" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="pu_kw" stroke="#3f51b5" />
                </LineChart>
              </ResponsiveContainer>

              <Typography variant="h6" className="mt-6 mb-4">
                Impact Carbone (kg CO₂e)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={detailsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="machine" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="impact_carbone_kgco2e"
                    stroke="#f50057"
                  />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <Typography>
              Aucune donnée disponible pour cette machine.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnergyStatsDashboard;
