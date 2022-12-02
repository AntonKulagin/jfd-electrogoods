import React from "react";
import { Link } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./productsPage.module.scss";
import TextField from "../../common/forms/TextField/TextField";
import { useState } from "react";
import ProductCard from "../../ui/productCard/productCard";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../store/slices/products";
import Button from "../../common/Button/Button";

const ProductsPage = () => {
    const goods = useSelector(getAllProducts());

    const [search, setSearch] = useState({ name: "", value: "" });

    const handleChange = (target) => {
        setSearch(target);
    };

    const handleClick = () => {
        console.log("Click");
    };

    return (
        <div className={styles.goods}>
            <Container>
                <div className={styles.goods__search}>
                    <div className={styles.goods__search_left}>
                        <TextField
                            placeholder=" "
                            label="Введите название"
                            onChange={handleChange}
                            name="search"
                            value={search.value}
                        />
                    </div>
                    <div className={styles.goods__search_right}>right</div>
                </div>
                <div className={styles.goods__bottom}>
                    <div className={styles.goods__sidebar}>sidebar</div>
                    <div className={styles.goods__products}>
                        <div className={styles.goods__content}>
                            <div className={styles.goods__cards}>
                                {goods.map((product) => (
                                    <div className={styles.goods__item} key={product._id}>
                                        <Link to={`/goods/${product._id}`}>
                                            <ProductCard product={product} />
                                        </Link>
                                        <Button onClick={(e) => handleClick(e)}>В корзину</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductsPage;
