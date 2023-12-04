import React from 'react';
import styles from './Cart.module.css';
import CardTitle from '../Card/CardTitle';
import CardContent from '../Card/CardContent';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
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
						<FaArrowLeft />
						Voltar
					</button>
					<button className='btn-primary' onClick={() => setStage(stage + 1)}>
						<FaCheck />
						Confirmar
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartReview;