import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../store/slices/products";
import Button from "../../common/Button/Button";
import Container from "../../common/container/container";
import styles from "./productInfoPage.module.scss";
import icon from "../../../assets/icons/new.png";

const ProductInfoPage = () => {
    const { productId } = useParams();

    const product = useSelector(getProductById(productId));

    return (
        <div className={styles.productInfo}>
            <Container>
                <div className={styles.productInfo__body}>
                    <div className={styles.productInfo__left}>
                        <div className={styles.productInfo__image}>
                            <img src={product.image} alt="image" />
                        </div>
                        {product.new && (
                            <div className={styles.productInfo__icon}>
                                <img src={icon} alt="icon" />
                            </div>
                        )}
                    </div>
                    <div className={styles.productInfo__right}>
                        <div className={styles.content}>
                            <div className={styles.content__name}>{product.name}</div>
                            <div className={styles.content__info}>{product.info}</div>
                            <div className={styles.content__price}>
                                <div className={styles.content__price_currentPrice}>{product.price} руб.</div>
                                <div className={styles.content__price_oldPrice}>{product.oldPrice} руб.</div>
                                <Button onClick={() => console.log("Click")}>В корзину</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductInfoPage;
