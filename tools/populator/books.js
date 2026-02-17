import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems } from './utillities.js';

const populateAuthors = async (books) => {
	console.log('Populating Authors');

	const authors = getUniqueItems(books.map((b) => b.author))
		.sort((a, b) => a.localeCompare(b));

	const authorJson = [];

	for (const author of authors) {
		const authorBooks = books
			.filter((b) => b.author === author)
			.sort((a, b) => new Date(a.dateCompleted) - new Date(b.dateCompleted));

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
		.sort((a, b) => a.sortOrder - b.sortOrder);

	const inProgress = books
		.filter((b) => b.status.name === 'Reading')
		.sort((a, b) => a.fullTitle.localeCompare(b.fullTitle));

	const finished = books
		.filter((b) => b.status.name === 'Finished')
		.sort((a, b) => new Date(a.dateCompleted) - new Date(b.dateCompleted));

	const bookJson = {
		inProgress,
		complated: finished,
		toRead: backlog,
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

