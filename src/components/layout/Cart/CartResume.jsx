import React from 'react';
import { currencyFormat } from '../../../commom';
import styles from './Cart.module.css';
import { GlobalContext } from '../../../context/GlobalContext';
import CardTitle from './Card/CardTitle';
import CardContent from './Card/CardContent';
import Card from './Card/Card';
import { FaArrowUp, FaCheck } from 'react-icons/fa';
import { ORDER_POST } from '../../../api/api';
import useFetch from '../../../hooks/useFetch';

const CartResume = ({ activeStage, stage, setStage }) => {
	const global = React.useContext(GlobalContext);
	const { request } = useFetch();

	const data = global.cart;
	const groupedData = data.reduce((grouped, item) => {
		if (!Object.prototype.hasOwnProperty.call(grouped, item.key)) {
			grouped[item.key] = [];
		}

		grouped[item.key].push(item);

		return grouped;
	}, {});

	const orderPrice = data.reduce((total, i) => total + i.price, 0);
	let shippingPrice = 0;

	if (global.distance) {
		console.log(global.distance);
		shippingPrice = +(global.distance.rows[0].elements[0].distance.value * 0.68 / 1000).toFixed(2);
	}

	const totalPrice = orderPrice + shippingPrice;

	async function sendOrder(event) {
		event.preventDefault();

		const { url, options } = ORDER_POST({
			totalPrice,
			orderPrice,
			shippingPrice,
			items: data,
			address: global.distance.destinationAddresses[0],
			distance: global.distance.rows[0].elements[0].distance.value,
			duration: global.distance.rows[0].elements[0].duration.value * 1000,
			orderTime: new Date().toISOString(),
		});

		const { response, json } = await request(url, options);

		if (response?.ok) {
			const storagedOrders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
			storagedOrders.push(json._id);
			localStorage.setItem("orders", JSON.stringify(storagedOrders));
		}
	}

	return (
		<Card activeStage={activeStage} stage={stage}>
			<CardTitle 
				activeStage={activeStage} 
				stage={stage} 
				title={'Resumo do seu pedido'} 
				completedTitle={'Pedido enviado!'} 
			/>

			<CardContent activeStage={activeStage} stage={stage}>
				<div className={styles.addressMap}>
					<div className={styles.cartResumeListContainer}>
						<ul className={styles.cartReviewList}>
							{Object.values(groupedData).map((item, index) => (
								<li key={index}>
									<div className={styles.cartReviewListImg}>
										<img src={item[0].img} alt={item[0].title} />
									</div>
									
									<div className={styles.cartReviewListTitlePrice}>
										<span>
											{item[0].title} 
											<span> (×{data.filter(i => i.key === item[0].key).length})</span>
										</span>

										<span>{currencyFormat(item.reduce((total, i) => total + i.price, 0))}</span>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className={styles.cartResumeTotal}>
							<span>Pedido:</span>
							<span>{currencyFormat(orderPrice)}</span>
						</p>
						<p className={styles.cartResumeTotal}>
							<span>Frete:</span>
							<span>{currencyFormat(shippingPrice)}</span>
						</p>
						<p className={`${styles.cartResumeTotal} ${styles.cartResumeTotalText}`}>
							<span>Total:</span>
							<span>{currencyFormat(totalPrice)}</span>
						</p>
					</div>
				</div>

				<div className={styles.actions}>
					<button className='btn-outline' onClick={() => setStage(stage - 1)}>
						<FaArrowUp />
						Voltar
					</button>
					
					<button className='btn-primary' onClick={sendOrder}>
						<FaCheck />
						Ir para o pagamento
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartResume;