import React from "react";
import styles from "./bgImage.module.scss";
import bgImage from "../../../assets/images/bgImage.jpg";

const BgImage = () => {
    return (
        <div className={styles.bgImage}>
            <img src={bgImage} alt="bgImage" />
        </div>
    );
};

export default BgImage;
