import { Box, Typography } from "@mui/material";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import TerminalLogo from "../components/TerminalLogo";
import AuthToggle from "./AuthToggle";
import "../css/auth.css";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useAuthStore } from "./store";
import Login from "./Login";
import Register from "./Register";

export default function AuthEntry() {
  const type = useAuthStore((state) => state.type);

  return (
    <div>
      <FadeIn>
        <ScaleUp>
          <main className="main">
            <Box className="container re-flex-direction-column" gap={3}>
              <Box className="re-flex-align-center" gap={3}>
                <TerminalLogo />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Shared Terminal
                  </Typography>
                  <Typography variant="body1">multi-user realtime shell</Typography>
                </Box>
              </Box>

              <Box className="re-flex-align-center-justify-between">
                <Typography variant="body2">{`auth.${type.toLowerCase()}.sh`}</Typography>
                <AuthToggle />
              </Box>

              <Box className="auth-input-container">
                <Box display="flex" gap={1} mb={1}>
                  <Typography variant="body2"> ~/sessions </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    $
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4C8DFF" }}>
                    auth {type.toLowerCase()}
                  </Typography>
                </Box>

                <Typography variant="body2">
                  # we keep authentication minimal - no dashboards, just simple terminal
                </Typography>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {type === "LOGIN" ? <Login /> : <Register />}
                  </motion.div>
                </AnimatePresence>
              </Box>

              <Typography variant="body2">press Enter ↵ to continue</Typography>
            </Box>
          </main>
        </ScaleUp>
      </FadeIn>
    </div>
  );
}
