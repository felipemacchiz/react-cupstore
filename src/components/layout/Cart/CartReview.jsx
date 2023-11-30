import React from 'react';
import styles from './Cart.module.css';
import { GlobalContext } from '../../../context/GlobalContext';
import CardTitle from './Card/CardTitle';
import CardContent from './Card/CardContent';
import Card from './Card/Card';
import { useNavigate } from 'react-router-dom';

const CartReview = ({ activeStage, stage, setStage }) => {
	const global = React.useContext(GlobalContext);
	const data = global.cart;
	
	const navigate = useNavigate();

	if (data) {
		return (
			<Card activeStage={activeStage} stage={stage}>
				<CardTitle 
					activeStage={activeStage} 
					stage={stage} 
					title={'Revise os produtos selecionados'} 
					completedTitle={'Produtos revisados!'} 
				/>

				<CardContent activeStage={activeStage} stage={stage}>
					<div>
						<ul>
							{data.map((item, index) => (
								<li key={index}>
									<span>{item.title}</span>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.actions}>
						<button className='btn-outline' onClick={() => navigate('/')}>Voltar para lista de produtos</button>
						<button className='btn-primary' onClick={() => setStage(stage + 1)}>Ir para o endereço de entrega</button>
					</div>
				</CardContent>
			</Card>
		);
	} else {
		return null;
	}
}

export default CartReview;