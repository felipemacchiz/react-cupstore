import React from 'react';
import styles from './Order.module.css';
import cartStyles from '../../components/layout/Cart/Cart.module.css';
import { currencyFormat, dateDiff, dateFormat } from '../../commom';
import { FaBoxOpen, FaCreditCard, FaTruck } from "react-icons/fa";
import { FaHouseCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
	const [stage, setStage] = React.useState(0);
	const [status, setStatus] = React.useState('');

	React.useEffect(() => {
		if (order.canceled) {
			setStatus("Pedido cancelado");
			setStage(0);
		} else if (!order.paid) {
			setStatus("Aguardando pagamento...");
			setStage(1);
		} else if (dateDiff(new Date(order.paidTime), new Date()) / 60 < 5) {
			setStatus("Preparando pedido...");
			setStage(2);
		} else if (dateDiff(new Date(order.paidTime), new Date()) < order.duration / 1000 + 5) {
			setStatus("Saiu para entrega!");
			setStage(3);
		} else if (!order.concluded) {
			setStatus("Seu pedido chegou!");
			setStage(4);
		} else {
			setStatus("Pedido concluído!");
			setStage(0);
		}
	}, [order.canceled, order.concluded, order.duration, order.paid, order.paidTime]);

	const groupedItems = order.items.reduce((grouped, item) => {
		if (!Object.prototype.hasOwnProperty.call(grouped, item.key)) {
			grouped[item.key] = [];
		}

		grouped[item.key].push(item);

		return grouped;
	}, {});

	const deliveredTime = dateFormat(new Date(new Date(order.paidTime).getTime() + order.duration + (5 * 60000)));

	return (
		<div>
			<h2>Pedido #{order._id.replace(/\D/g, '')}</h2>

			<div>
				<span>{status || ''}</span>
			</div>

			{stage > 0 && stage < 4 && (
				<div>
					<span>Previsão de entrega: {deliveredTime}</span>
				</div>
			)}

			{stage === 4 || order.completed && (
				<div>
					<span>Pedido entrega: {deliveredTime}</span>
				</div>
			)}

			{order.canceled && (
				<div>
					<span>Pedido cancelado em {dateFormat(order.canceledTime)}</span>
				</div>
			)}

			{stage > 0 && (
				<div className={styles.stageContainer}>
					<div className={styles.stages}>
						<div className={stage === 1 ? styles.activeStage : ''}>
							<span>Aguardando pagamento</span>
						</div>

						<div className={stage === 2 ? styles.activeStage : ''}>
							<span>Preparando seu pedido</span>
						</div>

						<div className={stage === 3 ? styles.activeStage : ''}>
							<span>Saiu para entrega</span>
						</div>

						<div className={stage === 4 ? styles.activeStage : ''}>
							<span>Pedido entregue!</span>
						</div>
					</div>

					<div className={styles.stageBar}>
						<div className={(stage >= 1 ? styles.activeStage : '') + " " + styles.stageBarIcon}>
							<FaCreditCard />
						</div>

						<div className={(stage >= 2 ? styles.activeStage : '') + " " + styles.stageBarIcon}>
							<FaBoxOpen />
						</div>

						<div className={(stage >= 3 ? styles.activeStage : '') + " " + styles.stageBarIcon}>
							<FaTruck />
						</div>

						<div className={(stage >= 4 ? styles.activeStage : '') + " " + styles.stageBarIcon}>
							<FaHouseCircleCheck />
						</div>

						<div className={styles.bar}>
							<div className={styles.completedBar} style={{ width: `${
								stage === 1 ? 12.5 :
								stage === 2 ? 37.5 :
								stage === 3 ? 62.5 :
								stage === 4 ? 100 : 0
							}%` }}></div>
						</div>
					</div>
				</div>
			)}

			{!order.canceled && !order.paid && (
				<>
					<br/>
					<Link className='btn-primary' to={`/pagamento/${order._id}`}>Ir para pagamento</Link>
				</>
			)}

			<br/>

			<div className={cartStyles.addressMap}>
				<div className={cartStyles.cartResumeListContainer}>
					<ul className={cartStyles.cartReviewList}>
						{Object.values(groupedItems).map((item, index) => (
							<li key={index}>
								<div className={cartStyles.cartReviewListImg}>
									<img src={item[0].img} alt={item[0].title} />
								</div>
								
								<div className={cartStyles.cartReviewListTitlePrice}>
									<span>
										{item[0].title} 
										<span> (×{order.items.filter(i => i.key === item[0].key).length})</span>
									</span>

									<span>{currencyFormat(item.reduce((total, i) => total + i.price, 0))}</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className={cartStyles.cartResumePrices}>
					<p className={cartStyles.cartResumeTotal}>
						<span>Pedido:</span>
						<span>{currencyFormat(order.orderPrice)}</span>
					</p>
					<p className={cartStyles.cartResumeTotal}>
						<span>Frete:</span>
						<span>{currencyFormat(order.shippingPrice)}</span>
					</p>
					<p className={`${cartStyles.cartResumeTotal} ${cartStyles.cartResumeTotalText}`}>
						<span>Total:</span>
						<span>{currencyFormat(order.totalPrice)}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Order;