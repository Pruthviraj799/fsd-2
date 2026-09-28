import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function saveRefreshToken(token) {
    localStorage.setItem(REFRESH_KEY, token);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function removeRefreshToken() {
    localStorage.removeItem(REFRESH_KEY);
}

export function getUserFromToken() {

    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
export function refreshAccessToken() {

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    try {

        const user = jwtDecode(refreshToken);

        const newPayload = {
            userId: user.userId,
            username: user.username,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + 3600
        };

        const header = {
            alg: "HS256",
            typ: "JWT"
        };

        const encode = (obj) =>
            btoa(JSON.stringify(obj))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");

        const newToken =
            encode(header) +
            "." +
            encode(newPayload) +
            "." +
            "new-demo-signature";

        saveToken(newToken);

        return newToken;

    } catch (error) {

        console.error(
            "Refresh token failed:",
            error
        );

        return null;
    }
}