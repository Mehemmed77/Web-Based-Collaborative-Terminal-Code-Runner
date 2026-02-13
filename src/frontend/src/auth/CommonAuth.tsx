import "../css/auth.css";
import { Box, FormLabel, TextField } from "@mui/material";
import { authInputStyle } from "./authInputStyle";
import { useAuthStore } from "./store";

export default function CommonAuth() {
  const username = useAuthStore((s) => s.username);
  const setUsername = useAuthStore((s) => s.setUsername);
  const password = useAuthStore((s) => s.password);
  const setPassword = useAuthStore((s) => s.setPassword);
  
  return (
    <Box className="input-container">
      <Box className="re-flex-align-center">
        <FormLabel> username </FormLabel>
        <TextField
          onChange={e => setUsername(e.target.value)}
          value={username}
          type={"text"}
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

      <Box className="re-flex-align-center">
        <FormLabel> password </FormLabel>
        <TextField
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
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
    </Box>
  );
}
