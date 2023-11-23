import React from 'react';
import styles from './Cart.module.css';
import { FaSadTear } from 'react-icons/fa';
import useFetch from '../../../hooks/useFetch';
import { PRODUCTS_GET } from '../../../api';
import { GlobalContext } from '../../../context/GlobalContext';
import CartResume from './CartResume';

const Cart = () => {
	const global = React.useContext(GlobalContext);

	console.log(global);

	if (!global.cart.length) {
		return (
			<div className={styles.emptyCart}>
				<FaSadTear />
				<p>Seu carrinho está vazio!</p>
			</div>
		);
	} else {
		return (
			<div>
				{global.cart.map((item, index) => <p key={index}>{item.title} ({global.cart.filter(i => i.id === item.id).length}x)</p>)}
				<CartResume />
			</div>
		);
	}
}

export default Cart;