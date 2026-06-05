import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        if (storeUser) {
            setUser(JSON.parse(storeUser));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
    };
    const API = "http://localhost:8080/api/user";
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;