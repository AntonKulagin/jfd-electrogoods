import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProductsLoading, loadProductsList } from "../store/slices/products";
import { loadCartList } from "../store/slices/cart";
import {
    getCurrenrUserId,
    getIsLoggedIn,
    loadCurrentUser
} from "../store/slices/auth";
import Loader from "../components/common/loader/loader";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const productsStatusLoading = useSelector(getProductsLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserId = useSelector(getCurrenrUserId());

    useEffect(() => {
        dispatch(loadProductsList());
        if (isLoggedIn) {
            dispatch(loadCurrentUser());
            dispatch(loadCartList(currentUserId));
        }
    }, [isLoggedIn]);
    if (productsStatusLoading) return <Loader />;
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
