import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
	const storedCart = localStorage.getItem('cart');

	const [alert, setAlert] = React.useState(null);
	const [cart, setCart] = React.useState([]);
	const [distance, setDistance] = React.useState(null);
	
	const addItemCart = (item) => {	
		const storedCart = cart || [];

		storedCart.push(item);

		setCart(storedCart);

		localStorage.setItem('cart', JSON.stringify(storedCart));
	}

	const deleteCart = () => {
		setCart([]);

		localStorage.setItem('cart', '[]');
	}

	const deleteItemCart = (index) => {
		const updatedCart = [...cart];

		updatedCart.splice(index, 1);

		setCart(updatedCart);

		localStorage.setItem('cart', JSON.stringify(updatedCart));
	}

	React.useEffect(() => {
		if (localStorage.getItem('cart').length)
			setCart(JSON.parse(localStorage.getItem('cart')));
	}, []);

	return (
		<GlobalContext.Provider value={{
			alert, 
			setAlert,
			cart, 
			setCart,
			addItemCart,
			deleteCart,
			deleteItemCart,
			distance,
			setDistance,
		}}>
			{children}
		</GlobalContext.Provider>
	);
};