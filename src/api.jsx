export const API_URL = 'https://cupstore-api.onrender.com/api/';

export function PRODUCTS_GET({ page, limit, query, extra }) {
	const params = [];

	(page) && params.push(`_page=${page}`);
	(limit) && params.push(`_limit=${limit}`);
	(query) && params.push(`q=${query}`);
	(extra) && params.push(extra);

	return {
		url: `${API_URL}cupcakes`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}

export function PRODUCT_GET({ key }) {
	return {
		url: `${API_URL}cupcakes/${key}`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}