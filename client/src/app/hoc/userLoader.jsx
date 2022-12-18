import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentUserData,
    getDataStatus,
    loadAllUsers
} from "../store/slices/auth";
import PropTypes from "prop-types";
import Loader from "../components/common/loader/loader";

const UserLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());

    useEffect(() => {
        if (currentUser?.isAdmin) dispatch(loadAllUsers());
    }, [dataStatus]);
    if (!dataStatus) return <Loader />;
    return children;
};
UserLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserLoader;
