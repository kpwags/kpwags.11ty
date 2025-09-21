export const getPostType = (tags) => {
	if (tags.includes('readinglog')) {
		return { name: 'Reading Log', css: 'reading-log' };
	}

	if (tags.includes('shortnotes')) {
		return { name: 'Note', css: 'note' };
	}

	if (tags.includes('weeknote')) {
		return { name: 'Week Note', css: 'week-note' };
	}

	if (tags.includes('booknotes')) {
		return { name: 'Book Note', css: 'book-note' };
	}

	return { name: 'Post', css: 'post' };
}