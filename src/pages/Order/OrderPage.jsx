import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ORDER_GET } from '../../api/api';
import { dateDiff } from '../../commom';
import Card from '../../components/layout/Card/Card';
import Order from './Order';

const OrderPage = () => {
	const params = useParams();

    const { data, loading, error, request } = useFetch();

	React.useEffect(() => {
        async function fetchOrder() {
            const { url, options } = ORDER_GET(params.id);

            await request(url, options);
        }

        fetchOrder();
    }, [params.id, request]);

	if (data) {	
		return (
			<div className='container content' data-animation='easeInLeft'>
				<Card>
					{data[0] && <Order order={data[0]} />}
				</Card>
			</div>
		);
	}
	
	return null;
}

export default OrderPage;