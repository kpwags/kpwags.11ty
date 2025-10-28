import { excludedTags } from '../lib/excludedTags.js';
import { getUniqueItems } from '../lib/getUniqueItems.js';
import { blogNotes } from './blogNotes.js';
import { blogPosts } from './blogPosts.js';
import { bookNotes } from './bookNotes.js';
import { readingLogs } from './readingLogs.js';
import { weekNotes } from './weekNotes.js';

export const tags = (collection) => {
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

	const tagsArray = everything.map((e) => e.data.tags);

	let allTags =  [];

	for (const arr of tagsArray) {
		allTags = [
			...allTags,
			...arr.filter(t => !excludedTags.includes(t))
		];
	}

	const uniqueTags = getUniqueItems(allTags);
	
	return uniqueTags.sort((a, b) => a.localeCompare(b));
};
