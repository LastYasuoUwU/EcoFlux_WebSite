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
  DialogTitle,
  Button,
  TextField,
  Drawer,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../supabaseClient";

/**
 * Generic Data Table Component with CRUD operations
 *
 * @param {Object} props
 * @param {string} props.title - Title of the table
 * @param {string} props.tableName - Supabase table name
 * @param {Array} props.columns - Array of column definitions
 * @param {string} props.orderBy - Default column to order by
 * @param {boolean} props.orderAscending - Default order direction
 * @param {string} props.idField - Name of the ID field (default: 'id')
 * @param {Array} props.rowsPerPageOptions - Options for rows per page
 * @param {number} props.defaultRowsPerPage - Default rows per page
 * @param {Function} props.onDataChange - Callback when data changes
 */
export default function GenericDataTable({
  title = "",
  tableName,
  columns = [],
  orderBy = "created_at",
  orderAscending = false,
  idField = "id",
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  onDataChange = () => {},
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Form states
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // Delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    itemId: null,
    itemName: "",
  });

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch data on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchData();
  }, [refreshTrigger, tableName, orderBy, orderAscending]);

  // Set form values when editing an item
  useEffect(() => {
    if (currentItem && formMode === "edit") {
      // Set values for each form field
      columns.forEach((column) => {
        if (column.editable !== false) {
          setValue(column.field, currentItem[column.field]);
        }
      });
    }
  }, [currentItem, formMode, columns, setValue]);

  // Function to fetch data from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data from the specified table
      const { data: tableData, error: tableError } = await supabase
        .from(tableName)
        .select("*")
        .order(orderBy, { ascending: orderAscending });

      if (tableError) {
        throw tableError;
      }

      setData(tableData || []);
      onDataChange(tableData || []);
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open form in add mode
  const handleAddNew = () => {
    setFormMode("add");
    reset(); // Clear form fields
    setCurrentItem(null);
    setFormOpen(true);
  };

  // Open form in edit mode
  const handleEditItem = (item) => {
    setFormMode("edit");
    setCurrentItem(item);
    setFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setFormOpen(false);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (item) => {
    // Find the display field (title or name field) for the item
    const displayField =
      columns.find((col) => col.isTitle)?.field || columns[0].field;

    setDeleteDialog({
      open: true,
      itemId: item[idField],
      itemName: item[displayField] || `Item #${item[idField]}`,
    });
  };

  // Close delete dialog
  const handleCloseDialog = () => {
    setDeleteDialog({
      ...deleteDialog,
      open: false,
    });
  };

  // Submit form data (create or update)
  const onSubmitForm = async (formData) => {
    try {
      if (formMode === "add") {
        // Create new item
        const { data: newItem, error } = await supabase
          .from(tableName)
          .insert(formData)
          .select();

        if (error) throw error;

        enqueueSnackbar("Item créé avec succès", { variant: "success" });
      } else {
        // Update existing item
        const { error } = await supabase
          .from(tableName)
          .update(formData)
          .eq(idField, currentItem[idField]);

        if (error) throw error;

        enqueueSnackbar("Item mis à jour avec succès", { variant: "success" });
      }

      // Refresh data and close form
      setRefreshTrigger((prev) => prev + 1);
      handleCloseForm();
    } catch (error) {
      enqueueSnackbar(`Erreur: ${error.message}`, { variant: "error" });
    }
  };

  // Confirm and execute delete
  const handleConfirmDelete = async () => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(idField, deleteDialog.itemId);

      if (error) throw error;

      enqueueSnackbar(`Item "${deleteDialog.itemName}" supprimé avec succès`, {
        variant: "success",
      });

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

  // Format cell value based on column type
  const formatCellValue = (column, value) => {
    if (value === null || value === undefined) return "-";

    switch (column.type) {
      case "date":
        return new Date(value).toLocaleDateString();
      case "datetime":
        return new Date(value).toLocaleString();
      case "boolean":
        return value ? "Oui" : "Non";
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value;
      default:
        return value;
    }
  };

  // Truncate text if needed
  const truncateText = (text, maxLength = 100) => {
    if (typeof text !== "string") return text;
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Calculate displayed rows based on pagination
  const displayedItems = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Get visible columns (excludes hidden columns)
  const visibleColumns = columns.filter((column) => !column.hidden);

  // Render form field based on column type
  const renderFormField = (column) => {
    const { field, label, type, required, options, helperText } = column;

    switch (type) {
      case "select":
        return (
          <FormControl fullWidth error={!!errors[field]} required={required}>
            <InputLabel id={`${field}-label`}>{label}</InputLabel>
            <Controller
              name={field}
              control={control}
              rules={{
                required: required ? `${label} est obligatoire` : false,
              }}
              defaultValue=""
              render={({ field: { onChange, value, ...props } }) => (
                <Select
                  labelId={`${field}-label`}
                  id={field}
                  value={value || ""}
                  onChange={onChange}
                  label={label}
                  {...props}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors[field] && (
              <FormHelperText>{errors[field].message}</FormHelperText>
            )}
            {helperText && !errors[field] && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case "boolean":
        return (
          <FormControl fullWidth margin="normal">
            <Controller
              name={field}
              control={control}
              defaultValue={false}
              render={({ field: { value, onChange, ...props } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...props}
                    />
                  }
                  label={label}
                />
              )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControl fullWidth margin="normal">
            <Controller
              name={field}
              control={control}
              defaultValue={false}
              render={({ field: { value, onChange, ...props } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!value}
                      onChange={(e) => onChange(e.target.checked)}
                      {...props}
                    />
                  }
                  label={label}
                />
              )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case "textarea":
        return (
          <Controller
            name={field}
            control={control}
            rules={{ required: required ? `${label} est obligatoire` : false }}
            defaultValue=""
            render={({ field: { onChange, value, ...props } }) => (
              <TextField
                fullWidth
                id={field}
                label={label}
                multiline
                rows={4}
                value={value || ""}
                onChange={onChange}
                required={required}
                error={!!errors[field]}
                helperText={errors[field]?.message || helperText}
                margin="normal"
                {...props}
              />
            )}
          />
        );

      case "number":
        return (
          <Controller
            name={field}
            control={control}
            rules={{
              required: required ? `${label} est obligatoire` : false,
              validate: (value) => {
                if (value === "") return true;
                return !isNaN(value) || "Doit être un nombre";
              },
            }}
            defaultValue=""
            render={({ field: { onChange, value, ...props } }) => (
              <TextField
                fullWidth
                id={field}
                label={label}
                type="number"
                value={value ?? ""}
                onChange={onChange}
                required={required}
                error={!!errors[field]}
                helperText={errors[field]?.message || helperText}
                margin="normal"
                {...props}
              />
            )}
          />
        );

      // Default text field
      default:
        return (
          <Controller
            name={field}
            control={control}
            rules={{ required: required ? `${label} est obligatoire` : false }}
            defaultValue=""
            render={({ field: { onChange, value, ...props } }) => (
              <TextField
                fullWidth
                id={field}
                label={label}
                value={value || ""}
                onChange={onChange}
                required={required}
                error={!!errors[field]}
                helperText={errors[field]?.message || helperText}
                margin="normal"
                {...props}
              />
            )}
          />
        );
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h2">
          {title || ""}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Ajouter
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          Erreur: {error}
        </Alert>
      ) : data.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          Aucune donnée trouvée. Cliquez sur "Ajouter" pour créer un nouvel
          élément.
        </Alert>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{ fontWeight: "bold" }}
                      align={column.type === "number" ? "right" : "left"}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedItems.map((item) => (
                  <TableRow hover key={item[idField]}>
                    {visibleColumns.map((column) => (
                      <TableCell
                        key={`${item[idField]}-${column.field}`}
                        align={column.type === "number" ? "right" : "left"}
                      >
                        {column.render
                          ? column.render(item[column.field], item)
                          : truncateText(
                              formatCellValue(column, item[column.field]),
                              column.maxLength
                            )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Tooltip title="Modifier">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEditItem(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteClick(item)}
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
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Lignes par page:"
          />
        </Paper>
      )}

      {/* Form Drawer */}
      <Drawer
        anchor="right"
        open={formOpen}
        onClose={handleCloseForm}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "50%", md: "40%" },
            padding: 3,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5">
            {formMode === "add"
              ? "Ajouter un nouvel élément"
              : "Modifier l'élément"}
          </Typography>
          <IconButton onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmitForm)} noValidate>
          <Grid container spacing={2}>
            {columns
              .filter(
                (column) =>
                  column.editable !== false && column.field !== idField
              )
              .map((column) => (
                <Grid item xs={12} key={column.field}>
                  {renderFormField(column)}
                </Grid>
              ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseForm} sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {formMode === "add" ? "Ajouter" : "Mettre à jour"}
            </Button>
          </Box>
        </Box>
      </Drawer>

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
          <Typography>
            Êtes-vous sûr de vouloir supprimer "{deleteDialog.itemName}" ? Cette
            action ne peut pas être annulée.
          </Typography>
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
