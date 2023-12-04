import React from 'react';
import styles from './Order.module.css';
import useFetch from '../../hooks/useFetch';
import { ORDERS_GET_STORED } from '../../api/api';
import Loading from '../../components/helper/Loading/Loading';
import Error from '../../components/helper/Error/Error';
import { dateDiff, dateFormat } from '../../commom';
import { FaFileAlt } from 'react-icons/fa';

const OrderListPage = () => {
    const { data, loading, error, request } = useFetch();

	React.useEffect(() => {
        async function fetchOrders() {
            const { url, options } = ORDERS_GET_STORED();

			if (url && options)
				await request(url, options);
        }

        fetchOrders();
    }, [request]);

	if (error) {
        return (
            <Error error={error} />
        );
    }

    if (loading && !data) {
        return (
            <Loading />
        );
    }

	if (data) {
        return (
            <div className='container content' data-animation='easeInLeft'>
				<h2 className='font-lobster'>Pedidos</h2>

                <ul className={styles.orderList} data-animation='easeInLeft' >
                    {data.map((order, index) => {
						let status;

						if (order.canceled)
							status = "Pedido cancelado";
						else if (!order.paid)
							status = "Aguardando pagamento...";
						else if (dateDiff(new Date(order.paidTime), new Date()) / 60 < 5)
							status = "Preparando pedido...";
						else if (dateDiff(new Date(order.paidTime), new Date()) < order.duration / 1000 + 5)
							status = "Saiu para entrega...";
						else if (!order.concluded)
							status = "Seu pedido chegou!";
						else 
							status = "Pedido concluído!";

						return (
							<li className={styles.orderItem} key={index}>
								<div className={styles.orderIcon}>
									<FaFileAlt />
								</div>
	
								<div className={styles.orderInfo}>
									<div>
										<h4>Pedido #{order._id.replace(/\D/g, "")}</h4>
	
										<div>
											<span>{status}</span>
										</div>
									</div>
	
									<div>
										<span className='text-gray'>
											{dateFormat(order.orderTime)}
										</span>
									</div>
								</div>
							</li>
						);
					})}
                </ul>
            </div>
        );
    }

	return (
		<div>
			<div>
				<p>Você não tem pedidos!</p>
			</div>
		</div>
	);
}

export default OrderListPage;