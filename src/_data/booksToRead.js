const bookFetcher = require('../lib/bookFetcher.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const books = await bookFetcher('Not started', [{ property: 'Backlog ID', direction: 'ascending' }]);

			resolve(books);
		} catch (error) {
			reject(error);
		}
	});
};
