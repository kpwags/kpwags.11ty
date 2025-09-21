export const blogPosts = (collection, opts) => {
	const {
		includeRssOnly = false,
		includePolitics = true
	} = opts;

	const blogPosts = collection
		.getAll()
		.filter((i) => i.data.tags && i.data.tags.includes('post'));

	const posts = [];

	for (let i = 0; i < blogPosts.length; i++) {
		const item = blogPosts[i];

		const isRssOnly = item.data.rss_only ?? false;

		if (includeRssOnly || !isRssOnly) {
			if (includePolitics) {
				posts.push(item);
			} else if (!item.data.tags.includes('Politics')) {
				posts.push(item);
			}
		}
	}

	return posts.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};