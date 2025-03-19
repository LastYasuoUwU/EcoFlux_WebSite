import { Typography } from "@mui/material";
import CardWithAvatar, {
  CardWithAvatarProps,
} from "./components/CardWithAvatar";
import { cardWithAvatarData } from "./components/CardWithAvatar/data";
import { version } from "../../../package.json";
import ContactFields from "./components/ContactFields.tsx";

export default function AboutUs() {
  return (
    <div className="p-4 flex flex-col items-center gap-8">
      <div className="flex flex-col gap-4 items-center ">
        <Typography variant="h3" color="primary">
          Who we are?
        </Typography>
        <div className="w-2/3 p-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quia
          laborum dignissimos laudantium neque quas, eos dicta maxime, aperiam
          at officia qui quod nam numquam iusto molestiae? Facere, sequi eius.
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8 px-16">
        <div className="flex  gap-16">
          {cardWithAvatarData.map(
            ({ key, src, text, fullName }: CardWithAvatarProps) => (
              <CardWithAvatar
                src={src}
                fullName={fullName}
                text={text}
                key={key}
              />
            )
          )}
        </div>
      </div>
      <ContactFields />
      <div className="self-center">
        &copy;copyright <span className="text-bold">FADWA BOUKACHABA</span> 2025
        - projet version {version}
      </div>
    </div>
  );
}
