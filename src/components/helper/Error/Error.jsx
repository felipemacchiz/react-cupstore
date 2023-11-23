import React from 'react';
import styles from './Error.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const Error = ({ error }) => {
	return (
		<p className={styles.error}>
			<FaExclamationTriangle className={styles.icon} />
			<span>{error}</span>
		</p>
	);
}

export default Error;