import React from 'react';
import styles from "../../components/layout/List/List.module.css"
import List from '../../components/layout/List/List';
import SearchBar from '../../components/helper/SearchBar/SearchBar';
import { FaFilter, FaThLarge } from "react-icons/fa";

const ListPage = () => {
    const [search, setSearch] = React.useState('');

    return (
		<section className='container content' data-animation='easeInLeft'>
			<div className={styles.header}>
                    <h2 className={styles.title}>Cupcakes</h2>
                    <div className={styles.headerFilterArea}>
                        <SearchBar search={search} setSearch={setSearch} />
                        <button className={styles.filterButton}>
                            <FaThLarge />
                        </button>
                        <button className={styles.filterButton}>
                            <FaFilter />
                            Filtrar
                        </button>
                    </div>
                </div>
			<List query={search} />
		</section>
    );
}

export default ListPage;