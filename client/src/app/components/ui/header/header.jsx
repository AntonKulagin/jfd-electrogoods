import React from "react";
import { Link } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./header.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header__body}>
                    <div className={styles.header__logo}>Logo</div>
                    <div className={styles.header__menu}>
                        <Link to="/">Главная</Link>
                        <Link to="/goods">Товары</Link>
                    </div>
                    <div className={styles.header__items}>
                        <Link to="/login">Войти</Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
