import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./main.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateRoom from "./rooms/CreateRoom";
import Room from "./rooms/Room";
import JoinRoom from "./rooms/JoinRoom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import AuthEntry from "./auth/AuthEntry";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthEntry />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/rooms/createRoom" element={<CreateRoom />} />
              <Route path="/rooms/:roomId" element={<Room />} />
              <Route path="/rooms/joinRoom" element={<JoinRoom />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
