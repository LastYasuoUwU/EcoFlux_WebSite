import { Collapse, TableCell, TableRow, TextField, Button } from "@mui/material";
import { months } from "./months";

interface YearEditRowProps {
    year: number;
    editValues: Record<string, number | null>;
    onChange: (month: string, value: number | null) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function YearEditRow({ year, editValues, onChange, onSave, onCancel }: YearEditRowProps) {
    return (
        <TableRow>
            <TableCell colSpan={months.length + 2}>
                <Collapse in={true}>
                    <div className="p-4">
                        <h3 className="font-semibold mb-2">Modifier {year}</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {months.map((m) => (
                                <TextField
                                    key={m}
                                    label={m}
                                    type="number"
                                    value={editValues[m] ?? ""}
                                    onChange={(e) =>
                                        onChange(m, e.target.value ? Number(e.target.value) : null)
                                    }
                                />
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button variant="contained" onClick={onSave}>
                                Enregistrer
                            </Button>
                            <Button variant="outlined" onClick={onCancel}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
