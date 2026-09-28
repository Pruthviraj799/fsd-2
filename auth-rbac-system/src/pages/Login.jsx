import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { saveRefreshToken } from "../utils/auth";
function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        const role =
            username.toLowerCase() === "admin"
                ? "admin"
                : username.toLowerCase() === "editor"
                    ? "editor"
                    : "viewer";


        const payload = {
            userId: Date.now(),
            username: username,
            role: role,
            exp: Math.floor(
                Date.now() / 1000
            ) + 3600
        };


        const token = createFakeJWT(payload);

        const refreshToken = createFakeJWT({
            userId: payload.userId,
            username: payload.username,
            role: payload.role,
            type: "refresh"
        });

saveRefreshToken(refreshToken);

login(token);

        navigate("/dashboard");
    };


    return (

        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Try username:
                <b> admin </b>,
                <b> editor </b>,
                or
                <b> viewer </b>
            </p>

        </div>
    );
}


function createFakeJWT(payload) {

    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const encode = (obj) =>
        btoa(
            JSON.stringify(obj)
        )
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");


    return (
        encode(header) +
        "." +
        encode(payload) +
        "." +
        "demo-signature"
    );
}


export default Login;