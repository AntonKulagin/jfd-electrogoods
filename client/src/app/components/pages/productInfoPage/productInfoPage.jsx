import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../store/slices/products";
import Button from "../../common/Button/Button";
import Container from "../../common/container/container";
import styles from "./productInfoPage.module.scss";
import icon from "../../../assets/icons/new.png";
import { addProduct } from "../../../store/slices/cart";

const ProductInfoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();

    const product = useSelector(getProductById(productId));

    const handleClick = (productId) => {
        dispatch(addProduct(productId, navigate));
    };

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
                            <div className={styles.content__name}>
                                {product.name}
                            </div>
                            <div className={styles.content__info}>
                                {product.info}
                            </div>
                            <div className={styles.content__price}>
                                <div className={styles.content__price_current}>
                                    <span>{product.price}</span>
                                    <span> руб.</span>
                                </div>
                                <div className={styles.content__price_oldPrice}>
                                    <span>{product.oldPrice}</span>
                                    <span> руб.</span>
                                </div>
                                <Button
                                    onClick={() => handleClick(product._id)}
                                >
                                    В корзину
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductInfoPage;
