export const API_URL = 'https://viacep.com.br/ws/';

export function CEP_GET({ cep }) {
	return {
		url: `${API_URL}${cep}/json`,
		options: {
			method: 'GET',
		}
	}
}
