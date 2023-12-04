import React from 'react'
import styles from './Banner.module.css';

const Banner = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.content}>
				<h1 className='font-lobster'>Bem-vindos ao nosso cantinho dos cupcakes!</h1>

				<p>Estamos muito felizes em recebê-los aqui! Estamos repletos de delícias e sabores irresistíveis! Aqui, você encontrará os mais variados tipos de cupcakes, feitos com muito carinho e dedicação!</p>
			</div>
		</div>
	);
}

export default Banner;