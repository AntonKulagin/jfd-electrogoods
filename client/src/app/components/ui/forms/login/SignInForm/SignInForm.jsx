import React from "react";
import useForm from "../../../../../hooks/useForm";
import styles from "../styles/login-form.module.scss";
import { validatorConfig } from "./validatorConfig";
import { useDispatch, useSelector } from "react-redux";
import { getAuthSignInError, signIn } from "../../../../../store/slices/auth";
import { useNavigate } from "react-router-dom";
import TextField from "../../../../common/forms/TextField";
import Button from "../../../../common/Button";

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, handleChange, validateBySubmit, errors } = useForm(
        {
            email: "",
            password: ""
        },
        validatorConfig
    );

    const authError = useSelector(getAuthSignInError());

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        validateBySubmit();
        if (isValid) {
            // console.log("sign in form", data);
            dispatch(signIn(data, navigate));
        }
    };
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className={styles.right__field}>
                <TextField
                    label="Введите email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder=" "
                    error={errors.email}
                />
            </div>
            <div className={styles.right__field}>
                <TextField
                    label="Введите пароль"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder=" "
                    error={errors.password}
                />
            </div>
            {authError && <p className={styles.right__error}>{authError}</p>}
            <Button>Войти</Button>
        </form>
    );
};

export default SignInForm;
