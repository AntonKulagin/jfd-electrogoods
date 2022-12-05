import React from "react";
import { Link } from "react-router-dom";
import Container from "../../../common/container/container";
import SignUpForm from "../../../ui/forms/login/SignUpForm/SignUpForm";
// import Logo from "../../../common/Logo";
// import SignUpForm from "../../../ui/forms/login/SignUpForm";
import styles from "../styles/login.module.scss";

const SignUpPage = () => {
    return (
        <Container>
            <div className={styles.login__content}>
                <div className={styles.login__left}>
                    <div className={styles.left}>
                        <div className={styles.left__logo}>
                            {/* <Logo /> */}
                        </div>
                        <div className={styles.left__title}>
                            Рады приветствовать вас в нашем магазине!
                        </div>
                        <div className={styles.left__text}>
                            Только лучшее качество и лучшие бренды
                        </div>
                        <div className={styles.left__card}>
                            «Необходим новый тип мышления, если человечество
                            хочет выжить и продвигаться в развитии» — Альберт
                            Энштейн.
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.right__title}>Создание аккаунта</div>
                    <p className={styles.right__pretitle}>
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </p>
                    <SignUpForm />
                </div>
            </div>
        </Container>
    );
};

export default SignUpPage;
