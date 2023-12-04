import React from 'react';
import styles from './Payment.module.css';
import Input from '../../components/helper/Input/Input';

const CreditCardForm = ({ setCredentials }) => {
	const [creditCard, setCreditCard] = React.useState('');
	const [name, setName] = React.useState('');
	const [expirationDate, setExpirationDate] = React.useState('');
	const [cvv, setCvv] = React.useState('');

	React.useEffect(() => {
		if (creditCard.length === 19 && name && expirationDate.length === 5 && cvv.length === 3) {
			setCredentials(true);
		}
	});

	return (
		<div className={styles.form} data-animation="easeInLeft">
			<div className={styles.formRow}>
				<Input
					label="Número do cartão"
					name="anynumber"
					type="credit-card"
					value={creditCard}
					setValue={setCreditCard}
					placeholder="0000 0000 0000 0000"
				/>
			</div>

			<div className={styles.formRow}>
				<Input
					label="Nome no cartão"
					name="name"
					type="uppertext"
					value={name}
					setValue={setName}
					placeholder="Digite seu nome"
				/>
			</div>

			<div className={styles.formRow}>
				<Input
					label="Data de vencimento"
					name="anydate"
					type="date"
					value={expirationDate}
					setValue={setExpirationDate}
					placeholder="Digite a data de vencimento do seu cartão"
				/>

				<Input
					label="CVV"
					name="anynumericnumbers"
					type="password"
					limit={3}
					value={cvv}
					setValue={setCvv}
					placeholder="Digite os 3 números que aparecem atrás do seu cartão"
				/>
			</div>

			<p className='text-gray'>
				* Os dados não são enviados a lugar nenhum<br/>
				* Os dados não precisam ser reais
			</p>
		</div>
	);
}

export default CreditCardForm