module.exports = (collection) => {
	const publicPosts = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('readinglog')) {
			publicPosts.push(item);
		}

		if (item.data.tags.includes('post') && (item.data.rss_only ?? false) === false) {
			publicPosts.push(item);
		}
	}

	return publicPosts.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		}
		return -1;
	});
};
