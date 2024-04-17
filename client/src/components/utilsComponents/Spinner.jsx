import React from "react";
import styles from "./spinner.module.css";

function Spinner(width = 80, height = 80) {
  return (
    <div className={`${styles.spinner} w-[${width}px] h-[${height}px]`}></div>
  );
}

export default Spinner;
