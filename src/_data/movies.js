const moviesFetcher = require('../lib/moviesFetcher.js');
const { getUniqueValues } = require('../lib/Utilities.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const movieData = await moviesFetcher();

			const years = movieData.map((m) => m.yearWatched);
			const uniqueYears = getUniqueValues(years);

			const movies = [];

			uniqueYears.forEach((year) => {
				movies.push({ year, movies: movieData.filter((m) => m.yearWatched === year) });
			});

			resolve(movies);
		} catch (error) {
			reject(error);
		}
	});
};
