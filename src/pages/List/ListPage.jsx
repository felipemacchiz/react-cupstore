import React from 'react';
import styles from "../../components/layout/List/List.module.css"
import List from '../../components/layout/List/List';
import SearchBar from '../../components/helper/SearchBar/SearchBar';
import { FaThLarge, FaThList } from "react-icons/fa";
import Banner from '../../components/layout/Banner/Banner';

const ListPage = () => {
    const [search, setSearch] = React.useState('');
    const [listStyle, setListStyle] = React.useState(localStorage.getItem('listStyle') || 'grid');

    React.useEffect(() => {
        if (window.location.pathname !== "/") {
            window.location.pathname = "/";
        }
    }, []);

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
		<div>
            <div className='fullContainer' data-animation='easeInLeft'>
                <Banner />
            </div>

            <section className='container' data-animation='easeInLeft'>
                <div className={styles.header}>
                    <h2 className='font-lobster'>Cupcakes</h2>
                    <div className={styles.headerFilterArea}>
                        {/* <SearchBar search={search} setSearch={setSearch} /> */}
                        <button className='btn-secondary' onClick={changeListClass}>
                            {(listStyle === 'grid') ? <FaThList /> : <FaThLarge /> }
                        </button>
                    </div>
                </div>
                <List query={search} listClass={listStyle} />
            </section>
        </div>
    );
}

export default ListPage;