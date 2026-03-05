export const formatDate = (d = null, format = 'YYYY-MM-DD') => {
	const date = d ?? new Date();

	const month = (date.getMonth() + 1).toString();
	const day = date.getDate().toString();
	const year = date.getFullYear();

	switch (format) {
		case 'YYYY-MM-DD':
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

		default:
			return 'Unknown Format';
	}
}

export const getDate = (d = null) => {
	const today = d ?? new Date();

	return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}T${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:00.000Z`;
};