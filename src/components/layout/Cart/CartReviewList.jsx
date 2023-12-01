import React from 'react';
import styles from './Cart.module.css';
import { FaTrash } from 'react-icons/fa';
import { GlobalContext } from '../../../context/GlobalContext';

const CartReviewList = () => {
	const global = React.useContext(GlobalContext);
	const cart = global.cart;
	const refs = React.useRef(new Array(cart.length).fill(React.createRef()));

	const deleteItem = (target, index) => {
		const element = target.closest('.item-line');

		setTimeout(() => {
			global.deleteItemCart(index);

			element.removeAttribute('data-animation');
		}, 300);

		element.setAttribute('data-animation', 'easeOutLeft');
	}

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
							<li key={index} className='item-line'>
								<div className={styles.cartReviewListImg}>
									<img src={`${window.location.origin}/${item.img}`} alt={item.title} />
								</div>
								<div className={styles.cartReviewListTitlePrice}>
									<span>{item.title}</span>
									<span>R$ {item.price}</span>
								</div>
								<div className={styles.cartReviewListDeleteBtn}>
									<button className='btn-icon' onClick={({ target }) => deleteItem(target, index)}>
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