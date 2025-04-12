import { useState } from "react";
import { Container, Typography } from "@mui/material";
import GenericDataTable from "../../components/CustomTable";

export default function WorkshopsManagement() {
  const [workshopData, setWorkshopData] = useState([]);

  // Column definitions for Workshops table
  const workshopColumns = [
    {
      field: "created_at",
      label: "Date de création",
      type: "datetime",
      editable: false,
    },
    {
      field: "label",
      label: "Label",
      type: "text",
      required: true,
      isTitle: true,
      helperText: "Nom de l'atelier",
    },
    {
      field: "description",
      label: "Description",
      type: "textarea",
      required: true,
      maxLength: 100,
      helperText: "Description détaillée de l'atelier",
    },
    {
      field: "isActive",
      label: "Actif",
      type: "boolean",
      helperText: "Indique si l'atelier est disponible",
    },
  ];

  // Handle data change from table component
  const handleDataChange = (data) => {
    setWorkshopData(data);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 3 }}>
        Gestion des Ateliers
      </Typography>

      <GenericDataTable
        tableName="workshops"
        columns={workshopColumns}
        orderBy="created_at"
        orderAscending={false}
        onDataChange={() => handleDataChange}
      />
    </Container>
  );
}
