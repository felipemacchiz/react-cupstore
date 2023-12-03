import React from 'react';
import styles from './List.module.css';
import styled from 'styled-components';
import { FaCartPlus, FaCheckCircle, FaPlus  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalContext';

const Image = styled.div`
	background: url("${(props) => props.src}") center center;
	background-size: cover;
	height: 100%;
	border-radius: 8px
`;

const Item = ({ data }) => {
	const global = React.useContext(GlobalContext);
	const navigator = useNavigate();

	const addItemLocalStorage = (event) => {
		event.preventDefault();

		global.addItemCart(data);

		global.setAlert({
			icon: <FaCheckCircle />,
			text: `${data.title} adicionado ao seu carrinho!`,
		});
	}

	const handleCardClick = (event) => {
		if (event.target.classList.contains('btn-primary'))
			return;

		navigator(`/produto/${data.key}`);
	}

	return (
		<li className={styles.item} onClick={handleCardClick}>
			<div className={styles.imgWrapper} >
				<Image src={data.img} alt={data.title} />
			</div>

			<div className={styles.infoWrapper}>
				<div>
					<p className={styles.title}>{data.title}</p>
					<p className='price'>R$ {data.price}</p>
					<p className={styles.description}>{data.description}</p>
				</div>

				<button className={`btn-primary ${styles.addBtn}`} onClick={addItemLocalStorage}>
					<span className={`${styles.btnIcon} ${styles.iconPlus}`}>
						<FaPlus />
					</span>
					<span className={`${styles.btnIcon} ${styles.iconCartPlus}`}>
						<FaCartPlus />
					</span>

					<span className={styles.btnText}>Carrinho</span>
				</button>
			</div>
		</li>
	);
}

export default Item;