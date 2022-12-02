import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./header.module.scss";
import cartIcon from "../../../assets/icons/cart.png";
import logoImage from "../../../assets/icons/logo.png";

const Header = () => {
    const [isActive, setActive] = useState(false);

    const cart = [];

    const handleClick = () => {
        setActive((prev) => !prev);
    };

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Container>
                    <div className={isActive ? styles.menuOpen : ""}>
                        <div className={styles.header__body}>
                            <div className={styles.header__logo}>
                                <Link to="/">
                                    <img src={logoImage} alt="logo" />
                                </Link>
                            </div>
                            <div onClick={() => setActive(false)} className={styles.header__menu}>
                                <nav className={styles.menu}>
                                    <ul>
                                        <li>
                                            <Link to="/">Главная</Link>
                                        </li>
                                        <li>
                                            <Link to="/goods">Товары</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div onClick={() => setActive(false)} className={styles.header__items}>
                                <ul className={styles.itemsList}>
                                    <li className={styles.itemsList__cart}>
                                        <Link to="/cart">
                                            <img src={cartIcon} alt="cart" />
                                            <span>{cart.length}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Войти</Link>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={handleClick} className={styles.iconMenu}>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Header;
