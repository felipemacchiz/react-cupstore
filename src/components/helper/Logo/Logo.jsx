import React from 'react'
import styles from './Logo.module.css';
import { GiCupcake } from "react-icons/gi";

const Logo = () => {
    return (
        <h1 className={styles.logo}>
            <GiCupcake />
            Cupstore
        </h1>
    )
}

export default Logo