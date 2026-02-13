import "../css/auth.css";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { AuthResponse, LoginRequest } from "@protocol/http";
import { Box } from "@mui/material";
import { useAuthStore } from "./store";
import CommonAuth from "./CommonAuth";

export default function Login() {
  const navigate = useNavigate();

  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);

  const handleClick = async () => {
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
    <Box className="input-container" mt={1}>
      <CommonAuth />
    </Box>
  );
}
