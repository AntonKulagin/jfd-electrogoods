import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";
import Container from "../container/container";

const Modal = ({ active, onModal, children }) => {
    return (
        <div
            className={active ? styles.modal__active : styles.modal}
            onClick={() => onModal(false)}
        >
            <Container>
                <div
                    className={
                        active ? styles.modal__body_active : styles.modal__body
                    }
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </Container>
        </div>
    );
};
Modal.propTypes = {
    active: PropTypes.bool,
    onModal: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Modal;
