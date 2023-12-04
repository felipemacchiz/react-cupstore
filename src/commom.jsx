export function currencyFormat(number) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(number);
}

export function dateFormat(date) {
	return new Date(date).toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' }) + " às " + new Date(date).toLocaleString("pt-BR", { hour12: false, hour: '2-digit', minute:'2-digit' });
}

export function dateDiff(date1, date2) {
	return Math.abs(date2 - date1) / 1000;
}