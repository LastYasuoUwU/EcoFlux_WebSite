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
            Page is under construction
          </Typography>
          <Button variant="contained" color="error" onClick={onClickHandler}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Footer that sticks to the bottom
      <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>Made by FADWA BOUKACHABA</p>
        </div>
      </footer> */}
    </div>
  );
}
