import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComputersLoading, loadComputers } from "../../store/slices/computers";

const AppLoader = ({ children }) => {
    //   const userId = useSelector(getAuthUserId());
    const dispatch = useDispatch();
    const computersLoading = useSelector(getComputersLoading());
    //  useEffect(() => {
    //      if (userId) {
    //          dispatch(loadFavourites(userId));
    //      }
    //  }, [userId]);
    useEffect(() => {
        dispatch(loadComputers());
    }, []);

    if (!computersLoading) {
        return children;
    }
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppLoader;
