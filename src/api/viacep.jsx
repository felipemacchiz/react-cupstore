export const API_URL = 'https://opencep.com/v1/';

export function CEP_GET({ cep }) {
	return {
		url: `${API_URL}${cep}`,
		options: {
			method: 'GET',
		}
	}
}
