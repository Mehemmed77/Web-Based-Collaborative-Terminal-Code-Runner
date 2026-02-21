import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";

export default function ProtectedRoute() {
  const [sessionValidity, setSessionValidity] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkSessionId = async () => {
      const sessionId = sessionStorage.getItem("sessionId");

      if (sessionId === null) {
        setSessionValidity(false);
        setChecking(false);
        return;
      }

      const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/me`, "GET");

      if (response.status === 200) {
        const data = await response.json();

        setSessionValidity(true);
        setChecking(false);
      } else {
        setSessionValidity(false);
        setSessionValidity(false);
      }
    };

    checkSessionId();
  }, []);

  if (checking) {
    return <p>loading spinner</p>;
  }

  return sessionValidity ? <Outlet /> : <Navigate to={"/auth"} replace />;
}
