import { Typography } from "@mui/material";
import React from "react";

export type CardWithAvatarProps = {
  key?: string;
  src?: string;
  fullName?: string;
  text?: string;
};

export default function CardWithAvatar({
  src,
  text,
  fullName,
}: CardWithAvatarProps) {
  return (
    <div className="flex  gap-1">
      <p className="border p-4 text-justify rounded-4xl flex gap-4">
        <div className="flex flex-col items-center">
          <img src={src} alt="avatar" className="rounded-full" />
          <Typography variant="subtitle1">{fullName}</Typography>
        </div>
        <Typography variant="body1">{text}</Typography>
      </p>
    </div>
  );
}
