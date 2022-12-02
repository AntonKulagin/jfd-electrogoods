import React from "react";
import Container from "../../common/container/container";
import styles from "./cart.module.scss";

const Cart = () => {
    return (
        <div className={styles.cart}>
            <Container>
                <div className={styles.cart__body}>Cart</div>
            </Container>
        </div>
    );
};

export default Cart;
