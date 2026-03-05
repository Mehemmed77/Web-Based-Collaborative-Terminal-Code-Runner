import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/global.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppRouter from "./router/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
);
