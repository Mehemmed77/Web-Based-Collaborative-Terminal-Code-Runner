import {
  Box,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ReDivider from "../components/ReDivider";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import TypingText from "../animations/TypingText";

export default function JoinRoom() {
  return (
    <FadeIn>
      <main className="re-flex-column-align-center main">
        <ScaleUp>
          <Box className="container re-flex-direction-column" mt={4} gap={5}>
            <div className="re-flex-column-align-center">
              <div className="re-flex-align-justify-center">
                <div className="re-flex-align-justify-center circle">
                  <TerminalIcon sx={{ color: "#1976d2" }} />
                </div>
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
                ></TextField>

                <Button variant="outlined" fullWidth sx={{ mt: 1.5 }}>
                  Join Room <KeyboardDoubleArrowRightRoundedIcon />{" "}
                </Button>
              </Box>

              <Typography variant="body1" align="center">
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
