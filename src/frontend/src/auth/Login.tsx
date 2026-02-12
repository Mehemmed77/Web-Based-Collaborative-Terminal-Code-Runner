import { useRef } from "react";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { AuthResponse, LoginRequest } from "@protocol/http";
import { Box, FormLabel, TextField, Typography, useTheme } from "@mui/material";
import FadeIn from "../animations/FadeIn";
import ScaleUp from "../animations/ScaleUp";
import TerminalLogo from "../components/TerminalLogo";
import AuthToggle from "../components/AuthToggle";
import "../css/auth.css";
import TransperantInput from "../components/TransperantInput";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const username = ref1.current?.value ?? "";
    const password = ref2.current?.value ?? "";

    const data: LoginRequest = {
      username: username,
      password: password,
    };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/login`, "POST", data, true);

    const responseData = (await response.json()) as AuthResponse;

    if (responseData.sessionId == null) return;

    sessionStorage.setItem("sessionId", responseData.sessionId);

    navigate("/rooms");
  };

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
                <Typography variant="body2">auth.sh</Typography>
                <AuthToggle />
              </Box>

              <Box className="auth-input-container">
                <Box display="flex" gap={1} mb={1}>
                  <Typography variant="body2"> ~/sessions </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    $
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4C8DFF" }}>
                    auth login
                  </Typography>
                </Box>

                <Typography variant="body2">
                  # we keep authentication minimal - no dashboards, just simple terminal
                </Typography>

                <Box className="input-container" mt={1}>
                  <TransperantInput label="username" />
                  <TransperantInput label="password" isPassword={true} />
                </Box>
              </Box>

              <Typography variant="body2">press Enter ↵ to continue</Typography>
            </Box>
          </main>
        </ScaleUp>
      </FadeIn>
    </div>
  );
}
