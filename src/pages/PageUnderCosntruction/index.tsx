import { Button, Typography } from "@mui/material";
import underConstruction from "../../assets/under_construction_01.svg";
import { useNavigate } from "react-router";
import { version } from "../../../package.json";

export default function PageUnderConstruction() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[60%]">
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
      <div className="absolute left-[45%] bottom-0">
        &copy;copyright <span className="text-bold">FADWA BOUKACHABA</span> 2025
        - projet version {version}
      </div>
    </div>
  );
}
