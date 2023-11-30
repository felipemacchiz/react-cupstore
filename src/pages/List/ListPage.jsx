import React from 'react';
import styles from "../../components/layout/List/List.module.css"
import List from '../../components/layout/List/List';
import SearchBar from '../../components/helper/SearchBar/SearchBar';
import { FaThLarge, FaThList } from "react-icons/fa";

const ListPage = () => {
    const [search, setSearch] = React.useState('');
    const [listStyle, setListStyle] = React.useState(localStorage.getItem('listStyle') || 'grid');

    const changeListClass = () => {
        if (listStyle === 'grid') {
            setListStyle('list');
            localStorage.setItem('listStyle', 'list');
        } else {
            setListStyle('grid');
            localStorage.setItem('listStyle', 'grid');
        }
    }

    return (
		<section className='container content' data-animation='easeInLeft'>
			<div className={styles.header}>
                <h2 className={styles.title}>Cupcakes</h2>
                <div className={styles.headerFilterArea}>
                    <SearchBar search={search} setSearch={setSearch} />
                    <button className='btn-secondary' onClick={changeListClass}>
                        {(listStyle === 'grid') ? <FaThList /> : <FaThLarge /> }
                    </button>
                </div>
            </div>
			<List query={search} listClass={listStyle} />
		</section>
    );
}

export default ListPage;