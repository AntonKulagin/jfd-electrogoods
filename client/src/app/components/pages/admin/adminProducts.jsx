import React, { useState } from "react";
import editIcon from "../../../assets/icons/edit.svg";
// import closeIcon from "../../../assets/icons/close.svg";
import TextField from "../../common/forms/TextField";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, updateProduct } from "../../../store/slices/products";
import styles from "./admin.module.scss";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts());

    const [edit, setEdit] = useState({});

    const handleChange = (target) => {
        setEdit((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const [isEditId, setIsEditId] = useState(null);

    const handleEdit = (id) => {
        setIsEditId(id);
        setEdit((prev) => ({ ...prev, _id: id }));
    };

    const handleUpdate = () => {
        dispatch(updateProduct(edit));
    };

    const getClassItem = (id) => {
        if (isEditId === id) return styles.admin__item_active;
        else return styles.admin__item;
    };

    const handleClose = () => {
        setIsEditId(null);
        setEdit(null);
    };

    return (
        <div className={styles.admin__cards}>
            {products.map((item) => (
                <div className={getClassItem(item._id)} key={item._id}>
                    <div className={styles.admin__image}>
                        <img src={item.image} alt="image" />
                    </div>
                    <div className={styles.admin__info}>
                        <div className={styles.admin__name}>
                            {isEditId === item._id ? (
                                <TextField
                                    className={styles.admin__nameProduct}
                                    placeholder=""
                                    name="name"
                                    value={edit.name ? edit.name : item.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <>{item.name}</>
                            )}
                        </div>
                        <div className={styles.admin__info}>
                            {isEditId === item._id ? (
                                <TextField
                                    className={styles.admin__nameProduct}
                                    placeholder=""
                                    name="info"
                                    value={edit.info ? edit.info : item.info}
                                    onChange={handleChange}
                                />
                            ) : (
                                <>{item.info}</>
                            )}
                        </div>
                        <div className={styles.admin__price}>
                            {isEditId === item._id ? (
                                <TextField
                                    className={styles.admin__nameProduct}
                                    placeholder=""
                                    name="price"
                                    value={edit.price ? edit.price : item.price}
                                    onChange={handleChange}
                                />
                            ) : (
                                <>Цена: {item.price} руб.</>
                            )}
                        </div>
                        <div className={styles.admin__oldPrice}>
                            {isEditId === item._id ? (
                                <TextField
                                    className={styles.admin__nameProduct}
                                    placeholder=""
                                    name="oldPrice"
                                    value={
                                        edit.oldPrice
                                            ? edit.oldPrice
                                            : item.oldPrice
                                    }
                                    onChange={handleChange}
                                />
                            ) : (
                                <span>Старая цена: {item.oldPrice} руб.</span>
                            )}
                        </div>
                        {isEditId === item._id && (
                            <div className={styles.admin__buttons}>
                                <div className={styles.admin__buttonUpdate}>
                                    <Button onClick={handleUpdate}>
                                        Обновить
                                    </Button>
                                </div>
                                <button
                                    className={styles.admin__buttonClose}
                                    onClick={() => handleClose(item._id)}
                                >
                                    Отмена
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.admin__edit}
                        onClick={() => handleEdit(item._id)}
                    >
                        <img src={editIcon} alt="edit" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminProducts;
