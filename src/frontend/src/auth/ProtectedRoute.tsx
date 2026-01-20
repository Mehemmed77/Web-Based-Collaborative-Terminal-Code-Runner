import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

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
      

      const response = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionStorage.getItem("sessionId")!,
        },
      });

      if (response.status === 200){
        setSessionValidity(true);
        setChecking(false);
      }

      else {
        setSessionValidity(false);
        setSessionValidity(false)
      }
    };

    checkSessionId();
  }, []);

  if(checking) {
    return <p>loading spinner</p>
  }

  return sessionValidity ? <Outlet /> : <Navigate to={"/login"} replace />;
}
