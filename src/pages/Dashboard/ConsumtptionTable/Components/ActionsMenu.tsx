import { Button } from "@mui/material";
import { Bolt, Trash } from "lucide-react";
import {EnergyRow} from "../../interfaces.ts";

export default function ActionsMenu({
                                        onModify,
                                        onDelete,
                                    }: {
    row: EnergyRow;
    onModify: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex w-full justify-between">
            <Button variant="outlined" startIcon={<Bolt />} onClick={onModify}>
                Modifier
            </Button>
            <Button
                variant="outlined"
                color="error"
                startIcon={<Trash />}
                onClick={onDelete}
            >
                Supprimer
            </Button>
        </div>
    );
}
