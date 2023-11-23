import "./App.css";
import "./assets/styles/animations.css";
import React from "react";
import { GlobalStorage } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Alert from "./components/helper/Alert/Alert";
import ListPage from "./pages/List/ListPage";
import CartPage from "./pages/Cart/CartPage";
import ProductPage from "./pages/Product/ProductPage";

const App = () => {
	return (
		<GlobalStorage>
			<BrowserRouter>
				<Header />
				<Alert />
				<Routes>
					<Route path='' element={<ListPage />} />
					<Route path='carrinho' element={<CartPage />} />
					<Route path='produto/:key' element={<ProductPage />} />
				</Routes>
				{/* <Footer /> */}
			</BrowserRouter>
		</GlobalStorage>
	);
};

export default App;