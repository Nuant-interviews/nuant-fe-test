import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ItemProps = {
  title: string;
  type?: string[];
  avatartUrl?: string | null;
  onClick?: () => void;
};

const Item = ({ title, avatartUrl, onClick }: ItemProps) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        color: "black",
        borderRadius: 2,
        boxShadow: 2,
        margin: "10px 0",
        ":hover": { transform: "scale(1.01)", boxShadow: 4 },
      }}
      onClick={onClick}
    >
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar
            alt={title}
            src={avatartUrl ?? ""}
            sx={{ height: "60px", width: "60px" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{ textTransform: "capitalize", marginLeft: "4px" }}
            >
              {title}
            </Typography>
          }
        />

        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItem>
    </List>
  );
};
export default Item;
