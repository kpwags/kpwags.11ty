exports.getBlogPosts = (collection, includeRssOnly = false) => {
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

exports.getReadingLogs = (collection) => {
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

exports.getBookNotes = (collection) => {
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

exports.getBlogPostsAndReadingLogs = (collection, includeRssOnly = false) => {
	const posts = this.getBlogPosts(collection, includeRssOnly);
	const readingLogs = this.getReadingLogs(collection);

	return allPosts = [
		...posts,
		...readingLogs,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};

exports.getEverything = (collection, includeRssOnly = false) => {
	const posts = this.getBlogPosts(collection, includeRssOnly);
	const readingLogs = this.getReadingLogs(collection);
	const bookNotes = this.getBookNotes(collection);

	return allPosts = [
		...posts,
		...readingLogs,
		...bookNotes,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};
