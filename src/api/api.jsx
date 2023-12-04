export const API_URL = 'https://cupstore-api.onrender.com/api/';
// export const API_URL = 'http://localhost:3000/api/';

export function PRODUCTS_GET() {
	return {
		url: `${API_URL}cupcakes`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}

export function PRODUCT_GET(key) {
	return {
		url: `${API_URL}cupcakes/${key}`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}

export function ORDERS_GET() {
	return {
		url: `${API_URL}orders`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}


export function ORDERS_GET_STORED() {
	if (!localStorage.getItem('orders')) {
		return { url: null, options: null };
	}

	return {
		url: `${API_URL}orders?${new URLSearchParams({
			_id: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')).join(',') : '[]',
		})}`,
		options: {
			method: 'GET',
			cache: 'no-store',
		},
	}
}

export function ORDER_GET(id) {
	return {
		url: `${API_URL}orders/${id}`,
		options: {
			method: 'GET',
			cache: 'no-store'
		}
	}
}

export function ORDER_POST(body) {
	return {
		url: `${API_URL}orders`,
		options: {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	}
}

export function ORDER_PUT(id, body) {
	return {
		url: `${API_URL}orders/${id}`,
		options: {
			method: 'PUT',
		},
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	}
}