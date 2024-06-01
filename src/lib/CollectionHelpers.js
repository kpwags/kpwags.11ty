export const getBlogPosts = (collection, includeRssOnly = false) => {
	const posts = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('post')) {
			const isRssOnly = item.data.rss_only ?? false;

			if (includeRssOnly || !isRssOnly) {
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

export const getReadingLogs = (collection) => {
	const readingLogs = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('readinglog')) {
			readingLogs.push(item);
		}
	}

	return readingLogs.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

export const getBookNotes = (collection) => {
	const bookNotes = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('booknotes')) {
			bookNotes.push(item);
		}
	}

	return bookNotes.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};


export const getNotes = (collection) => {
	const notes = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('shortnotes')) {
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

export const getBlogPostsAndReadingLogs = (collection, includeRssOnly = false) => {
	const posts = getBlogPosts(collection, includeRssOnly);
	const readingLogs = getReadingLogs(collection);

	return [
		...posts,
		...readingLogs,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

export const getEverything = (collection, includeRssOnly = false) => {
	const posts = getBlogPosts(collection, includeRssOnly);
	const readingLogs = getReadingLogs(collection);
	const bookNotes = getBookNotes(collection);
	const notes = getNotes(collection);

	return [
		...posts,
		...readingLogs,
		...bookNotes,
		...notes,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};
