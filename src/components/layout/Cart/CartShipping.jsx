import React from 'react';
import styles from './Cart.module.css';
import GoogleMaps from '../../helper/GoogleMaps/GoogleMaps';
import Input from '../../helper/Input/Input';
import { CEP_GET } from '../../../api/viacep';
import useFetch from '../../../hooks/useFetch';
import Error from '../../helper/Error/Error';
import { fromAddress, setKey } from 'react-geocode';
import { GlobalContext } from '../../../context/GlobalContext';
import CardTitle from './Card/CardTitle';
import CardContent from './Card/CardContent';
import Card from './Card/Card';
import { FaArrowUp, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { json } from 'react-router-dom';


const CartShipping = ({ activeStage, stage, setStage }) => {
	const global = React.useContext(GlobalContext);

	const [coordinates, setCoordinates] = React.useState(null);

	const [cep, setCep] = React.useState('');
	const [respCep, setRespCep] = React.useState('');
	const [logradouro, setLogradouro] = React.useState('');
	const [numero, setNumero] = React.useState('');
	const [bairro, setBairro] = React.useState('');
	const [cidade, setCidade] = React.useState('');
	const [uf, setUf] = React.useState('');
	const [address, setAddress] = React.useState('');

	const { loading, error, request } = useFetch();

	setKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

    React.useEffect(() => {
        async function fetchCep() {
			if (cep && cep.length === 9) {
				const { url, options } = CEP_GET({ 
					cep: `${cep}`.replace(/\D/g, ''),
				});
				
				const { response, json } = await request(url, options);

				if (response.ok) {
					setRespCep(json.cep);
					setLogradouro(json.logradouro);
					setBairro(json.bairro);
					setCidade(json.localidade);
					setUf(json.uf);
				}
			} else {
				setRespCep('');
				setLogradouro('');
				setBairro('');
				setCidade('');
				setUf('');
			}
        }

        fetchCep();
    }, [request, cep]);

	React.useEffect(() => {
		if (logradouro && bairro && numero) {
			setAddress(`${logradouro}, ${numero} - ${bairro} ${cidade || ''} ${uf ? `/ ${uf}` : ''}`);
		}
	}, [logradouro, bairro, numero, uf, cidade]);

	React.useEffect(() => {
		async function getCoordinates() {
			const { results, status } = await fromAddress(address);

			if (status === 'OK') {
				setCoordinates(results[0].geometry.location);
			}
		}

		if (address)
			getCoordinates();
	}, [address]);

	const confirmLocation = () => {
		if (address) {
			setStage(stage + 1);
		} else {
			global.setAlert({
				icon: <FaExclamationCircle />,
				text: "Endereço inválido",
			});
		}
	}

	return (
		<Card activeStage={activeStage} stage={stage}>
			<CardTitle 
				activeStage={activeStage} 
				stage={stage} 
				title={'Confirme o endereço de entrega'} 
				completedTitle={'Endereço confirmado!'} 
			/>

			<CardContent activeStage={activeStage} stage={stage}>
				<div className={styles.form}>
					<div className={styles.fields}>
						<Input 
							name="cep" 
							label="CEP"
							type="cep" 
							placeholder="Informe seu CEP" 
							value={cep}
							setValue={setCep}
						/>

						<Input 
							name="numero" 
							label="Número" 
							type="number"
							placeholder="Informe seu número" 
							value={numero}
							setValue={setNumero}
						/>
					</div>

					<div className={styles.cartAddress}>
						<div>
							{logradouro && <span>{logradouro}</span>}
							{numero && <span>, {numero}</span>}
							{bairro && <span> - {bairro}</span>}
						</div>
						<div>
							{cidade && <span>{cidade}</span>}
							{uf && <span> - {uf}</span>}
							{respCep && <span>, {respCep}</span>}
						</div>
					</div>
				</div>

				<br/>

				<div>
					<GoogleMaps center={coordinates} marker={coordinates} zoom={4}/>
				</div>

				<div className={styles.actions}>
					<button className='btn-outline' onClick={() => setStage(stage - 1)}>
						<FaArrowUp />
						Voltar
					</button>
					
					<button className='btn-primary' onClick={confirmLocation}>
						<FaCheck />
						Confirmar
					</button>
				</div>
			</CardContent>
		</Card>
	);
}

export default CartShipping;