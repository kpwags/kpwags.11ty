import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems, sortAlphabetically, sortByDate, sortNumerically } from './utillities.js';

const trimJson = (book) => ({
	bookId: book.bookId,
	title: book.title,
	subTitle: book.subTitle,
	fullTitle: book.fullTitle,
	author: book.author,
	link: book.link,
	dateStarted: book.dateStarted,
	dateCompleted: book.dateCompleted,
	rating: book.rating,
	bookNotesUrl: book.bookNotesUrl,
	thoughts: book.thoughts,
	coverImageUrl: book.coverImageUrl,
	isAtLibrary: book.isAtLibrary,
	isPurchased: book.isPurchased,
	currentPage: book.currentPage,
	pageCount: book.pageCount,
	progress: book.progress,
	sortOrder: book.sortOrder,
	status: {
		name: book.status.name,
		colorCode: book.status.colorCode,
	},
	type: {
		name: book.type.name,
		colorCode: book.type.colorCode,
	},
	series: book.series ? {
		name: book.series.name,
		colorCode: book.series.colorCode,
	} : null,
	genres: book.genres.map((g) => ({
		name: g.name,
		colorCode: g.colorCode,
	})),
	formats: book.formats.map((f) => ({
		name: f.name,
		colorCode: f.colorCode,
	})),
});

const groupBooksByYear = (books) => {
	const allYears = books.map((b) => new Date(b.dateCompleted).getFullYear());
	const years = getUniqueItems(allYears);

	const finished = [];

	for (const year of years) {
		finished.push({
			year,
			books: books.filter((b) => new Date(b.dateCompleted).getFullYear() === year),
		});
	}

	return finished;
};

const populateAuthors = async (books) => {
	console.log('Populating Authors');

	const authors = getUniqueItems(books.map((b) => b.author))
		.sort((a, b) => a.localeCompare(b));

	const authorJson = [];

	for (const author of authors) {
		const authorBooks = books
			.filter((b) => b.author === author)
			.sort((a, b) => sortByDate(a.dateCompleted, b.dateCompleted, 'ASC'));

		authorJson.push({
			name: author,
			books: authorBooks.map((b) => ({ title: b.fullTitle, link: b.link })),
		});
	}

	await replaceFile('authors.json', JSON.stringify(authorJson, null, "\t"));
};

const populateBookJson = async (books) => {
	console.log('Populating Books');

	const backlog = books
		.filter((b) => b.status.name === 'To Read')
		.sort((a, b) => sortNumerically(a.sortOrder, b.sortOrder));

	const inProgress = books
		.filter((b) => b.status.name === 'Reading')
		.sort((a, b) => sortAlphabetically(a.fullTitle, b.fullTitle));

	const finished = books
		.filter((b) => b.status.name === 'Finished')
		.sort((a, b) => sortByDate(a.dateCompleted, b.dateCompleted, 'DESC'));

	const bookJson = {
		inProgress: inProgress.map((b) => trimJson(b)),
		completed: groupBooksByYear(finished.map((b) => trimJson(b))),
		toRead: backlog.map((b) => trimJson(b)),
	};

	await replaceFile('books.json', JSON.stringify(bookJson, null, "\t"));
}

export const populateBooks = async () => {
	const [data, error] = await Api.Fetch('book');

	if (error) {
		throw new Error(error);
	}

	await populateAuthors(data.filter((d) => d.status.name === 'Finished'));
	await populateBookJson(data);
};

