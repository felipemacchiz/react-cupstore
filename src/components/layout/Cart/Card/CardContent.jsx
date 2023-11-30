import React from 'react';
import styles from './Card.module.css';

const CardContent = ({ children, activeStage, stage }) => {
	const pending = stage < activeStage;
	const active = stage === activeStage;
	const completed = stage > activeStage;
	
	return (
		<div className={`${styles.cardContent} ${active ? styles.cardActive : completed ? styles.cardCollapsed : ''}`}>
			{children}
		</div>
	);
}

export default CardContent