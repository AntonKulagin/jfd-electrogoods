import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getIsAdmin } from "../../store/slices/auth";

const ProtectedAdminRoute = ({ children }) => {
    const isAdmin = useSelector(getIsAdmin());

    if (!isAdmin) return <Navigate to="/login" />;
    return children;
};
ProtectedAdminRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedAdminRoute;
