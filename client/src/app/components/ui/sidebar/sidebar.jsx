import React from "react";
import styles from "./sidebar.module.scss";
import PropTypes from "prop-types";

const Sidebar = ({ onChoose, active }) => {
    const sidebar = {
        computer: { name: "computer", label: "Компьютеры" },
        laptop: { name: "laptop", label: "Ноутбуки" },
        fridge: { name: "fridge", label: "Холодильники" },
        vacuum: { name: "vacuum", label: "Пылесосы" },
        allgoods: { name: "allgoods", label: "Все товары" }
    };

    const getClassButton = (name) => {
        if (name === active) {
            return styles.sidebar__button_active;
        }
        return styles.sidebar__button;
    };

    return (
        <div className={styles.sidebar}>
            <nav className={styles.sidebar__body}>
                <ul className={styles.sidebar__list}>
                    {Object.keys(sidebar).map((item) => (
                        <li className={styles.sidebar__item} key={item}>
                            <button
                                name={sidebar[item].name}
                                onClick={(e) => onChoose(e)}
                                className={getClassButton(sidebar[item].name)}
                            >
                                {sidebar[item].label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
Sidebar.propTypes = {
    onChoose: PropTypes.func,
    active: PropTypes.string
};

export default Sidebar;
