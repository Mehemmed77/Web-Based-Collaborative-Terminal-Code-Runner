import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateRoom from "./rooms/CreateRoom";
import GlobalContextProvider from "./context/ContextProvider";
import Room from "./rooms/Room";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/rooms/createRoom" element={<CreateRoom />} />
              <Route path="/rooms/:roomId" element={<Room />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContextProvider>
  </StrictMode>,
);
