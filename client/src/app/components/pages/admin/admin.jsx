import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/slices/products";
import Container from "../../common/container/container";
import TextField from "../../common/forms/TextField";
import Modal from "../../common/modal/modal";
import styles from "./admin.module.scss";
import AdminProducts from "./adminProducts";
import AdminUsers from "./adminUsers";

const Admin = () => {
    const dispatch = useDispatch();
    const category = {
        products: { name: "Товары", type: "products" },
        users: { name: "Пользователи", type: "users" },
        newProduct: { name: "Добавить товар", type: "newProduct" }
    };

    const [choice, setChoice] = useState("products");
    const [modalActive, setModalActive] = useState(false);
    const [newData, setNewData] = useState({
        name: "",
        image: "",
        info: "",
        price: "",
        oldPrice: "",
        type: ""
    });

    const handleCategory = (item) => {
        switch (item) {
            case "products":
                setChoice("products");
                break;
            case "users":
                setChoice("users");
                break;
            case "newProduct":
                setModalActive(true);
                break;
            default:
                setChoice("products");
                break;
        }
    };

    const getClassButton = (item) => {
        if (item === choice) return styles.admin__button_active;
        else return styles.admin__button;
    };

    const handleModal = () => {
        setModalActive((prev) => !prev);
    };

    const handleChange = (target) => {
        setNewData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(newData));
        //   console.log("Создать товар", newData);
    };

    return (
        <div id="admin" className={styles.admin}>
            <Container>
                <div className={styles.admin__body}>
                    <div className={styles.admin__sidebar}>
                        {Object.keys(category).map((item) => (
                            <button
                                onClick={() => handleCategory(item)}
                                className={getClassButton(item)}
                                key={item}
                            >
                                {category[item].name}
                            </button>
                        ))}
                    </div>
                    <div className={styles.admin__content}>
                        {choice === "products" && <AdminProducts />}
                        {choice === "users" && <AdminUsers />}
                    </div>
                </div>
                <Modal active={modalActive} onModal={handleModal}>
                    <div className={styles.newProd__body}>
                        <div className={styles.newProd__title}>
                            Добавить товар
                        </div>
                        <div className={styles.newProd__content}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.newProd__name}>
                                    <TextField
                                        label="Название"
                                        name="name"
                                        value={newData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__image}>
                                    <TextField
                                        label="URL картинки"
                                        name="image"
                                        value={newData.image}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__info}>
                                    <TextField
                                        label="Дополнительная информация"
                                        name="info"
                                        value={newData.info}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__price}>
                                    <TextField
                                        label="Цена"
                                        name="price"
                                        value={newData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__oldPrice}>
                                    <TextField
                                        label="Старая цена"
                                        name="oldPrice"
                                        value={newData.oldPrice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__type}>
                                    <TextField
                                        label="Тип продукта *"
                                        name="type"
                                        value={newData.type}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.newProd__typeInfo}>
                                    * - computer / laptop / fridge / vacuum
                                </div>
                                <button
                                    className={styles.newProd__button}
                                    type="submit"
                                >
                                    Создать товар
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </Container>
        </div>
    );
};

export default Admin;
