import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const response = await axios.post("http://localhost:8800/api/auth/login", inputs
            , { withCredentials: true }////with this code cookies will be set in browser application->storage->cookies
        );

        setCurrentUser(response.data);
    }

    const logout = async (inputs) => {
        const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        await axios.post("http://localhost:8800/api/auth/logout"
            , { cookieValue }, { withCredentials: true }
        );
        
        deleteCookie('access_token');
        setCurrentUser(null);
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}