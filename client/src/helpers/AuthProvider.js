import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) );

    const Login = (user) => {
        // Perform login logic

        console.log("AuthProvider::Login");
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(user);

    };

    const Logout = () => {
        // Perform logout logic
        console.log("AuthProvider::Logout");

        localStorage.removeItem("user");
        setIsLoggedIn(null);
    };

    const authContextValue = {
        isLoggedIn,
        Login,
        Logout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
