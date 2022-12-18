import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserAdmin } from "../../../store/slices/auth";
import Loader from "../../common/loader/loader";
import styles from "./admin.module.scss";
import editIcon from "../../../assets/icons/edit.svg";
import RadioField from "../../common/forms/radioField";
import Button from "../../common/Button";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const admin = [
        { value: "true", name: "да" },
        { value: "false", name: "нет" }
    ];
    const allUsers = useSelector(getAllUsers());

    const [isEditId, setIsEditId] = useState(null);
    const [edit, setEdit] = useState({
        _id: "",
        isAdmin: "false"
    });

    const handleEdit = (id) => {
        setIsEditId(id);
        setEdit((prev) => ({ ...prev, _id: id }));
    };

    const getDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const handleChange = (target) => {
        setEdit((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const getClassCard = (id) => {
        if (isEditId === id) return styles.adminUsers__card_active;
        else return styles.adminUsers__card;
    };

    const handleUpdate = () => {
        dispatch(updateUserAdmin(edit));
    };

    const handleClose = () => {
        setIsEditId(null);
        setEdit(null);
    };

    if (allUsers) {
        return (
            <div className={styles.adminUsers}>
                <div className={styles.adminUsers__body}>
                    {allUsers.map((user) => (
                        <div className={getClassCard(user._id)} key={user._id}>
                            <div className={styles.adminUsers__image}>
                                <img src={user.image} alt="user" />
                            </div>
                            <div className={styles.adminUsers__info}>
                                <div className={styles.adminUsers__name}>
                                    {user.name}
                                </div>
                                <div className={styles.adminUsers__email}>
                                    {user.email}
                                </div>
                                <div
                                    className={styles.adminUsers__registration}
                                >
                                    Зарегистрирован: {getDate(user.createdAt)}
                                </div>
                                <div className={styles.adminUsers__admin}>
                                    <span>
                                        {user.isSuperAdmin
                                            ? "Суперадминистратор"
                                            : `Администратор: ${
                                                  user.isAdmin ? "да" : "нет"
                                              }`}
                                    </span>
                                    <span>
                                        {isEditId === user._id && (
                                            <RadioField
                                                options={admin}
                                                name="isAdmin"
                                                value={edit.isAdmin}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </span>
                                </div>

                                {isEditId === user._id && (
                                    <div className={styles.admin__buttons}>
                                        <div
                                            className={
                                                styles.admin__buttonUpdate
                                            }
                                        >
                                            <Button onClick={handleUpdate}>
                                                Обновить
                                            </Button>
                                        </div>
                                        <button
                                            className={
                                                styles.admin__buttonClose
                                            }
                                            onClick={() =>
                                                handleClose(user._id)
                                            }
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                )}
                            </div>
                            {!user.isSuperAdmin && (
                                <button
                                    className={styles.admin__edit}
                                    onClick={() => handleEdit(user._id)}
                                >
                                    <img src={editIcon} alt="edit" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    } else return <Loader />;
};

export default AdminUsers;
