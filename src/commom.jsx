export function currencyFormat(number) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(number);
}

export function dateFormat(date) {
	return new Date(date).toLocaleString();
}

export function dateDiff(date1, date2) {
	return Math.abs(date2 - date1) / 1000;
}