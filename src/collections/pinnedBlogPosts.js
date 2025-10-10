import { blogPosts } from './blogPosts.js';

export const pinnedBlogPosts = (collection) => {
	const posts = blogPosts(collection, {
		includeRssOnly: false,
		includePolitics: true,
	});

	return posts
		.filter((p) => p.data.pinned)
		.sort((a, b) => {
			if (a.date > b.date) {
				return 1;
			}
			return -1;
		});
}