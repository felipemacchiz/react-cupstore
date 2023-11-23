import React from 'react';
import { FaShoppingBasket, FaArrowLeft } from "react-icons/fa";
import styles from './Header.module.css';
import Logo from '../../helper/Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const historyBack = () => {
		navigate('/');
	}

	return (
		<header className={styles.header}>
			{location.pathname !== "/" && (
				<button className='iconButton' onClick={historyBack}>
					<FaArrowLeft className={styles.icon} />
				</button>
			)}

			<div className={styles.logoWrapper}>
				<Logo />
			</div>

			<Link className={styles.cartWrapper} to="/carrinho">
				<FaShoppingBasket className={styles.icon} />
			</Link>
		</header>
	);
}

export default Header;