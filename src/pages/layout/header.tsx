import { UserButton } from "@clerk/clerk-react";
import { Typography } from "@mui/material";
import { Zap } from "lucide-react";
import "./styles.scss";

export function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-4">
      <div className="flex gap-3 items-center">
        <div>
          <Zap width={30} height={30} />
        </div>
        <div>
          <Typography fontSize={20}>Eco-Flux</Typography>
        </div>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dbhv2ff2q/image/upload/v1745323540/just%20testing/eo6tub43wci8p2aabwcw.svg"
          alt="company logo"
        />
      </div>
      <div>
        <UserButton showName />
      </div>
    </div>
  );
}
