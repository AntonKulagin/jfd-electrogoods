import React, { useState } from "react";
import Container from "../../common/container/container";
import styles from "./admin.module.scss";
import AdminProducts from "./adminProducts";
import AdminUsers from "./adminUsers";

const Admin = () => {
    const category = {
        products: { name: "Товары", type: "products" },
        users: { name: "Пользователи", type: "users" }
    };

    const [choice, setChoice] = useState("products");

    const handleCategory = (item) => {
        switch (item) {
            case "products":
                setChoice("products");
                break;
            case "users":
                setChoice("users");
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
            </Container>
        </div>
    );
};

export default Admin;
