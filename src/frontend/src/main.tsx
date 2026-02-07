import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./main.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateRoom from "./rooms/CreateRoom";
import GlobalContextProvider from "./context/ContextProvider";
import Room from "./rooms/Room";
import JoinRoom from "./rooms/JoinRoom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/rooms/createRoom" element={<CreateRoom />} />
              <Route path="/rooms/:roomId" element={<Room />} />
              <Route path="/rooms/joinRoom" element={<JoinRoom />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
