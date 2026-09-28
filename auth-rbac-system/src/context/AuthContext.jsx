import { createContext, useContext, useState } from "react";

import {
    getToken,
    getUserFromToken,
    saveToken,
    removeToken
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        getToken()
    );

    const [user, setUser] = useState(
        getUserFromToken()
    );


    const login = (newToken) => {

        saveToken(newToken);

        setToken(newToken);

        setUser(
            getUserFromToken()
        );
    };


    const logout = () => {

        removeToken();

        setToken(null);

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}