import bookFetcher from '../lib/bookFetcher.js';

const booksToRead = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const books = await bookFetcher('Not started', [{ property: 'Backlog ID', direction: 'ascending' }]);

			resolve(books);
		} catch (error) {
			reject(error);
		}
	});
};

export default booksToRead;
