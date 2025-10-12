export const tagFilter = (tags) => {
	return tags.filter((t) => !['post', 'readinglog', 'shortnotes', 'weeknote'].includes(t))
};
