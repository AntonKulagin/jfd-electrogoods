import React from "react";
import PropTypes from "prop-types";
import styles from "./wrapper.module.scss";

const Wrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};
Wrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Wrapper;
