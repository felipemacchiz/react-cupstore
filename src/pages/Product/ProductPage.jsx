import React from 'react';
import styles from './ProductPage.module.css';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { PRODUCTS_GET } from '../../api';
import Error from '../../components/helper/Error/Error';
import Loading from '../../components/helper/Loading/Loading';
import StarRating from '../../components/helper/StarRating/StarRating';
import Comment from '../../components/helper/Comment/Comment';
import { FaCheckCircle } from 'react-icons/fa';
import { GlobalContext } from '../../context/GlobalContext';
import Comments from '../../components/helper/Comments/Comments';

const Image = styled.div`
	background: url("${(props) => props.src}") center right;
	background-size: cover;
	height: 240px;
`;

const ProductPage = () => {
	const params = useParams();

    const { data, loading, error, request } = useFetch();

    const global = React.useContext(GlobalContext);

	const addItemLocalStorage = (event) => {
		event.preventDefault();

		global.addItemCart(data[0]);

		global.setAlert({
            icon: <FaCheckCircle />,
            text: `${data[0].title} adicionado ao seu carrinho!`,
        });
	}

	React.useEffect(() => {
        async function fetchProducts() {
            const { url, options } = PRODUCTS_GET({ 
                extra: `key=${params.key}`,
            });

            const { response, json } = await request(url, options);
        }

        fetchProducts();
    }, [params.key, request]);

	if (error) {
        return (
            <Error error={error} />
        );
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    if (data && data.length) {
        return (
            <section className='fullContainer' data-animation='easeInLeft'>
                <div>
                    <Image src={data[0].img} />
                </div>
                <div className={styles.productContainer}>
                    <div className={styles.productHeader}>
                        <h2>{data[0].title}</h2>
                        <p className='price'>R$ {data[0].price}</p>
                    </div>
                    <div>
                        <p>{data[0].description}</p>
                    </div>
                    <div>
                        <button className='btn-primary' onClick={addItemLocalStorage}>Adicione ao seu carrinho!</button>
                    </div>
                    <div>
                        <p className={styles.productIngredients}>Ingredientes: {data[0].ingredients.join(", ")}</p>
                    </div>
                </div>
                <div className={styles.ratingContainer}>
                    <div className={styles.ratingScore}>
                        <p>Avaliações</p>
                        <div className={styles.ratingWrapper}>
                            <p>{data[0].rating}</p>
                            <div>
                                <StarRating rating={data[0].rating} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Comments comments={data[0].comments} />
                    </div>
                </div>
            </section>
        );
    }
    
    return null;
}

export default ProductPage;