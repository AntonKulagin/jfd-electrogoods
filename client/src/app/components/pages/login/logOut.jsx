import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/auth";
import Loader from "../../common/loader/loader";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, []);
    return <Loader />;
};

export default LogOut;
