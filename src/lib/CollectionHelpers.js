export const getBlogPosts = (collection, includeRssOnly = false, includePolitics = true) => {
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
				if (includePolitics) {
					posts.push(item);
				} else if (!item.data.tags.includes('Politics')) {
					posts.push(item);
				}
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

export const getNotes = (collection, includePolitics = true) => {
	const notes = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('shortnotes')) {
			if (includePolitics || (!includePolitics && !item.data.tags.includes('Politics'))) {
				notes.push(item);
			}
		}
	}

	return notes.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

export const getWeekNotes = (collection, includePolitics = true) => {
	const notes = [];

	const allItems = collection.getAll();

	for (let i = 0; i < allItems.length; i++) {
		const item = allItems[i];

		if (!item.data.tags) {
			continue;
		}

		if (item.data.tags.includes('weeknote')) {
			if (includePolitics || (!includePolitics && !item.data.tags.includes('Politics'))) {
				notes.push(item);
			}
		}
	}

	return notes.sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

// Blog Posts, Week Notes, & Reading Logs
export const getItemsConsideredPosts = (collection, includeRssOnly = false) => {
	const posts = getBlogPosts(collection, includeRssOnly);
	const readingLogs = getReadingLogs(collection);
	const weekNotes = getWeekNotes(collection);

	return [
		...posts,
		...readingLogs,
		...weekNotes,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

export const getEverything = (collection, includeRssOnly = false, includePolitics) => {
	const posts = getBlogPosts(collection, includeRssOnly, includePolitics);
	const readingLogs = getReadingLogs(collection);
	const bookNotes = getBookNotes(collection);
	const notes = getNotes(collection, includePolitics);
	const weekNotes = getWeekNotes(collection, includePolitics);

	return [
		...posts,
		...readingLogs,
		...bookNotes,
		...notes,
		...weekNotes,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

export const getPinnedBlogPosts = (collection) => {
	const posts = getBlogPosts(collection, false);

	return posts.filter((p) => p.data.pinned);
};
