// src/components/CheckIsAuthenticated.js
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const CheckIsAuthenticated = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // Redirect to home only if the user is authenticated and is on login/signup pages
        if (isAuthenticated) {
            navigate("/home");
        }else if(location.pathname === "/login"){
            navigate("/login");
        }else if( location.pathname === "/signup"){
            navigate("/signup");
        }

    }, [isAuthenticated, navigate]);

    return children;
};

export default CheckIsAuthenticated;
