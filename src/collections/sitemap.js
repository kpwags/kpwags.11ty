import { blogNotes } from './blogNotes.js';
import { blogPosts } from './blogPosts.js';
import { bookNotes } from './bookNotes.js';
import { readingLogs } from './readingLogs.js';
import { weekNotes } from './weekNotes.js';
import { readFile } from 'fs/promises';
import dayjs from 'dayjs';

const getMusic = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const music = JSON.parse(await readFile(new URL('./../_data/music.json', import.meta.url)));

			resolve(music);
		} catch (error) {
			reject(error);
		}
	});
};


const getBooks = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const books = JSON.parse(await readFile(new URL('./../_data/books.json', import.meta.url)));

			resolve(books.completed);
		} catch (error) {
			reject(error);
		}
	});
};


export const sitemap = async (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const music = await getMusic();
	const books = await getBooks();

	const pages = [
		{ url: '/', date: '2026-10-22' },
		{ url: '/archives/', date: '2026-10-22' },
		{ url: '/about/', date: '2026-10-22' },
		{ url: '/work/', date: '2026-10-22' },
		{ url: '/uses/', date: '2026-10-22' },
		{ url: '/now/', date: today },
		{ url: '/wips/', date: '2026-10-22' },
		{ url: '/blog-roll/', date: '2026-10-22' },
		{ url: '/stats/', date: today },
		{ url: '/progress/2022/', date: '2026-10-22' },
		{ url: '/progress/2023/', date: '2026-10-22' },
		{ url: '/progress/2024/', date: '2026-10-22' },
		{ url: '/progress/2025/', date: '2026-10-22' },
		{ url: '/progress/2026/', date: today },
		{ url: '/bookshelf/', date: today },
		{ url: '/bookshelf/backlog/', date: today },
		{ url: '/bookshelf/authors/', date: today },
		{ url: '/movies/', date: today },
		{ url: '/podcasts/', date: today },
		{ url: '/tv/', date: today },
		{ url: '/video-games/', date: today },
		{ url: '/credits/', date: '2026-10-22' },
		{ url: '/colophon/', date: '2026-10-22' },
		{ url: '/ai/', date: '2026-10-22' },
		...getBlogPostPages(collection),
		...getReadingLogPages(collection),
		...getWeekNotesPages(collection),
		...getNotesPages(collection),
		...getBookNotesPages(collection),
	];

	books.forEach((year) => {
		year.books.forEach((book) => {
			pages.push({ url: `/bookshelf/book/${book.bookId}/`, date: dayjs(book.dateCompleted).format('YYYY-MM-DD') });
		});
	});

	music.forEach((album) => {
		pages.push({
			url: `/music/album/${album.musicAlbumId}/`,
			date: album.datePurchased ? dayjs(album.datePurchased).format('YYYY-MM-DD') : today,
		});
	});

	return pages;
};

const getBlogPostPages = (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const pages = [];

	const posts = blogPosts(collection, {
		includeRssOnly: true,
		includePolitics: true,
	});

	const postPages = Math.ceil(posts.length / 12);

	pages.push({ url: '/blog/', date: today });
	for (let i = 1; i < postPages; i += 1) {
		pages.push({ url: `/blog/${i}/`, date: today });
	}

	posts.forEach((p) => {
		pages.push({ url: p.url, date: dayjs.utc(p.date).format('YYYY-MM-DD') })
	});

	return pages;
};

const getReadingLogPages = (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const pages = [];

	const readingLogPosts = readingLogs(collection);

	const readingLogPages = Math.ceil(readingLogPosts.length / 12);

	pages.push({ url: '/reading-logs/', date: today });
	for (let i = 1; i < readingLogPages; i += 1) {
		pages.push({ url: `/reading-logs/${i}/`, date: today });
	}

	readingLogPosts.forEach((p) => {
		pages.push({ url: p.url, date: dayjs.utc(p.date).format('YYYY-MM-DD') })
	});

	return pages;
};

const getNotesPages = (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const pages = [];

	const notes = blogNotes(collection, {
		includePolitics: true,
	});

	const notesPages = Math.ceil(notes.length / 12);

	pages.push({ url: '/notes/', date: today });
	for (let i = 1; i < notesPages; i += 1) {
		pages.push({ url: `/notes/${i}/`, date: today });
	}

	notes.forEach((p) => {
		pages.push({ url: p.url, date: dayjs.utc(p.date).format('YYYY-MM-DD') })
	});

	return pages;
};

const getWeekNotesPages = (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const pages = [];

	const weekNotePosts = weekNotes(collection, {
		includePolitics: true,
	});

	const weekNotePages = Math.ceil(weekNotePosts.length / 12);

	pages.push({ url: '/week-notes/', date: today });
	for (let i = 1; i < weekNotePages; i += 1) {
		pages.push({ url: `/week-notes/${i}/`, date: today });
	}

	weekNotePosts.forEach((p) => {
		pages.push({ url: p.url, date: dayjs.utc(p.date).format('YYYY-MM-DD') })
	});

	return pages;
};

const getBookNotesPages = (collection) => {
	const today = dayjs().format('YYYY-MM-DD');

	const pages = [];

	const books = bookNotes(collection);

	const bookNotePages = Math.ceil(books.length / 12);

	pages.push({ url: '/book-notes/', date: today });
	for (let i = 1; i < bookNotePages; i += 1) {
		pages.push({ url: `/book-notes/${i}/`, date: today });
	}

	books.forEach((p) => {
		pages.push({ url: p.url, date: dayjs.utc(p.date).format('YYYY-MM-DD') })
	});

	return pages;
}