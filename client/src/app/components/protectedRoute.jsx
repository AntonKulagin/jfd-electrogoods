import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getIsLoggedIn } from "../store/slices/auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    if (!isLoggedIn) return <Navigate to="/login" />;
    return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
