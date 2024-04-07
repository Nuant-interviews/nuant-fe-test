import { Typography } from "@mui/material";

type InfoSectionProps = {
  info: string[][];
};

const InfoSection = ({ info }: InfoSectionProps) => {
  return (
    <div>
      {info.map((item) => (
        <Typography
          key={item[0]}
          sx={{ textAlign: "left", textTransform: "capitalize" }}
        >
          <span>{item[0]}: </span>
          <span>{item[1]}</span>
        </Typography>
      ))}
    </div>
  );
};

export default InfoSection;
