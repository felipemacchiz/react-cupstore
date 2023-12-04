import React from 'react';
import styles from './Loading.module.css';
import { FaHourglassStart, FaHourglassHalf, FaHourglassEnd } from "react-icons/fa";

const Loading = ({ text }) => {
	const [level, setLevel] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (level === 2)
				setLevel(0);
			else
				setLevel(level + 1);
		}, 800);

		return () => clearInterval(interval);
	}, [level]);

	return (
		<div className={styles.loading}>
			{level === 0 && <FaHourglassStart className={styles.icon} />}
			{level === 1 && <FaHourglassHalf className={styles.icon} />}
			{level === 2 && <FaHourglassEnd className={`${styles.icon} ${styles.loadEndAnimation}`} />}
			<span className={styles.text}>
				{text || 'Carregando...'}
			</span>
		</div>
	);
}

export default Loading;