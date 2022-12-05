import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/slices/auth";
import Container from "../../common/container/container";
import styles from "./userPage.module.scss";

const UsePage = () => {
    const currentUser = useSelector(getCurrentUserData());

    if (currentUser) {
        return (
            <div className={styles.user}>
                <Container>
                    <div className={styles.user__body}>
                        <div className={styles.user__image}>
                            <img src={currentUser.image} alt="" />
                        </div>
                        <div className={styles.user__content}>
                            <div className={styles.user__name}>
                                {currentUser.name}
                            </div>
                            <div className={styles.user__email}>
                                {currentUser.email}
                            </div>
                        </div>
                        <button className={styles.user__edit}>*</button>
                    </div>
                </Container>
            </div>
        );
    } else return "Loading";
};

export default UsePage;
