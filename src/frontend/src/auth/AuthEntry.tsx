import { Box, Typography } from "@mui/material";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import TerminalLogo from "../components/TerminalLogo";
import AuthToggle from "./AuthToggle";
import "../css/auth.css";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type { Variants } from "framer-motion";
import { useAuthStore } from "./store";
import Login from "./Login";
import Register from "./Register";

const shakeVariants: Variants = {
  idle: {
    x: 0,
  },
  shake: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export default function AuthEntry() {
  const type = useAuthStore((s) => s.type);
  const error = useAuthStore((s) => s.error);

  return (
    <div>
      <FadeIn>
        <ScaleUp>
          <main className="main">
            <motion.div
              animate={error ? "shake" : "idle"}
              variants={shakeVariants}
            >
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

                  {error && <Typography variant="body2" sx={{ color: "#EF5350" }}>
                    {error}
                  </Typography>}

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
            </motion.div>
          </main>
        </ScaleUp>
      </FadeIn>
    </div>
  );
}
