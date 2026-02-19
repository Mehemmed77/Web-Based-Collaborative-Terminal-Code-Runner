import "../css/auth.css";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { AuthResponse, LoginRequest } from "@protocol/http";
import { Box } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import CommonAuth from "./CommonAuth";
import { useCallback } from "react";

export default function Login() {
  const navigate = useNavigate();

  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const setUserId = useAuthStore((s) => s.setUserId);

  const handleClick = useCallback(async () => {
    const data: LoginRequest = {
      username: username,
      password: password,
    };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/login`, "POST", data, true);

    const responseData = (await response.json()) as AuthResponse;

    console.log(responseData);

    if (responseData.sessionId == null) return;

    sessionStorage.setItem("sessionId", responseData.sessionId);
    setUserId(responseData.userId);

    navigate("/rooms");
  }, [username, password]);

  return (
    <Box className="input-container" mt={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <CommonAuth />
        <button type="submit" className="floating-button"></button>
      </form>
    </Box>
  );
}
