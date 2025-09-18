import { TableCell, TableRow, Button } from "@mui/material";
import { months } from "./months";

interface YearRowProps {
    year: number;
    values: Record<string, number | null>;
    onModify: () => void;
    onDelete: () => void;
}

export default function YearRow({ year, values, onModify, onDelete }: YearRowProps) {
    return (
        <TableRow>
            <TableCell>{year}</TableCell>
            {months.map((m) => (
                <TableCell key={m} align="right">
                    {values[m] ?? "-"}
                </TableCell>
            ))}
            <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={onModify} sx={{ mr: 1 }}>
                    Modifier
                </Button>
                <Button variant="outlined" color="error" onClick={onDelete}>
                    Supprimer
                </Button>
            </TableCell>
        </TableRow>
    );
}
