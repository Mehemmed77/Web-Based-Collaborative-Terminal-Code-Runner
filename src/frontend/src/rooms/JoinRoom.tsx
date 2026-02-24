import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReDivider from "../components/ReDivider";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import TypingText from "../animations/TypingText";
import TerminalLogo from "../components/TerminalLogo";
import "../css/joinRoom.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function JoinRoom() {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <FadeIn>
      <main className="re-flex-column-align-center main">
        <ScaleUp>
          <Box className="container re-flex-direction-column" mt={4} gap={5}>
            <div className="re-flex-column-align-center">
              <div className="re-flex-align-justify-center">
                <TerminalLogo />
              </div>

              <Typography variant="h5">Join a session</Typography>
              <Typography variant="body1" align="center">
                <TypingText
                  text="Enter #roomId or invite link to start your incredible experience with shared terminal"/>
              </Typography>
            </div>

            <ReDivider />

            <div>
              <Box mb={2}>
                <Typography variant="body2">Room ID / URL</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. six-seven"
                  variant="outlined"
                  sx={{
                    mt: 1,
                    "& .MuiInputBase-input": {
                      color: "#6F7787",
                      bgcolor: "#0B0F1A",
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          {!clicked ? <SearchIcon sx={{ color: "#9AA3B2" }}  /> : <CircularProgress color="inherit" />}
                        </InputAdornment>
                      )
                    }
                  }}
                ></TextField>

                <Button onClick={() => setClicked(true)} variant="outlined" fullWidth sx={{ mt: 1.5 }}>
                  Join Room <KeyboardDoubleArrowRightRoundedIcon />{" "}
                </Button>
              </Box>

              <Typography variant="body1" align="center" sx={{ mb: 1.5 }}>
                Or
              </Typography>

              <Button variant="text" fullWidth>
                {" "}
                <AddRoundedIcon /> Create New Room{" "}
              </Button>
            </div>
          </Box>
        </ScaleUp>

        <Accordion sx={{ bgcolor: "transparent !important" }}>
          <AccordionSummary
            expandIcon={<KeyboardDoubleArrowDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">See your recent sessions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </main>
    </FadeIn>
  );
}
