// src/components/PrivateRoute.js
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null; // Render children only if authenticated
};

export default PrivateRoute;
