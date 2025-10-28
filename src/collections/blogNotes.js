export const blogNotes = (collection, opts) => {
	const {
		includePolitics = true,
	} = opts;

	const posts = collection
		.getAll()
		.filter((i) => i.data.tags && i.data.tags.includes('shortnotes'));

	const notes = [];

	for (let i = 0; i < posts.length; i++) {
		const item = posts[i];

		if (includePolitics || (!includePolitics && !item.data.tags.includes('Politics'))) {
			notes.push(item);
		}
	}

	return notes.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};