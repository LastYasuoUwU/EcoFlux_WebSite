import { Button, Typography } from "@mui/material";
import underConstruction from "../../assets/under_construction_01.svg";
import { useNavigate } from "react-router";

export default function PageUnderConstruction() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-3/5">
          <img src={underConstruction} alt="under_construction" />
        </div>
        <div className="flex flex-col gap-4">
          <Typography variant="h4" color="error">
            Page est en cours de construction
          </Typography>
          <Button variant="contained" color="error" onClick={onClickHandler}>
            Retour au tableau du board
          </Button>
        </div>
      </div>
    </div>
  );
}
