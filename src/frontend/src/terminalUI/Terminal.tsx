import { Box, Paper, Typography } from "@mui/material";
import DynamicInput from "./DynamicInput";

export default function Terminal() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", mx: "auto" }}>
      <Paper
        sx={{
          maxWidth: "700px",
          width: "100%",
          mx: 2,
          height: 300,
          bgcolor: "#300a24",
          color: "#eeeeec",
          borderRadius: 2,
          overflow: "hidden",
          fontFamily: "monospace",
        }}
      >
        <Box
          sx={{
            height: 28,
            bgcolor: "#2c001e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 1,
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 13, textAlign: "center" }}>howtogeek@ubuntu: ~</Typography>
        </Box>
        {/* value="howtogeek@ubuntu:~$" */}
        <Box sx={{ p: 2, fontSize: 15 }}>
          <Box display="flex" alignItems="start">
            <Box height="32px" display={"flex"} alignItems={"center"}>
              <span>csci2400:~$</span>
            </Box>
            <DynamicInput />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
