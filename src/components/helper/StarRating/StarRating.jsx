import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
	const stars = [];

	for (let i = 1; i <= 5; i++) {
		if (rating >= i) {
			stars.push(1);
		} else if (Math.ceil(rating) === i) {
			stars.push(0.5);
		} else {
			stars.push(0);
		}
	}

	return (stars.map((star, index) => {
		if (star === 1) 
			return <FaStar key={index} />;
		else if (star === 0.5)
			return <FaStarHalfAlt key={index} />;
		else
			return <FaRegStar key={index} />;
	}));
}

export default StarRating;