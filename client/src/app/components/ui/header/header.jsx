import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./header.module.scss";
import cartIcon from "../../../assets/icons/cart.png";
import logoImage from "../../../assets/icons/logo.png";
import logoutIcon from "../../../assets/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../store/slices/cart";
import {
    getCurrentUserData,
    getIsLoading,
    getIsLoggedIn,
    logout
} from "../../../store/slices/auth";

const Header = () => {
    const [isActive, setActive] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserData());
    const currentUserLoading = useSelector(getIsLoading());

    const cart = useSelector(getCart());
    const loggedIn = useSelector(getIsLoggedIn());

    const handleBurger = () => {
        setActive((prev) => !prev);
    };

    const handleButton = () => {
        if (!loggedIn) navigate("/login", { replace: true });
        else dispatch(logout(navigate));
    };

    return (
        <div className={isActive ? styles.menuOpen : ""}>
            <div className={styles.header}>
                {/* <div className={styles.header__wrapper}> */}
                <Container>
                    <div className={styles.header__body}>
                        <div className={styles.header__logo}>
                            <Link to="/">
                                <img src={logoImage} alt="logo" />
                            </Link>
                        </div>
                        <div
                            onClick={() => setActive(false)}
                            className={styles.header__menu}
                        >
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

                        <div
                            onClick={() => setActive(false)}
                            className={styles.header__items}
                        >
                            <ul className={styles.itemsList}>
                                {!currentUserLoading && loggedIn && (
                                    <li className={styles.itemsList__userIcon}>
                                        <Link to="/user">
                                            <img
                                                src={currentUser.image}
                                                alt="userIcon"
                                            />
                                        </Link>
                                    </li>
                                )}
                                <li className={styles.itemsList__cart}>
                                    <Link to="/cart">
                                        <img src={cartIcon} alt="cart" />
                                        <span>{cart.length}</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className={styles.itemsList__login}
                                        onClick={handleButton}
                                    >
                                        {!loggedIn ? (
                                            "Войти"
                                        ) : (
                                            <img
                                                src={logoutIcon}
                                                alt="logout"
                                            />
                                        )}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={handleBurger}
                            className={styles.iconMenu}
                        >
                            <span></span>
                        </button>
                    </div>
                </Container>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Header;
