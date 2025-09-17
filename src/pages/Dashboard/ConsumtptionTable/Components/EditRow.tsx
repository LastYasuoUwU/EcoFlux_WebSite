import { Button, Collapse, TextField } from "@mui/material";
import {EnergyRow} from "../../interfaces.ts";

export default function EditRow({
    row,
    months,
    editValues,
    setEditValues,
    onSave,
    onCancel,
}: {
    row: EnergyRow;
    months: string[];
    editValues: { [key: string]:unknown };
    setEditValues: React.Dispatch<
        React.SetStateAction<{ [key: string]:unknown }>
    >;
    onSave: () => void;
    onCancel: () => void;
}) {
    return (
        <Collapse in={true} timeout="auto" unmountOnExit>
            <div className="p-4">
                <h3 className="font-semibold mb-2">
                    Modifier l’année {row.year}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {months.map((month) => (
                        <TextField
                            key={month}
                            label={month}
                            type="number"
                            value={editValues[month]}
                            onChange={(e) =>
                                setEditValues({
                                    ...editValues,
                                    [month]: Number(e.target.value),
                                })
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
    );
}
