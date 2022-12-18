import React from "react";
import Container from "../../common/container/container";
import styles from "./footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.footer__body}>
                    <div>Footer 2022</div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
