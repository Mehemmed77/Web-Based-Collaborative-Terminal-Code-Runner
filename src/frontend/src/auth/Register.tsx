import "../css/auth.css";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { AuthResponse, RegisterRequest } from "@protocol/http";
import Box from "@mui/material/Box";
import CommonAuth from "./CommonAuth";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useAuthStore } from "../store/authStore";
import { authInputStyle } from "./authInputStyle";
import { useCallback } from "react";

export default function Register() {
  const navigate = useNavigate();

  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const fullName = useAuthStore((s) => s.fullName);
  const setFullName = useAuthStore((s) => s.setFullName);
  const setError = useAuthStore((s) => s.setError);
  const setUserId = useAuthStore((s) => s.setUserId);

  const handleClick = useCallback(async () => {
    const data: RegisterRequest = {
      username: username,
      password: password,
      fullName: fullName,
    };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/register`, "POST", data, true);

    const responseData = (await response.json()) as AuthResponse;

    if (responseData.sessionId == null) {
      setError(responseData.message ?? "Some error ocurred, try again.");
      return;
    }

    sessionStorage.setItem("sessionId", responseData.sessionId);
    setUserId(responseData.userId);

    navigate("/rooms");
  }, [username, password, fullName]);

  return (
    <Box className="input-container" mt={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <Box className="re-flex-align-center">
          <FormLabel> full name </FormLabel>
          <TextField
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            variant="filled"
            size="small"
            hiddenLabel
            placeholder="Enter value"
            InputProps={{
              disableUnderline: true,
            }}
            sx={authInputStyle}
          />
        </Box>

        <CommonAuth />
        <button type="submit" className="floating-button"></button>
      </form>
    </Box>
  );
}
