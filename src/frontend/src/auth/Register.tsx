import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        const username = ref1.current?.value;
        const password = ref2.current?.value;

        const data = {
            username: username,
            password: password
        }

        const request = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const response = await request.json();

        if (response.sessionId == null) return;

        sessionStorage.setItem("sessionId", response.sessionId);

        navigate("/rooms");
    }

    return (
        <div>
            <h1>Register</h1>
            <br />
            <input ref={ref1} type="text" placeholder="Enter username" />
            <input ref={ref2} type="password" placeholder="Enter password" />
            <button type="button" onClick={handleClick}>Submit</button>
        </div>
    )
}