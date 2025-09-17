import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import {EnergyRow} from "../../interfaces.ts";

export default function ConfirmDeleteDialog({
                                                open,
                                                row,
                                                onClose,
                                                onDelete,
                                            }: {
    open: boolean;
    row: EnergyRow | null;
    onClose: () => void;
    onDelete: () => void;
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogContent>
                Êtes-vous sûr de vouloir supprimer les données pour l’année{" "}
                {row?.year} ?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button color="error" onClick={onDelete}>
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    );
}
