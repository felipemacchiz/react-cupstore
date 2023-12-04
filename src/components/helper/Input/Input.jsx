import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, name, type, value, setValue, placeholder, limit, ...props }) => {
	const id = name + new Date().getTime();

	const onChange = ({ target }) => {
		let value = target.value;

		if (type === "cep") {
			value = value
				.replace(/\D/g, '')
				.replace(/(\d{5})(\d)/, '$1-$2')
				.replace(/(-\d{3})\d+?$/, '$1')
		} 
		
		else if (type === "number") {
			value = value.replace(/\D/g, '');
		}

		else if (type === "credit-card") {
			const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
			const onlyNumbers = value.replace(/[^\d]/g, '');

			value = onlyNumbers.substr(0, 16).replace(regex, (regex, $1, $2, $3, $4) =>
				[$1, $2, $3, $4].filter(group => !!group).join(' ')
			);
		}

		else if (type === "date") {
			const regex = /^(\d{0,2})(\d{0,2})$/g;
			const onlyNumbers = value.replace(/[^\d]/g, '');

			value = onlyNumbers.substr(0, 4).replace(regex, (regex, $1, $2) =>
				[$1, $2].filter(group => !!group).join('/')
			);
		}

		else if (type === "uppertext") {
			value = value.toUpperCase();
		}

		else if (type === "lowertext") {
			value = value.toLowerCase();
		}

		if (limit) {
			value = value.substr(0, limit);
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