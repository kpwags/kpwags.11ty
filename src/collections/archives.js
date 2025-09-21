import { getPostType } from '../lib/getPostType.js';
import { getUniqueItems } from '../lib/getUniqueItems.js';
import { blogNotes } from './blogNotes.js';
import { blogPosts } from './blogPosts.js';
import { bookNotes } from './bookNotes.js';
import { readingLogs } from './readingLogs.js';
import { weekNotes } from './weekNotes.js';

export const archives = (collection) => {
	const posts = blogPosts(collection, {
		includeRssOnly: false,
		includePolitics: true,
	});

	const readingLogPosts = readingLogs(collection);

	const weekNotePosts = weekNotes(collection, {
		includePolitics: true,
	});

	const notes = blogNotes(collection, {
		includePolitics: true,
	});

	const books = bookNotes(collection);

	const everything = [
		...posts,
		...readingLogPosts,
		...books,
		...notes,
		...weekNotePosts,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});

	const items = everything.map((e) => ({
		title: getPostType(e.data.tags).css === 'book-note'
			? `${e.data.title}: ${e.data.subtitle}`
			: e.data.title,
		url: e.url,
		year: e.data.postYear,
		month: e.data.postMonth,
		dateString: e.data.shortDateString,
		type: getPostType(e.data.tags),
	}));

	const sortedItems = items.toReversed();

	const uniqueYears = getUniqueItems(items.map((i) => i.year));

	const archivesArray = [];

	for (const year of uniqueYears) {
		archivesArray.push({
			year,
			posts: sortedItems.filter((i) => i.year === year),
		});
	}

	return archivesArray;
};
