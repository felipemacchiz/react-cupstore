import React from 'react';
import styles from './Cart.module.css';
import CardTitle from './Card/CardTitle';
import CardContent from './Card/CardContent';
import Card from './Card/Card';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaLongArrowAltLeft } from 'react-icons/fa';
import CartReviewList from './CartReviewList';

const CartReview = ({ activeStage, stage, setStage }) => {
	const navigate = useNavigate();

	return (
		<Card activeStage={activeStage} stage={stage}>
			<CardTitle 
				activeStage={activeStage} 
				stage={stage} 
				title={'Revise os produtos selecionados'} 
				completedTitle={'Produtos revisados!'} 
			/>

			<CardContent activeStage={activeStage} stage={stage}>
				<CartReviewList />

				<div className={styles.actions}>
					<button className='btn-outline' onClick={() => navigate('/')}>
						<FaLongArrowAltLeft />
						Voltar para lista de produtos
					</button>
					<button className='btn-primary' onClick={() => setStage(stage + 1)}>
						<FaCheck />
						Ir para o endereço de entrega
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartReview;