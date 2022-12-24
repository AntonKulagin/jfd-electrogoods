import React, { useEffect, useState } from "react";
import styles from "./productCardCart.module.scss";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../store/slices/cart";

const ProductCardCart = ({ product, amount, onChange }) => {
    const [amountProd, setAmountProd] = useState(amount);
    const dispatch = useDispatch();

    const handleClick = (cartId) => {
        dispatch(removeProduct(cartId));
    };

    useEffect(() => {
        onChange(product._id, amountProd);
    }, [amountProd]);

    const handleChange = (change) => {
        switch (change) {
            case "decrement":
                setAmountProd((prev) => (prev <= 1 ? (prev = 1) : prev - 1));
                break;
            case "increment":
                setAmountProd((prev) => prev + 1);
                break;
            default:
                break;
        }
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
                        <div className={styles.card__amount}>
                            <button
                                onClick={() => handleChange("decrement")}
                                className={styles.card__amountButton_prev}
                            >
                                -
                            </button>
                            {amount}
                            <button
                                onClick={() => handleChange("increment")}
                                className={styles.card__amountButton_next}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={styles.card__price}>
                        <div className={styles.card__price_new}>
                            {product.price * amount} руб.
                        </div>
                        <div className={styles.card__price_old}>
                            {product.oldPrice * amount} руб.
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
    product: PropTypes.object,
    amount: PropTypes.number,
    onChange: PropTypes.func
};

export default ProductCardCart;
