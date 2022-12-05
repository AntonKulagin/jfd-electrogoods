import React from "react";
import styles from "./sidebar.module.scss";
import PropTypes from "prop-types";

const Sidebar = ({ onChoose }) => {
    const sidebar = {
        computer: { name: "computer", label: "Компьютеры" },
        laptop: { name: "laptop", label: "Ноутбуки" },
        allgoods: { name: "allgoods", label: "Все товары" }
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
                                className={styles.sidebar__button_comp}
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
    onChoose: PropTypes.func
};

export default Sidebar;
