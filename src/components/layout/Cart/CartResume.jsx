import React from 'react';
import styles from './Cart.module.css';
import { GlobalContext } from '../../../context/GlobalContext';
import CardTitle from './Card/CardTitle';
import CardContent from './Card/CardContent';
import Card from './Card/Card';
import { FaArrowUp, FaCheck } from 'react-icons/fa';

const CartResume = ({ activeStage, stage, setStage }) => {
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
		<Card activeStage={activeStage} stage={stage}>
			<CardTitle 
				activeStage={activeStage} 
				stage={stage} 
				title={'Resumo do seu pedido'} 
				completedTitle={'Pedido enviado!'} 
			/>

			<CardContent activeStage={activeStage} stage={stage}>
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

				<div className={styles.actions}>
					<button className='btn-outline' onClick={() => setStage(stage - 1)}>
						<FaArrowUp />
						Voltar para endereço
					</button>
					
					<button className='btn-primary' onClick={() => setStage(stage + 1)}>
						<FaCheck />
						Confirmar e ir para o pagamento
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartResume;