import React from 'react';
import styles from './Card.module.css';
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const CardTitle = ({ activeStage, stage, completedTitle, title }) => {
	const pending = stage < activeStage;
	const active = stage === activeStage;
	const completed = stage > activeStage;

	return (
		<h3 className={`${styles.cardTitle} ${completed ? styles.completedTitle : pending ? styles.pendingTitle : ''}`}>
			{completed ? <FaCheckCircle className={styles.icon} /> : <FaRegCircle className={styles.icon} />}
			{completed ? completedTitle : title}
		</h3>
	);
}

export default CardTitle;