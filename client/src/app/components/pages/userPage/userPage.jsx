import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentUserData,
    getIsLoading,
    getIsLoggedIn,
    updateUser
} from "../../../store/slices/auth";
import Container from "../../common/container/container";
import styles from "./userPage.module.scss";
import editIcon from "../../../assets/icons/edit.svg";
import TextField from "../../common/forms/TextField";
import Button from "../../common/Button";
import Loader from "../../common/loader/loader";

const UserPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const currentUserLoading = useSelector(getIsLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());

    const [edit, setEdit] = useState({
        name: currentUser.name || "",
        email: currentUser.email || ""
    });
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (target) => {
        setEdit((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleEdit = () => {
        setIsEdit((prev) => !prev);
    };

    const handleCancel = () => {
        setEdit({
            name: currentUser.name || "",
            email: currentUser.email || ""
        });
        setIsEdit(false);
    };

    const handleSave = () => {
        dispatch(updateUser(edit));
        setIsEdit(false);
    };

    if (currentUser && !currentUserLoading && isLoggedIn) {
        return (
            <div className={styles.user}>
                <Container>
                    <div className={styles.user__body}>
                        <div className={styles.user__image}>
                            <img src={currentUser.image} alt="" />
                        </div>
                        <div className={styles.user__content}>
                            <div className={styles.user__name}>
                                {edit?.name || ""}
                                {isEdit && (
                                    <TextField
                                        className={styles.textField__name}
                                        name="name"
                                        value={edit?.name || ""}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            <div className={styles.user__email}>
                                {edit?.email}
                                {isEdit && (
                                    <TextField
                                        className={styles.textField__email}
                                        name="email"
                                        value={edit?.email}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            {isEdit && (
                                <div className={styles.user__buttons}>
                                    <Button onClick={handleCancel}>
                                        Отмена
                                    </Button>
                                    <Button onClick={handleSave}>
                                        Сохранить
                                    </Button>
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.user__edit}
                            onClick={handleEdit}
                        >
                            <img src={editIcon} alt="edit" />
                        </button>
                    </div>
                </Container>
            </div>
        );
    } else {
        return <Loader />;
    }
};

export default UserPage;
