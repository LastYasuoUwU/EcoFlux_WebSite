import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { enqueueSnackbar } from "notistack";
import { supabase } from "../../../../supabaseClient";

export default function WorkshopTable() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    workshopId: null,
    workshopLabel: "",
  });

  useEffect(() => {
    // Function to fetch workshops from Supabase
    const fetchWorkshops = async () => {
      try {
        setLoading(true);

        // Fetch data from the workshops table
        const { data, error } = await supabase
          .from("workshops")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setWorkshops(data || []);
      } catch (error) {
        console.error("Error fetching workshops:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (workshop) => {
    setDeleteDialog({
      open: true,
      workshopId: workshop.id,
      workshopLabel: workshop.label,
    });
  };

  // Close delete dialog
  const handleCloseDialog = () => {
    setDeleteDialog({
      ...deleteDialog,
      open: false,
    });
  };

  // Confirm and execute delete
  const handleConfirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("workshops")
        .delete()
        .eq("id", deleteDialog.workshopId);

      if (error) throw error;

      enqueueSnackbar(
        `Atelier "${deleteDialog.workshopLabel}" supprimé avec succès`,
        {
          variant: "success",
        }
      );

      // Refresh data after deletion
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      enqueueSnackbar(`Erreur: ${error.message}`, {
        variant: "error",
      });
    } finally {
      handleCloseDialog();
    }
  };

  // Calculate displayed rows based on pagination
  const displayedWorkshops = workshops.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom sx={{ my: 3 }}>
        Liste des Ateliers
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          Erreur: {error}
        </Alert>
      ) : workshops.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          Aucun atelier trouvé. Veuillez en créer un nouveau.
        </Alert>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Date de création
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Label</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedWorkshops.map((workshop) => (
                  <TableRow hover key={workshop.id}>
                    <TableCell>
                      {new Date(workshop.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell>{workshop.label}</TableCell>
                    <TableCell>
                      {workshop.description.length > 100
                        ? `${workshop.description.substring(0, 100)}...`
                        : workshop.description}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Modifier">
                        <IconButton aria-label="edit" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteClick(workshop)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={workshops.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Lignes par page:"
          />
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer l'atelier "
            {deleteDialog.workshopLabel}" ? Cette action ne peut pas être
            annulée.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
