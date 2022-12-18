import React from "react";
import BgImage from "../../common/bgImage/bgImage";
import Container from "../../common/container/container";
import styles from "./mainPage.module.scss";
import images from "../../../utils/images";
import { useDispatch } from "react-redux";
import { setTypeFilterMain } from "../../../store/slices/main";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productChoice = {
        computer: {
            name: "computer",
            label: "Компьютеры",
            image: images.computerImage,
            typeFilter: "computer"
        },
        laptop: {
            name: "laptop",
            label: "Ноутбуки",
            image: images.laptopImage,
            typeFilter: "laptop"
        },
        allgoods: {
            name: "allgoods",
            label: "Все товары",
            image: images.allGoodsImage,
            typeFilter: "allgoods"
        }
    };

    const handleClick = (typeFilter) => {
        dispatch(setTypeFilterMain(typeFilter));
        navigate("/goods", { replace: true });
    };

    return (
        <div className={styles.main}>
            <Container>
                <div className={styles.main__body}>
                    {Object.keys(productChoice).map((item) => (
                        <div
                            onClick={() =>
                                handleClick(productChoice[item].typeFilter)
                            }
                            className={styles.main__card}
                            key={item}
                        >
                            <div className={styles.main__item}>
                                <div className={styles.main__title}>
                                    {productChoice[item].label}
                                </div>
                                <div className={styles.main__image}>
                                    <img
                                        src={productChoice[item].image}
                                        alt="image"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            <BgImage />
        </div>
    );
};

export default MainPage;
