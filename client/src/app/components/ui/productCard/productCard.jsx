import React from "react";
import styles from "./productCard.module.scss";
import icon from "../../../assets/icons/new.png";

const ProductCard = ({ product }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={product.image} alt="img" />
            </div>
            <div className={styles.card__name}>{product.name}</div>
            <div className={styles.card__info}>{product.info}</div>
            <div className={styles.card__price}>
                <div className={styles.card__price_currentPrice}>{product.price} руб.</div>
                <div className={styles.card__price_oldPrice}>{product.oldPrice} руб.</div>
            </div>
            {product.new && (
                <div className={styles.card__icon}>
                    <img src={icon} alt="icon" />
                </div>
            )}
        </div>
    );
};

export default ProductCard;
