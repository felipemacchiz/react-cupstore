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
			<div className={styles.headerContainer}>
				<div className={styles.logoWrapper}>
					{location.pathname !== "/" && (
						<button className='btn-icon' onClick={historyBack}>
							<FaArrowLeft className={styles.icon} />
						</button>
					)}

					<div>
						<Logo />
					</div>
				</div>

				<Link className={styles.cartWrapper} to="/carrinho">
					<FaShoppingBasket className={styles.icon} />
				</Link>
			</div>
		</header>
	);
}

export default Header;