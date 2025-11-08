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
} from "@mui/material";
import { supabase } from "../../../../supabaseClients";
import { getMachineName, Machine, machinesNames } from "../../types";

const EnergyStatsDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totals, setTotals] = useState({
    puissance: 0,
    consommation: 0,
    impact: 0,
  });

  useEffect(() => {
    fetchEnergyStats();
  }, []);

  const fetchEnergyStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: stats, error: queryError } = await supabase.rpc(
        "get_all_energy_stats"
      );

      if (queryError) throw queryError;

      if (stats && stats.length > 0) {
        const aggregated = stats.reduce(
          (acc, item: Machine) => {
            const puissance = item.sum_pu_kw || 0;
            const consommation = item.sum_consmption || 0;
            const impact = item.sum_impact_carbone || 0;

            acc.puissance += puissance;
            acc.consommation += consommation;
            acc.impact += impact;

            return acc;
          },
          { puissance: 0, consommation: 0, impact: 0 }
        );

        setTotals(aggregated);
      }

      setData(stats || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) =>
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
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Statistiques Énergétiques
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Vue d'ensemble de la consommation et de l'impact carbone
        </Typography>
      </div>

      {/* Data Table */}
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
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row: any, index: number) => (
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
                  {formatNumber(row.sum_pu_kw)}
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {formatNumber(row.sum_consmption)}
                </TableCell>
                <TableCell align="right" className="font-mono">
                  {formatNumber(row.sum_impact_carbone)}
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EnergyStatsDashboard;
