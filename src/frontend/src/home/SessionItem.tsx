import Box from "@mui/material/Box";
import img from "../images/comp-networks.png";
import { Typography } from "@mui/material";

interface SessionItemInterface {
  title: string;
}

export default function SessionItem({ title }: SessionItemInterface) {
  return (
    <Box
      className="session-paper re-flex-direction-column"
      gap={1}
      position="relative"
      alignItems="center"
    >
      <Box>
        <img src={img} width={200} height={200} />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="body2">4 items</Typography>
        <Box>{/* <CustomSpeedDial /> */}</Box>
      </Box>
    </Box>
  );
}
