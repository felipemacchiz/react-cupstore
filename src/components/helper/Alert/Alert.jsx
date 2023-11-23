import React from 'react';
import styles from './Alert.module.css';
import { GlobalContext } from '../../../context/GlobalContext';

const Alert = () => {
	const alertRef = React.useRef();
	const global = React.useContext(GlobalContext);

	const closeAlert = React.useCallback(() => {
		setTimeout(() => global.setAlert(null), 4200);

		if (alertRef.current)
			alertRef.current.dataset.animation = "easeOutRight";
	}, [global]);

	React.useEffect(() => {
		setTimeout(closeAlert, 4000);
	}, [closeAlert]);

	if (global.alert) {
		return (
			<div ref={alertRef} className={styles.alert} data-animation="easeInRight" onClick={closeAlert}>
				<div className={styles.iconWrapper}>
					{global.alert.icon || null}
				</div>
				<span>
					{global.alert.text}
				</span>
			</div>
		);
	} else {
		return null;
	}
}

export default Alert;