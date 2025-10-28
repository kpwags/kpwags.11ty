export const readingLogs = (collection) => {
	const posts = collection
		.getAll()
		.filter((i) => i.data.tags && i.data.tags.includes('readinglog'));

	return posts.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};