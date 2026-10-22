import { blogNotes } from './blogNotes.js';
import { blogPosts } from './blogPosts.js';
import { bookNotes } from './bookNotes.js';
import { readingLogs } from './readingLogs.js';
import { weekNotes } from './weekNotes.js';
import { readFile } from 'fs/promises';

const getLinks = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const links = JSON.parse(await readFile(new URL('./../_data/links.json', import.meta.url)));

			resolve(links);
		} catch (error) {
			reject(error);
		}
	});
};

export const allContent = async (collection, includePolitics = true) => {
	const posts = blogPosts(collection, {
		includeRssOnly: true,
		includePolitics,
	});

	const readingLogPosts = readingLogs(collection);

	const weekNotePosts = weekNotes(collection, {
		includePolitics,
	});

	const notes = blogNotes(collection, {
		includePolitics,
	});

	const books = bookNotes(collection);

	const links = await getLinks();

	const linkData = [];

	links.forEach((link) => {
		linkData.push({
			url: link.url,
			data: {
				title: link.title,
				tags: [],
				spoilers: false,
			},
			date: new Date(link.linkDate),
			templateContent: `<p><a href="${link.url}">${link.title}</a> by ${link.author}</p>`,
		})
	});

	return [
		...posts,
		...readingLogPosts,
		...books,
		...notes,
		...weekNotePosts,
		...linkData,
	].sort((a, b) => {
		if (a.date > b.date) {
			return 1;
		}
		return -1;
	});
};
