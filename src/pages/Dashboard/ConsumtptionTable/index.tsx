import React, {useEffect, useState} from "react";
import {
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {supabase} from "../../../supabaseClients";

// Month labels in French
const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

interface YearRow {
    year: number;
    values: Record<string, number | null>;
}

export default function YearlyConsumptionTable() {
    const [rows, setRows] = useState<YearRow[]>([]);
    const [editingYear, setEditingYear] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Record<string, number | null>>(
        {}
    );

    // 🔹 Fetch data from Supabase
    const fetchData = async () => {
        const {data, error} = await supabase
            .from("energy_consumption")
            .select("year, month, total")
            .order("year", {ascending: true})
            .order("month", {ascending: true});

        if (error) {
            console.error(error);
            return;
        }

        // Pivot: year → months
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
    const handleModify = (row: YearRow) => {
        setEditingYear(row.year);
        setEditValues({...row.values});
    };

    // 🔹 Save changes (update Supabase)
    const handleSave = async () => {
        if (editingYear === null) return;

        try {
            for (let i = 0; i < months.length; i++) {
                const monthName = months[i];
                const total = editValues[monthName];

                if (total !== null && total !== undefined) {
                    await supabase
                        .from("energy_consumption")
                        .update({
                            year: editingYear,
                            month: i + 1,
                            total,
                        }).eq('year', editingYear).eq('month', i + 1);
                }
            }

            setEditingYear(null);
            await fetchData(); // refresh table after saving
        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 Delete entire year
    const handleDeleteYear = async (year: number) => {
        try {
            await supabase.from("energy_consumption").delete().eq("year", year);
            await fetchData(); // refresh
        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 Add next year
    const handleAddYear = async () => {
        const maxYear = rows.length ? Math.max(...rows.map((r) => r.year)) : 2024;
        const newYear = maxYear + 1;

        for (let i = 1; i <= 12; i++) {
            await supabase.from("energy_consumption").insert({
                year: newYear,
                month: i,
                total: 0,
            });
        }

        await fetchData();
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
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
                            <TableRow>
                                <TableCell>{row.year}</TableCell>
                                {months.map((m) => (
                                    <TableCell key={m} align="right">
                                        {row.values[m] ?? "-"}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleModify(row)}
                                        sx={{mr: 1}}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteYear(row.year)}
                                    >
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>

                            {editingYear === row.year && (
                                <TableRow>
                                    <TableCell colSpan={months.length + 2}>
                                        <Collapse in={true}>
                                            <div className="p-4">
                                                <h3 className="font-semibold mb-2">
                                                    Modifier {row.year}
                                                </h3>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {months.map((m) => (
                                                        <TextField
                                                            key={m}
                                                            label={m}
                                                            type="number"
                                                            value={editValues[m] ?? ""}
                                                            onChange={(e) =>
                                                                setEditValues({
                                                                    ...editValues,
                                                                    [m]: e.target.value
                                                                        ? Number(e.target.value)
                                                                        : null,
                                                                })
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <Button variant="contained" onClick={handleSave}>
                                                        Enregistrer
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => setEditingYear(null)}
                                                    >
                                                        Annuler
                                                    </Button>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Add year button */}
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
    );
}
