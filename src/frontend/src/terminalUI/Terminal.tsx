import { Box, Paper, Typography } from "@mui/material";
import DynamicInput from "./DynamicInput";

export default function Terminal() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", mx: "auto" }}>
      <Paper className="terminal-container">
        <Box className="terminal-header">
          <Typography>howtogeek@ubuntu: ~</Typography>
        </Box>
        <Box sx={{ p: 2, fontSize: 15 }}>
          <Box className="re-flex-align-start">
            <Box height="32px" className="re-flex-align-center">
              <span>csci2400:~$</span>
            </Box>
            <DynamicInput />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
