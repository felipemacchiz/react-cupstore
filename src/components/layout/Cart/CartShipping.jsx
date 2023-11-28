import React from 'react';
import styles from './Cart.module.css';
import GoogleMaps from '../../helper/GoogleMaps/GoogleMaps';
import Input from '../../helper/Input/Input';

const CartShipping = () => {
	const [cep, setCep] = React.useState('');
	const [logradouro, setLogradouro] = React.useState('');
	const [numero, setNumero] = React.useState('');
	const [bairro, setBairro] = React.useState('');

	return (
		<div className={styles.cartResume}>
			<h3>Dados de entrega</h3>
			<div className={styles.form}>
				<Input 
					name="cep" 
					label="CEP" 
					placeholder="Informe seu CEP" 
					value={cep}
					setValue={setCep}
				/>

				<Input 
					name="logradouro" 
					label="Logradouro" 
					placeholder="Informe seu CEP para preencher o logradouro" 
					value={logradouro}
					setValue={setLogradouro}
				/>
				
				<Input 
					name="numero" 
					label="Número" 
					placeholder="Informe seu número" 
					value={numero}
					setValue={setNumero}
				/>

				<Input 
					name="bairro" 
					label="Bairro" 
					placeholder="Informe seu CEP para preencher o bairro" 
					value={bairro}
					setValue={setBairro}
				/>
			</div>

			<br/>

			<div>
				<GoogleMaps center={ { lat: -34.397, lng: 150.644 } } zoom={4}/>
			</div>

			<div>
				<button className='btn-primary'>
					<span>
						Salvar endereço de entrega
					</span>
				</button>
			</div>
		</div>
	);
}

export default CartShipping;