import React from 'react';
import styles from './Cart.module.css';
import { FaTrash } from 'react-icons/fa';
import { GlobalContext } from '../../../context/GlobalContext';

const CartReviewList = () => {
	const global = React.useContext(GlobalContext);
	const cart = global.cart;

	if (cart && cart.length) {
		const sortedData = cart.sort((a, b) => a.id - b.id);
		const totalPrice = cart.reduce((total, item) => {
			return total + item.price;
		}, 0);

		return (
			<div>
				<div className={styles.cartReviewListContainer}>
					<ul className={styles.cartReviewList}>
						{sortedData.map((item, index) => (
							<li key={index}>
								<div className={styles.cartReviewListImg}>
									<img src={`${window.location.origin}/${item.img}`} alt={item.title} />
								</div>
								<div className={styles.cartReviewListTitlePrice}>
									<span>{item.title}</span>
									<span>R$ {item.price}</span>
								</div>
								<div className={styles.cartReviewListDeleteBtn}>
									<button className='btn-icon' onClick={() => global.deleteItemCart(index)}>
										<FaTrash />
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.cartReviewTotalPrice}>
					<div>
						<span>
							Total
						</span>
					</div>

					<div>
						<span>
							R$ {totalPrice}
						</span>
					</div>
				</div>
			</div>
		);
	}

	return null;
}

export default CartReviewList;