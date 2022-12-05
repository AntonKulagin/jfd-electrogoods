import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./productsPage.module.scss";
import TextField from "../../common/forms/TextField/TextField";
import ProductCard from "../../ui/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/slices/products";
import Button from "../../common/Button/Button";
import { addProduct } from "../../../store/slices/cart";
import { getCurrenrUserId } from "../../../store/slices/auth";
import Sidebar from "../../ui/sidebar/sidebar";
import SelectField from "../../common/forms/selectField/selectField";
import _ from "lodash";

const ProductsPage = () => {
    const dispatch = useDispatch();
    const goods = useSelector(getAllProducts());
    const currentUserId = useSelector(getCurrenrUserId());

    const sortList = {
        price: { name: "price", label: "Сортировано по цене" },
        nameProduct: { name: "name", label: "Сортировано по названию" }
    };

    const [typeFilter, setTypeFilter] = useState(null);
    const [search, setSearch] = useState({ name: "", value: "" });
    const [sort, setSort] = useState({ path: "name", order: "asc" });

    const handleChange = (target) => {
        setSearch(target);
    };

    const handleSidebar = (e) => {
        if (e.target.name === "allgoods") {
            setTypeFilter(null);
        } else {
            setTypeFilter(e.target.name);
        }
    };

    const handleSort = (target) => {
        setSort((prev) => ({ ...prev, path: target }));
    };
    const handleSortOrder = (sortOrder) => {
        const order = sortOrder ? "asc" : "desc";
        setSort((prev) => ({ ...prev, order: order }));
    };

    const filteredGoods = typeFilter
        ? goods.filter((item) => item.type === typeFilter)
        : goods;

    const searchedGoods = filteredGoods.filter((item) =>
        item.name.toUpperCase().includes(search.value.toUpperCase())
    );

    const filteredProduct = _.orderBy(searchedGoods, [sort.path], [sort.order]);

    const handleClick = (productId) => {
        dispatch(addProduct({ productId, currentUserId }));
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
                    <div className={styles.goods__search_right}>
                        <SelectField
                            sortList={sortList}
                            onSort={handleSort}
                            onSortOrder={handleSortOrder}
                            name="select"
                            value={sort.path}
                        />
                    </div>
                </div>
                <div className={styles.goods__bottom}>
                    <div className={styles.goods__sidebar}>
                        <Sidebar onChoose={handleSidebar} />
                    </div>
                    <div className={styles.goods__products}>
                        <div className={styles.goods__content}>
                            <div className={styles.goods__cards}>
                                {filteredProduct.map((product) => (
                                    <div
                                        className={styles.goods__item}
                                        key={product._id}
                                    >
                                        <Link to={`/goods/${product._id}`}>
                                            <ProductCard product={product} />
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                handleClick(product._id)
                                            }
                                        >
                                            В корзину
                                        </Button>
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
