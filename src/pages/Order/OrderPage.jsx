import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const OrderPage = () => {
	const params = useParams();

    const { data, loading, error, request } = useFetch();

	return (
		<div>
			Teste
		</div>
	);
}

export default OrderPage;