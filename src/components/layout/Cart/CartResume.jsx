import React from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { FaXmark } from "react-icons/fa6";

const CartResume = () => {
	const global = React.useContext(GlobalContext);
	const data = global.cart;
	const groupedData = Array.from(new Set(data));

	console.log(groupedData);

	return (
		<div>
			<h3>Resumo do pedido</h3>
			<div>
				<div>
					<ul>
						{groupedData.map((item, index) => (
							<li key={index}>
								<span>{item.title}</span>
								<span> (×{data.filter(i => i.id === item.id).length})</span>
								<span> - R${data.reduce((total, i) => total + i.price, 0)}</span>
							</li>
						))}
					</ul>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default CartResume;