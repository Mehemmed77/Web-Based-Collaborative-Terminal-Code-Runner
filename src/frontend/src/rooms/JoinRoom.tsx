import { Divider, Paper, TextField, Typography } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function JoinRoom() {
  return (
    <div>
      <Paper className="paper-container" sx={{ color: "white" }}>
        <div className="re-flex-column-align-center">
          <div className="re-flex-align-justify-center">
            <div className="re-flex-align-justify-center circle">
              <TerminalIcon sx={{ color: "purple" }} />
            </div>
          </div>

          <Typography variant="h5">Join a session</Typography>
          <Typography variant="body1" align="center">
            Enter #roomId or invite link to start your incredible experience with shared terminal
          </Typography>
        </div>

        <hr className="divider" />

        <div>
          <Typography variant="body2">Room ID or Link</Typography>
          <TextField
            fullWidth
            placeholder="e.g. six-seven"
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                color: "#6F7787",
                bgcolor: "#0B0F1A"
              },
            }}
          ></TextField>
        </div>
      </Paper>
    </div>
  );
}
