import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { months } from "./months";
import YearRow from "./YearRow";
import YearEditRow from "./YearEditRow";
import ConfirmDialog from "./ConfirmDialog";
import {supabase} from "../../../../supabaseClients.ts";

interface YearRowData {
    year: number;
    values: Record<string, number | null>;
}

export default function YearlyConsumptionTable() {
    const [rows, setRows] = useState<YearRowData[]>([]);
    const [editingYear, setEditingYear] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Record<string, number | null>>({});
    const [deleteTargetYear, setDeleteTargetYear] = useState<number | null>(null);

    // 🔹 Snackbar state
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    // 🔹 Fetch data
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("energy_consumption")
            .select("year, month, total")
            .order("year", { ascending: true })
            .order("month", { ascending: true });

        if (error) {
            console.error(error);
            showSnackbar("Erreur lors du chargement des données", "error");
            return;
        }

        const grouped: Record<number, Record<string, number | null>> = {};
        data.forEach((row) => {
            if (!grouped[row.year]) {
                grouped[row.year] = {};
                months.forEach((m) => (grouped[row.year][m] = null));
            }
            grouped[row.year][months[row.month - 1]] = row.total;
        });

        const formatted = Object.entries(grouped).map(([year, values]) => ({
            year: Number(year),
            values,
        }));

        setRows(formatted);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Start editing
    const handleModify = (row: YearRowData) => {
        setEditingYear(row.year);
        setEditValues({ ...row.values });
    };

    // 🔹 Save changes
    const handleSave = async () => {
        if (editingYear === null) return;

        try {
            for (let i = 0; i < months.length; i++) {
                const monthName = months[i];
                const total = editValues[monthName];
                if (total !== null && total !== undefined) {
                    await supabase
                        .from("energy_consumption")
                        .update({ total })
                        .eq("year", editingYear)
                        .eq("month", i + 1);
                }
            }

            setEditingYear(null);
            await fetchData();
            showSnackbar(`Les données de ${editingYear} ont été mises à jour.`);
        } catch (err) {
            console.error(err);
            showSnackbar("Erreur lors de la mise à jour", "error");
        }
    };

    // 🔹 Delete year
    const handleConfirmDelete = async () => {
        if (deleteTargetYear === null) return;

        try {
            await supabase.from("energy_consumption").delete().eq("year", deleteTargetYear);
            setDeleteTargetYear(null);
            await fetchData();
            showSnackbar(`L'année ${deleteTargetYear} a été supprimée.`);
        } catch (err) {
            console.error(err);
            showSnackbar("Erreur lors de la suppression", "error");
        }
    };

    // 🔹 Add next year
    const handleAddYear = async () => {
        const maxYear = rows.length ? Math.max(...rows.map((r) => r.year)) : new Date().getFullYear();
        const newYear = maxYear + 1;

        try {
            for (let i = 1; i <= 12; i++) {
                await supabase.from("energy_consumption").insert({
                    year: newYear,
                    month: i,
                    total: 0,
                });
            }

            await fetchData();
            showSnackbar(`L'année ${newYear} a été ajoutée.`);
        } catch (err) {
            console.error(err);
            showSnackbar("Erreur lors de l'ajout d'une année", "error");
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Année</TableCell>
                            {months.map((m) => (
                                <TableCell key={m} align="right">
                                    {m}
                                </TableCell>
                            ))}
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <React.Fragment key={row.year}>
                                <YearRow
                                    year={row.year}
                                    values={row.values}
                                    onModify={() => handleModify(row)}
                                    onDelete={() => setDeleteTargetYear(row.year)}
                                />
                                {editingYear === row.year && (
                                    <YearEditRow
                                        year={row.year}
                                        editValues={editValues}
                                        onChange={(month, val) =>
                                            setEditValues((prev) => ({ ...prev, [month]: val }))
                                        }
                                        onSave={handleSave}
                                        onCancel={() => setEditingYear(null)}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                        <TableRow>
                            <TableCell colSpan={months.length + 2} align="center">
                                <Button variant="contained" onClick={handleAddYear}>
                                    ➕ Ajouter l'année suivante
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 🔹 Delete confirmation dialog */}
            <ConfirmDialog
                open={deleteTargetYear !== null}
                title="Confirmer la suppression"
                message={`Voulez-vous vraiment supprimer toutes les données de ${deleteTargetYear} ?`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTargetYear(null)}
            />

            {/* 🔹 Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
