import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../common/container/container";
import styles from "./productsPage.module.scss";
import TextField from "../../common/forms/TextField/TextField";
import ProductCard from "../../ui/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/slices/products";
import Button from "../../common/Button/Button";
import { addProduct } from "../../../store/slices/cart";
import Sidebar from "../../ui/sidebar/sidebar";
import SelectField from "../../common/forms/selectField/selectField";
import _ from "lodash";
import {
    getTypeFilterMain,
    setTypeFilterMain
} from "../../../store/slices/main";
import Pagination from "../../common/pagination/pagination";
import { paginate } from "../../../utils/paginate";

const ProductsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const goods = useSelector(getAllProducts());

    const pageSize = 8;

    const typeFilterFromMain = useSelector(getTypeFilterMain());

    const sortList = {
        price: { name: "price", label: "Сортировано по цене" },
        nameProduct: { name: "name", label: "Сортировано по названию" }
    };

    const [typeFilter, setTypeFilter] = useState(
        typeFilterFromMain || "allgoods"
    );
    const [search, setSearch] = useState({ name: "", value: "" });
    const [sort, setSort] = useState({ path: "name", order: "asc" });

    const handleChange = (target) => {
        setSearch(target);
    };

    const handleSidebar = (e) => {
        setTypeFilter(e.target.name);
        dispatch(setTypeFilterMain(e.target.name));
    };

    const handleSort = (target) => {
        setSort((prev) => ({ ...prev, path: target }));
    };
    const handleSortOrder = (sortOrder) => {
        const order = sortOrder ? "asc" : "desc";
        setSort((prev) => ({ ...prev, order }));
    };

    const filteredGoods =
        typeFilter && typeFilter !== "allgoods"
            ? goods.filter((item) => item.type === typeFilter)
            : goods;

    const searchedGoods = filteredGoods.filter((item) =>
        item.name.toUpperCase().includes(search.value.toUpperCase())
    );

    const filteredProduct = _.orderBy(searchedGoods, [sort.path], [sort.order]);

    const productsCrop = paginate(filteredProduct, currentPage, pageSize);
    const productsCount = filteredProduct.length;

    const handleClick = (productId) => {
        dispatch(addProduct(productId, navigate));
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
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
                        <Sidebar onChoose={handleSidebar} active={typeFilter} />
                    </div>
                    <div className={styles.goods__products}>
                        <div className={styles.goods__content}>
                            <div className={styles.goods__cards}>
                                {productsCrop.map((product) => (
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
                        <div className={styles.goods__pagination}>
                            <Pagination
                                itemsCount={productsCount}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductsPage;
