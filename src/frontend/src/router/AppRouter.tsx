import ProtectedRoute from "@/features/auth/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router";
import { roomRoutes, sessionRoutes } from "./urls";
import UnauthorizedAccess from "@/features/error/UnauthorizedAccess";
import RenderRoutes from "./RenderRoutes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
            <RenderRoutes routes={roomRoutes} />
            <RenderRoutes routes={sessionRoutes} />
        </Route>
        <Route path="/not-authorized" element={<UnauthorizedAccess />} />
      </Routes>
    </BrowserRouter>
  );
}
