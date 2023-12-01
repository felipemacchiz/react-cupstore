import React from 'react';
import styles from './Alert.module.css';
import { GlobalContext } from '../../../context/GlobalContext';

const Alert = () => {
	const alertRef = React.useRef();
	const { alert, setAlert } = React.useContext(GlobalContext);

	const closeAlert = React.useCallback(() => {
		setTimeout(() => setAlert(null), 4200);

		if (alertRef.current)
			alertRef.current.dataset.animation = "easeOutRight";
	}, [setAlert]);

	React.useEffect(() => {
		setTimeout(closeAlert, 4000);
	}, [closeAlert]);

	if (alert) {
		return (
			<div ref={alertRef} className={styles.alert} data-animation="easeInRight" onClick={closeAlert}>
				<div className={styles.iconWrapper}>
					{alert.icon || null}
				</div>
				<span>
					{alert.text}
				</span>
			</div>
		);
	} else {
		return null;
	}
}

export default Alert;