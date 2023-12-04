import React from 'react';
import styles from './Cart.module.css';
import { FaSadTear } from 'react-icons/fa';
import { GlobalContext } from '../../../context/GlobalContext';
import CartResume from './CartResume';
import CartHeader from './CartHeader';
import CartShipping from './CartShipping';
import CartReview from './CartReview';

const Cart = () => {
	const global = React.useContext(GlobalContext);
	const [stage, setStage] = React.useState(1);

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

				<div className={styles.cardsContainer}>
					<CartReview 
						activeStage={1} 
						stage={stage} 
						setStage={setStage} 
					/>

					<CartShipping 
						activeStage={2} 
						stage={stage} 
						setStage={setStage}
					/>
					
					<CartResume 
						activeStage={3} 
						stage={stage} 
						setStage={setStage} 
					/>
				</div>
				
			</div>
		);
	}
}

export default Cart;