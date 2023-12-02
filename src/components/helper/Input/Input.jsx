import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, name, type, value, setValue, placeholder, ...props }) => {
	const id = name + new Date().getTime();

	const onChange = ({ target }) => {
		let value = target.value;

		if (type === "cep") {
			value = value
				.replace(/\D/g, '')
				.replace(/(\d{5})(\d)/, '$1-$2')
				.replace(/(-\d{3})\d+?$/, '$1')
		} else if (type === "number") {
			value = value.replace(/\D/g, '');
		}

		setValue(value);
	}

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
					onChange={onChange}
					placeholder={placeholder}
					autoComplete='off'
					{...props}
				/>
			</div>
		</div>
	);
}

export default Input;