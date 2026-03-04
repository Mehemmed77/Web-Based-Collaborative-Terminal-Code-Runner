import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface SessionItemInterface {
  title: string;
  picUrl: string;
}

export default function SessionItem({ title, picUrl }: SessionItemInterface) {
  return (
    <Box
      className="session-paper re-flex-direction-column"
      gap={1}
      position="relative"
      alignItems="center"
    >
      <Box>
        <img src={`/src/images/${picUrl}`} width={200} />
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="body2">4 items</Typography>
      </Box>
    </Box>
  );
}
