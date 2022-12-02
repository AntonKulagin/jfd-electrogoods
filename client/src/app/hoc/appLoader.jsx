import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProductsLoading, loadProductsList } from "../store/slices/products";
import { loadCartList } from "../store/slices/cart";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const productsStatusLoading = useSelector(getProductsLoading());

    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCartList());
    }, []);
    if (productsStatusLoading) return "Loading...";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AppLoader;
