import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch }) => {
	return (
		<div className={styles.searchField}>
			<FaSearch />
			<input 
				type='text' 
				onChange={({ target }) => setSearch(target.value)} 
				value={search} 
				placeholder='Procurar'
			/>
		</div>
	);
}

export default SearchBar;