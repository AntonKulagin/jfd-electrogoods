import React from "react";
import styles from "./productCardCart.module.scss";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../store/slices/cart";

const ProductCardCart = ({ product }) => {
    const dispatch = useDispatch();

    const handleClick = (cartId) => {
        dispatch(removeProduct(cartId));
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__body}>
                <div className={styles.card__left}>
                    <div className={styles.card__image}>
                        <img src={product.image} alt="image" />
                    </div>
                </div>
                <div className={styles.card__right}>
                    <div className={styles.card__text}>
                        <div className={styles.card__text_title}>
                            {product.name}
                        </div>
                        <div className={styles.card__text_info}>
                            {product.info}
                        </div>
                    </div>
                    <div className={styles.card__price}>
                        <div className={styles.card__price_new}>
                            {product.price} руб.
                        </div>
                        <div className={styles.card__price_old}>
                            {product.oldPrice} руб.
                        </div>
                    </div>
                    <button
                        onClick={() => handleClick(product.cartId)}
                        className={styles.card__delButton}
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};
ProductCardCart.propTypes = {
    product: PropTypes.object
};

export default ProductCardCart;
