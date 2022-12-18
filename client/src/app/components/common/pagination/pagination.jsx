import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import styles from "./pagination.module.scss";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const getClassItem = (page) => {
        if (page === currentPage) return styles.pagination__item_active;
        else return styles.pagination__item;
    };
    return (
        <nav>
            <ul className={styles.pagination}>
                {pages.map((page) => (
                    <li
                        className={getClassItem(page)}
                        key={"page_" + page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
