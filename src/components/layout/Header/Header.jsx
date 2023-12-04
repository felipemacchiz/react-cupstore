import React from 'react';
import { FaArrowLeft, FaFileAlt, FaShoppingCart } from "react-icons/fa";
import styles from './Header.module.css';
import Logo from '../../helper/Logo/Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const hasOrders = localStorage.getItem('orders')

	const historyBack = () => {
		navigate('/');
	}

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.leftWrapper}>
					{location.pathname !== "/" && (
						<button className='btn-icon' onClick={historyBack}>
							<FaArrowLeft className={styles.icon} />
						</button>
					)}

					<div>
						<Logo />
					</div>
				</div>

				<div className={styles.rightWrapper}>
					{hasOrders && (
						<Link className={styles.linkBtn} to="/pedido">
							<span className={styles.btnText}>Pedidos</span>
							<FaFileAlt className={styles.icon} />
						</Link>
					)}

					<Link className={styles.linkBtn} to="/carrinho">
						<span className={styles.btnText}>Carrinho</span>
						<FaShoppingCart className={styles.icon} />
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;