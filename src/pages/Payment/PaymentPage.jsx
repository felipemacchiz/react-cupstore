import React from 'react';
import styles from './Payment.module.css';
import Card from '../../components/layout/Card/Card';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ORDER_GET, ORDER_PUT } from '../../api/api';
import Loading from '../../components/helper/Loading/Loading';
import CreditCardForm from './CreditCardForm';
import { FaCircleCheck, FaPix, FaX } from "react-icons/fa6";
import { FaCheck, FaCreditCard } from "react-icons/fa";
import { currencyFormat, dateFormat } from '../../commom';

const PaymentPage = () => {
	const params = useParams();

	let order;

	const [method, setMethod] = React.useState('debit');
	const [processing, setProcessing] = React.useState(false);
	const [completed, setCompleted] = React.useState(false);
	const [credentials, setCredentials] = React.useState(false);

    const { data, loading, error, request } = useFetch();

	async function cancelOrder() {
		if (order?._id) {
			const { url, options } = ORDER_PUT(order?._id, {
				canceled: true,
				canceledTime: new Date().toISOString(),
			});

			await request(url, options);
		}
	}

	React.useEffect(() => {
        async function fetchOrder() {
            const { url, options } = ORDER_GET(params.id);

            await request(url, options);
        }

        fetchOrder();
    }, [params.id, request]);

	React.useEffect(() => {
		if (processing) {
			const timeout = setTimeout(() => {
				setCompleted(true);
				setProcessing(false);
			}, 4000);
	
			return () => clearTimeout(timeout);
		}	
	}, [processing]);

	React.useEffect(() => {
		async function updateOrder() {
			const { url, options } = ORDER_PUT(order?._id, {
				paid: true,
				paidTime: new Date().toISOString(),
			});

			await request(url, options);
		}

		if (completed && order?._id) {
			updateOrder();
		}
	}, [completed, order?._id, request]);

	if (loading) {
		return (
			<div className='container content'>
				<Loading />
			</div>
		);
	}

	if (!data) {
		return null;
	}

	order = data[0] || data;

	if (order) {
		if (order.canceled) {
			return (
				<div className='container content'>
					<Card>
						<h3>O pedido #{order._id.replace(/\D/g, '')} foi cancelado</h3>

						<br />

						<Link className='btn-primary' to={`/`}>Voltar para página incial</Link>			
					</Card>
				</div>
			);
		}
	
		if (processing) {
			return (
				<div className='container content'>
					<Card>
						<Loading text={"Processando pagamento"} />
					</Card>
				</div>
			);
		}
	
		if (completed) {
			return (
				<div className='container content'>
					<Card>
						<h3 className={styles.title}>
							<FaCircleCheck />

							<span>
								O pagamento do pedido #{order._id.replace(/\D/g, '')} foi concluído com sucesso!
							</span>
						</h3>

						<br/>
	
						<Link className='btn-primary' to={`/pedido/${order._id}`}>Ir para página do pedido</Link>
					</Card>
				</div>
			);
		}
	
		if (order.paid) {
			return (
				<div className='container content'>
					<Card>
						<h3 className={styles.title}>
							<FaCircleCheck />

							<span>
								O pedido #{order._id.replace(/\D/g, '')} já foi pago!
							</span>
						</h3>

						<br/>
	
						<Link className='btn-primary' to={`/pedido/${order._id}`}>Ir para página do pedido</Link>
					</Card>
				</div>
			);
		}
	
		return (
			<div className='container content'>
				<Card>
					<h3>Qual vai ser a forma de pagamento?</h3>
					<p className='text-gray'>Pedido #{order._id.replace(/\D/g, '')}</p>
	
					<div>
						<p>Pedido feito em: {dateFormat(order.orderTime)}</p>
						<p>Valor a ser pago: {currencyFormat(order.totalPrice)}</p>
					</div>
	
					<div>
						<ul className={styles.paymentMethodList}>
							<li className={`${styles.paymentMethodButton} ${method === 'debit' && styles.active}`} onClick={() => setMethod('debit')}>
								<FaCreditCard />
								Cartão de débito
							</li>
	
							<li className={`${styles.paymentMethodButton} ${method === 'credit' && styles.active}`} onClick={() => setMethod('credit')}>
								<FaCreditCard />
								Cartão de crédito
							</li>
							
							{/* <li className={`${styles.paymentMethodButton} ${method === 'pix' && styles.active}`} onClick={() => setMethod('pix')}>
								<FaPix />
								Pix
							</li> */}
						</ul>
	
						<div>
							{method === 'debit' && <CreditCardForm credentials={credentials} setCredentials={setCredentials} />}
							{method === 'credit' && <CreditCardForm credentials={credentials} setCredentials={setCredentials} />}
						</div>
	
						<div className={styles.actions}>
							<button className='btn-outline' onClick={cancelOrder}>
								<FaX />
								Cancelar pedido
							</button>
	
							<button className='btn-primary' disabled={!credentials} onClick={() => setProcessing(true)}>
								<FaCheck />
								Confirmar pagamento
							</button>
						</div>
					</div>
				</Card>
			</div>
		);
	}
	
	return null;
}

export default PaymentPage;