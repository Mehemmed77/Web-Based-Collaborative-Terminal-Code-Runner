import { useRef } from "react";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";
import type { AuthResponse, RegisterRequest } from "@protocol/http";

export default function Register() {
  const navigate = useNavigate();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const username = ref1.current?.value ?? "";
    const password = ref2.current?.value ?? "";

    const data: RegisterRequest = {
      username: username,
      password: password,
    };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/register`, "POST", data, true);

    const responseData = await response.json() as AuthResponse;

    if (responseData.sessionId == null) return;

    sessionStorage.setItem("sessionId", responseData.sessionId);

    navigate("/rooms");
  };

  return (
    <div>
      <h1>Register</h1>
      <br />
      <input ref={ref1} type="text" placeholder="Enter username" />
      <input ref={ref2} type="password" placeholder="Enter password" />
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
