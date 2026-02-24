import { Box } from "@mui/material";

export default function UnauthorizedAccess() {
  return (
    <Box mx="auto" maxWidth="900px" display="flex" flexDirection="column" alignItems="center">
      <h2>Oops, something wrong happened :( </h2>
      <h4> Double-check room url or ensure you are invited.</h4>
    </Box>
  );
}
