import dayjs from 'dayjs';
import bookFetcher from '../lib/bookFetcher.js';
import tvFetcher from '../lib/tvFetcher.js';
import videoGameFetcher from '../lib/videoGameFetcher.js';
import musicFetcher from '../lib/musicFetcher.js';
import moviesFetcher from '../lib/moviesFetcher.js';

const now = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const gameData = await videoGameFetcher();
			const tvData = await tvFetcher();
			const bookData = await bookFetcher('In Progress');
			const musicData = await musicFetcher();
			const movieData = await moviesFetcher();

			const oneMonthAgo = dayjs().subtract(30, 'day');

			const currentData = {
				reading: bookData,
				tv: tvData.filter((t) => t.status === 'current'),
				playing: gameData.filter((g) => g.status === 'current'),
				music: musicData.filter((m) => m.showOnNow),
				movies: movieData.filter((m) => dayjs(m.dateWatched).isAfter(oneMonthAgo)),
			};

			resolve(currentData);
		} catch (error) {
			reject(error);
		}
	});
};

export default now;
