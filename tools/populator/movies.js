import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems, sortByDate } from './utillities.js';

const trimJson = (movie) => ({
	movieId: movie.movieId,
	title: movie.title,
	imdbLink: movie.imdbLink,
	dateWatched: movie.dateWatched,
	sortOrder: movie.sortOrder,
	rating: movie.rating,
	thoughts: movie.thoughts,
	posterImageUrl: movie.posterImageUrl,
	status: {
		name: movie.status.name,
		colorCode: movie.status.colorCode,
	},
	genres: movie.genres.map((g) => ({
		name: g.name,
		colorCode: g.colorCode,
	})),
	services: movie.services.map((s) => ({
		name: s.name,
		colorCode: s.colorCode,
	})),
});

const groupMoviesByYear = (movies) => {
	const allYears = movies.map((m) => new Date(m.dateWatched).getFullYear());
	const years = getUniqueItems(allYears);

	const watchedMovies = [];

	for (const year of years) {
		watchedMovies.push({
			year,
			movies: movies.filter((m) => new Date(m.dateWatched).getFullYear() === year),
		});
	}

	return watchedMovies;
};

const populateRecentMovies = async () => {
	console.log('Populating Recent Movies');

	const [data, error] = await Api.Fetch(`movie/recent/${config.movieDateRange}`);

	if (error) {
		throw new Error(error);
	}

	const movieJson = data
		.sort((a, b) => sortByDate(a.dateWatched, b.dateWatched, 'DESC'))
		.map((m) => trimJson(m));

	await replaceFile('recentMovies.json', JSON.stringify(movieJson, null, "\t"));
}

export const populateWatchedMovies = async () => {
	console.log('Populating Movies');

	const [data, error] = await Api.Fetch('movie');

	if (error) {
		throw new Error(error);
	}

	const movies = data
		.filter((d) => d.status.name === 'Watched')
		.sort((a, b) => sortByDate(a.dateWatched, b.dateWatched, 'DESC'))
		.map((m) => trimJson(m));

	const movieJson = groupMoviesByYear(movies);

	await replaceFile('movies.json', JSON.stringify(movieJson, null, "\t"));
};

export const populateMovies = async () => {
	await populateWatchedMovies();
	await populateRecentMovies();
};
