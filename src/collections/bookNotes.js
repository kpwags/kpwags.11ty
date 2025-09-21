export const bookNotes = (collection) => {
	const bookNotes = collection
		.getAll()
		.filter((i) => i.data.tags && i.data.tags.includes('booknotes'));

	return bookNotes.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};
