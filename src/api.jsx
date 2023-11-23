export const API_URL = 'http://localhost:3000/';

export function PRODUCTS_GET({ page, limit, query, extra }) {
	const params = [];

	(page) && params.push(`_page=${page}`);
	(limit) && params.push(`_limit=${limit}`);
	(query) && params.push(`q=${query}`);
	(extra) && params.push(extra);

	return {
		url: `${API_URL}products?${params.join('&')}`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}

export function PRODUCT_GET({ id }) {
	return {
		url: `${API_URL}products/${id}`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}