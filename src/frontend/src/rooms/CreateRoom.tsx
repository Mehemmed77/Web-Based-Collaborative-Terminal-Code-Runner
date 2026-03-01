import { BACKEND_SERVER_LINK } from "../utils/constants";
import apiFetch from "../utils/apiFetch";
import { useAuthStore } from "../store/authStore";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReDivider from "../components/ReDivider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/createRoom.css";
import { useRef } from "react";
import TypingText from "../animations/TypingText";

const inputStyles = {
  mt: 1,
  "& .MuiInputBase-input": {
    color: "#C9D1D9",
    bgcolor: "#0B0F1A",
  },
  "& .MuiOutlinedInput-root": {
    bgcolor: "#0B0F1A",
    borderRadius: "8px",
  },
};

export default function CreateRoom() {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const userId = useAuthStore((s) => s.userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userId);
    const data = { userId: userId, roomName: roomNameRef.current?.value };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}rooms/createRoom/`, "POST", data);

    const json = await response.json();

    console.log(json);
  };

  return (
    <FadeIn>
      <main className="re-flex-column-align-center main">
        <ScaleUp>
          <form onSubmit={handleSubmit}>
            <Box className="container re-flex-direction-column" mt={4} gap={4}>
              {/* Header */}
              <div className="re-flex-align-center-justify-between">
                <div>
                  <Typography variant="h5">Spin up a fresh room</Typography>
                  <TypingText text="Rooms are ephemeral terminals. Share the link, everyone lands in the same shell." color="#9AA3B2" />
                </div>
              </div>

              <ReDivider />

              {/* Room name + Timeout */}
              <div className="re-flex-align-center-justify-between section">
                <div className="field">
                  <Typography variant="body2">Room name</Typography>
                  <TextField
                    inputRef={roomNameRef}
                    fullWidth
                    placeholder="e.g. deploy-dry-run"
                    variant="outlined"
                    sx={inputStyles}
                  />
                </div>

                <div className="field small-field">
                  <Typography variant="body2">Idle timeout</Typography>
                  <TextField fullWidth placeholder="45 min" variant="outlined" sx={inputStyles} />
                </div>
              </div>

              <div className="re-flex-align-center-justify-between section">

                <div className="field small-field">
                  <Typography variant="body2">Seats</Typography>
                  <TextField fullWidth placeholder="Up to 6 people" variant="outlined" sx={inputStyles} />
                </div>
              </div>

              <Button variant="contained" fullWidth>
                + Create room & copy link
              </Button>

              <Typography variant="caption" align="center" sx={{ color: "#6F7787" }}>
                Or skip the UI: type <b>room new deploy-dry-run</b> in any shared terminal.
              </Typography>

              <button type="submit" className="floating-button"></button>
            </Box>
          </form>
        </ScaleUp>
      </main>
    </FadeIn>
  );
}
