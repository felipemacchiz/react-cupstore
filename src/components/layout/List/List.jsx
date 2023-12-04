import React from 'react';
import styles from './List.module.css';
import useFetch from '../../../hooks/useFetch';
import { PRODUCTS_GET } from '../../../api/api';
import Error from '../../helper/Error/Error';
import Loading from '../../helper/Loading/Loading';
import Item from './Item';

const List = ({ query, listClass }) => {
    const { data, loading, error, request } = useFetch();

    React.useEffect(() => {
        async function fetchProducts() {
            const { url, options } = PRODUCTS_GET();

            const { response, json } = await request(url, options);
        }

        fetchProducts();
    }, [request, query]);

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
            <div>
                <ul className={`${listClass === 'grid' ? styles.listStyleGrid : styles.listStyleList}`} data-animation='easeInLeft' >
                    {data.map((item, index) => <Item key={index} data={item} />)}
                </ul>
            </div>
        );
    }
    
    return null;
}

export default List;