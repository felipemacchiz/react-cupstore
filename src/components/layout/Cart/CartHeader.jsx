import React from 'react';
import styles from './Cart.module.css';
import { FaTrashAlt } from 'react-icons/fa';
import { GlobalContext } from '../../../context/GlobalContext';

const CartHeader = () => {
	const global = React.useContext(GlobalContext);

	const clearCart = () => {
		global.setCart('');
	}

	return (
		<div className={styles.cartHeader}>
			<h2 className='font-lobster'>Carrinho</h2>
			<button className='btn-secondary' onClick={clearCart}>
				<FaTrashAlt />
				<span>Esvaziar carrinho</span>
			</button>
		</div>
	);
}

export default CartHeader;