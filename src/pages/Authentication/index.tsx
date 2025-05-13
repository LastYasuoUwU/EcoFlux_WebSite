import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import background from "../../assets/background.png";
import { SignIn } from "@clerk/clerk-react";

export default function AuthenticationPage() {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})`, backgroundSize:'cover' }}
    >
      <div className=" p-10 w-full max-w-md border rounded-2xl bg-white/80 backdrop-blur-md">
        <Box className="flex flex-col items-center gap-6">
          <img
            src="https://res.cloudinary.com/dbhv2ff2q/image/upload/v1745323540/just%20testing/eo6tub43wci8p2aabwcw.svg"
            alt="Logo"
            className="w-28 h-28"
          />

          <SignIn fallbackRedirectUrl={"/dashboard"} />

          <Typography variant="body2" color="textSecondary" className="mt-4">
            Fait par Fadwa BOUKACHABA
          </Typography>
        </Box>
      </div>
    </div>
  );
}
