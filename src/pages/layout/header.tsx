import { Avatar, Typography } from "@mui/material";
import { Zap } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

export function Header() {
  const [isHidden, setIsHiiden] = React.useState(true);
  const naviate = useNavigate();

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
        <button
          className="flex gap-4 items-center cursor-pointer border rounded-lg p-2"
          type="button"
          onClick={() => setIsHiiden(!isHidden)}
        >
          <Avatar
            src="https://res.cloudinary.com/dbhv2ff2q/image/upload/v1744421989/just%20testing/gr2wpdpbbo7wmhx9cfuy.jpg"
            alt="avatar"
            className="rounded-full border"
          />
          Fadwa BOUKACHABA
        </button>
        {!isHidden && (
          <div className="absolute w-[12.75%] border pl-4 py-1 mt-2 rounded-lg">
            <button
              type="button"
              className="cursor-pointer w-full"
              onClick={() => naviate("/")}
            >
              se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
