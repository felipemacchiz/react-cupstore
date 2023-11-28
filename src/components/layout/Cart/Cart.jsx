import React from 'react';
import styles from './Cart.module.css';
import { FaSadTear } from 'react-icons/fa';
import useFetch from '../../../hooks/useFetch';
import { PRODUCTS_GET } from '../../../api';
import { GlobalContext } from '../../../context/GlobalContext';
import CartResume from './CartResume';
import CartHeader from './CartHeader';
import CartShipping from './CartShipping';

const Cart = () => {
	const global = React.useContext(GlobalContext);

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
				<CartHeader />
				{/* {global.cart.map((item, index) => <p key={index}>{item.title} ({global.cart.filter(i => i.id === item.id).length}x)</p>)} */}
				
				<CartShipping />
				
				<br/>

				<CartResume />
			</div>
		);
	}
}

export default Cart;