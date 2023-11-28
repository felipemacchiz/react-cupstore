import React from 'react';
import styles from './Cart.module.css';
import { GlobalContext } from '../../../context/GlobalContext';

const CartResume = () => {
	const global = React.useContext(GlobalContext);
	const data = global.cart;
	const groupedData = data.reduce((grouped, item) => {
		if (!Object.prototype.hasOwnProperty.call(grouped, item.id)) {
			grouped[item.id] = [];
		}

		grouped[item.id].push(item);

		return grouped;
	}, {});

	const orderPrice = data.reduce((total, i) => total + i.price, 0);
	const shipping = 10;
	const totalPrice = orderPrice + shipping;

	return (
		<div className={styles.cartResume}>
			<h3>Resumo do pedido</h3>
			<div className={styles.cartResumeContent}>
				<div>
					<ul>
						{Object.values(groupedData).map((item, index) => (
							<li key={index}>
								<span>{item[0].title}</span>
								<span> (×{data.filter(i => i.id === item[0].id).length})</span>
								<span> - R${item.reduce((total, i) => total + i.price, 0)}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className={styles.cartResumeTotal}>
						<span>Pedido:</span>
						<span>R${orderPrice}</span>
					</p>
					<p className={styles.cartResumeTotal}>
						<span>Frete:</span>
						<span>R${shipping}</span>
					</p>
					<p className={`${styles.cartResumeTotal} ${styles.cartResumeTotalText}`}>
						<span>Total:</span>
						<span>R${totalPrice}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default CartResume;