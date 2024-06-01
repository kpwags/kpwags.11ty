import bookFetcher from '../lib/bookFetcher.js';
import { getUniqueValues } from '../lib/Utilities.js';

const books = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const bookData = await bookFetcher();

			const years = bookData.map((b) => b.yearRead);
			const uniqueYears = getUniqueValues(years);

			const books = [];

			uniqueYears.forEach((year) => {
				books.push({ year, books: bookData.filter((b) => b.yearRead === year) });
			});

			resolve(books);
		} catch (error) {
			reject(error);
		}
	});
};

export default books;
