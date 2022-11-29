import React from "react";
import { useSelector } from "react-redux";
import { getAllComputers } from "../../../store/slices/computers";
import Container from "../../common/container/container";
import styles from "./footer.module.scss";

const Footer = () => {
    const computers = useSelector(getAllComputers());
    console.log(computers);
    return (
        <div className={styles.footer}>
            <Container>Footer</Container>
        </div>
    );
};

export default Footer;
