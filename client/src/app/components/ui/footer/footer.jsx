import React from "react";
import useMockData from "../../../utils/mockData";
import Container from "../../common/container/container";
import styles from "./footer.module.scss";

const Footer = () => {
    const { initialize } = useMockData();

    const handleClick = () => {
        console.log("init");
        initialize();
    };

    return (
        <div className={styles.footer}>
            <Container>
                <div className={styles.footer__body}>
                    <div>Footer</div>
                    <button onClick={handleClick} className={styles.footer__button}>
                        Init FireBase
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
