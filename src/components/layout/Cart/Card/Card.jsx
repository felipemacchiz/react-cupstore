import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, activeStage, stage }) => {
	const pending = stage < activeStage;
	const active = stage === activeStage;
	const completed = stage > activeStage;

	return (
		<div className={`${styles.card} ${active ? styles.active : styles.collapsed}`}>
			{children}
		</div>
	);
}

export default Card;