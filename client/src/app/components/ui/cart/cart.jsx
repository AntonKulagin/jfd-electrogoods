import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cahangeAmountProduct,
    getCart
    //  getCartLoading
    //  loadCartList
} from "../../../store/slices/cart";
import Container from "../../common/container/container";
import styles from "./cart.module.scss";
import { getProductsList } from "../../../store/slices/products";
import ProductCardCart from "../productCardCart";
import Button from "../../common/Button";
import Modal from "../../common/modal/modal";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(getCart());
    const [modalActive, setModalActive] = useState(false);

    const productsCartList = useSelector(getProductsList(cart));

    const allPrice = productsCartList.reduce(
        (acc, product) => acc + product.price * amountProducts(product._id),
        0
    );

    const handleModal = () => {
        setModalActive((prev) => !prev);
    };

    function amountProducts(prodId) {
        const product = cart.find((item) => item.productId === prodId);
        return product.amount;
    }

    const handleChange = (productId, amount) => {
        dispatch(cahangeAmountProduct({ productId, amount }));
    };

    return (
        <div className={styles.cart}>
            <Container>
                {cart.length ? (
                    <div className={styles.cart__body}>
                        <div className={styles.cart__content}>
                            {productsCartList.map((prod) => (
                                <ProductCardCart
                                    product={prod}
                                    amount={amountProducts(prod._id)}
                                    onChange={handleChange}
                                    key={prod.cartId}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.cart__empty}>Ваша карзина пуста</div>
                )}
                <div className={styles.cart__order}>
                    <div className={styles.cart__sum}>
                        Общая сумма заказа: <span>{allPrice} руб.</span>
                    </div>
                    <div className={styles.cart__buttonOrder}>
                        <Button onClick={handleModal}>Заказать</Button>
                    </div>
                </div>
                <Modal active={modalActive} onModal={handleModal}>
                    <div className={styles.cart__modal_sory}>Извините!!!</div>
                    <div className={styles.cart__modal_text}>
                        Заказы временно не принимаем.
                    </div>
                </Modal>
            </Container>
        </div>
    );
};

export default Cart;
