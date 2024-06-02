export const bookNoteTitlePrefix = (post) => {
	if (post.data.tags.includes('booknotes')) {
		return `Book Notes for ${post.data.title}`;
	}

	return post.data.title;
}