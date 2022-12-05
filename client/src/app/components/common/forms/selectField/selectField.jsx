import React, { useState } from "react";
import styles from "./swlwctField.module.scss";
import PropTypes from "prop-types";

const SelectField = ({ sortList, onSort, name, value, onSortOrder }) => {
    const [sortOrder, setSortOrder] = useState(false);

    const handleChange = (event) => {
        onSort(event.target.value);
    };

    const handleSortOrder = () => {
        setSortOrder((prev) => !prev);
        onSortOrder(sortOrder);
    };

    return (
        <div className={styles.select}>
            <select
                className={styles.select__content}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option value="">-- Сортировать по ... --</option>
                {Object.keys(sortList).map((item) => (
                    <option value={sortList[item].name} key={item}>
                        {sortList[item].label}
                    </option>
                ))}
            </select>
            <button
                onClick={() => handleSortOrder()}
                className={
                    !sortOrder
                        ? styles.select__sortOrder_top
                        : styles.select__sortOrder_bottom
                }
            ></button>
        </div>
    );
};
SelectField.propTypes = {
    sortList: PropTypes.object,
    onSort: PropTypes.func,
    onSortOrder: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
};

export default SelectField;
