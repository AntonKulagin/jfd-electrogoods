import React from "react";
import { Link } from "react-router-dom";
import Container from "../../../common/container/container";
import SignInForm from "../../../ui/forms/login/SignInForm/SignInForm";
// import Logo from "../../../common/Logo";
// import SignInForm from "../../../ui/forms/login/SignInForm";
import styles from "../styles/login.module.scss";

const SignInPage = () => {
    return (
        <Container>
            <div className={styles.login__content}>
                <div className={styles.login__left}>
                    <div className={styles.left}>
                        <div className={styles.left__logo}>
                            {/* <Logo /> */}
                        </div>
                        <div className={styles.left__title}>
                            Заходите в ваш любимый магазин!
                        </div>
                        <div className={styles.left__text}>Оцените новинки</div>
                        <div className={styles.left__card}>
                            «Цели никогда не должны быть простыми. Они должны
                            быть неудобными, чтобы заставить вас работать» —
                            Майкл Фелпс
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.right__title}>Вход</div>
                    <p className={styles.right__pretitle}>
                        Еще нет аккаунта?{" "}
                        <Link to="/login/signup">Создать аккаунт</Link>
                    </p>
                    <SignInForm />
                </div>
            </div>
        </Container>
    );
};

export default SignInPage;
