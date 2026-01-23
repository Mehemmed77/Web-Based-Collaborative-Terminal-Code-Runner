import { useRef } from "react";
import { useNavigate } from "react-router";
import apiFetch from "../utils/apiFetch";
import { BACKEND_SERVER_LINK } from "../utils/constants";

export default function Login() {
  const navigate = useNavigate();
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const username = ref1.current?.value;
    const password = ref2.current?.value;

    const data = {
      username: username,
      password: password,
    };

    const response = await apiFetch(`${BACKEND_SERVER_LINK}auth/login`, "POST", data, true);

    const responseData = await response.json();

    if (responseData.sessionId == null) return;

    sessionStorage.setItem("sessionId", responseData.sessionId);

    navigate("/rooms");
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <input ref={ref1} type="text" placeholder="Enter username" />
      <input ref={ref2} type="password" placeholder="Enter password" />
      <button type="button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
