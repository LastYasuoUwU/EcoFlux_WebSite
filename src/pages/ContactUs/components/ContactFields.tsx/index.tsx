import { Button, TextField, Typography } from "@mui/material";
import { LucideSend } from "lucide-react";
import { enqueueSnackbar, VariantType } from "notistack";

export default function ContactFields() {
  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Votre message a été envoyé avec succès!", { variant });
  };

  return (
    <div className="flex flex-col items-center gap-6 border-2 rounded-4xl w-1/3 p-8">
      <Typography variant="h5"> Contactez nous</Typography>
      <TextField
        variant="outlined"
        label="Nom complet"
        id="outlined-basic"
        className="w-full"
      />
      <TextField
        variant="outlined"
        label="email"
        id="outlined-basic"
        className="w-full"
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        maxRows={1}
        className="w-full"
      />
      <Button
        startIcon={<LucideSend />}
        variant="contained"
        className="w-full"
        onClick={handleClickVariant("success")}
      >
        Envoyer
      </Button>
    </div>
  );
}
