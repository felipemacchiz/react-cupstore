import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, name, value, setValue, placeholder }) => {
	const id = name + new Date().getTime;

	return (
		<div className={styles.inputWrapper}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>

			<div>
				<input
					className={styles.input}
					id={id}
					name={name}
					value={value}
					onChange={({ target }) => setValue(target.value)}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}

export default Input;