export const rssPostTitle = (post) => {
	if (post.data.spoilers) {
		return `${post.data.title} [BEWARE SPOILERS]`;
	}

	if (post.data.tags.includes('booknotes')) {
		return `Book Notes for ${post.data.title}: ${post.data.subtitle}`;
	}
	
	return post.data.title;
};
