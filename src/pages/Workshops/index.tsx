// import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { enqueueSnackbar } from "notistack";
// import { Controller, useForm } from "react-hook-form";
// import { Workshop } from "./components/types";
// import WorkshopTable from "./components/ListWorkshops";

// export default function Workshops() {
//   const [isShow, setIsShow] = useState(true);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       description: "",
//       label: "",
//     },
//   });

//   const toggleForm = () => {
//     setIsShow(!isShow);
//   };

//   const onSubmit = async (data: Workshop) => {
//     try {
//       const { data: insertedData, error } = await supabase
//         .from("workshops")
//         .insert(data)
//         .select();

//       if (error) throw error;

//       if (insertedData?.length > 0) {
//         enqueueSnackbar("Les données ont été enregistrées avec succès", {
//           variant: "success",
//         });

//         // Reset form fields after successful submission
//         reset();
//       }
//     } catch (error) {
//       enqueueSnackbar(`Erreur: ${error.message}`, {
//         variant: "error",
//       });
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Ateliers
//       </Typography>
//       <Button onClick={toggleForm} variant="contained">
//         {isShow ? "Masquer le formulaire" : "Ajouter atelier"}
//       </Button>
//       {isShow && (
//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{ mt: 3 }}
//           noValidate
//         >
//           <div className="flex flex-col gap-4 p-4 border-1 shadow-sm">
//             <Controller
//               name="label"
//               control={control}
//               rules={{ required: "Ce champ est obligatoire!" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   required
//                   fullWidth
//                   id="label"
//                   label="Nom del'atelier"
//                   error={!!errors.label}
//                   helperText={
//                     errors.label?.message || "Ajouter un nom d'atelier"
//                   }
//                 />
//               )}
//             />

//             <Controller
//               name="description"
//               control={control}
//               rules={{ required: "Ce champ est obligatoire!" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   required
//                   fullWidth
//                   id="description"
//                   label="Description"
//                   multiline
//                   rows={4}
//                   error={!!errors.description}
//                   helperText={
//                     errors.description?.message ||
//                     "Ajouter une description de l'atelier"
//                   }
//                 />
//               )}
//             />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Ajouter
//             </Button>
//           </div>
//         </Box>
//       )}
//       <WorkshopTable />
//     </Container>
//   );
// }

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
