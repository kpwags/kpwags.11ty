import dayjs from 'dayjs';
import musicFetcher from '../lib/musicFetcher.js';

const now = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const musicData = await musicFetcher();

			const oneMonthAgo = dayjs().subtract(30, 'day');

			const currentData = {
				music: musicData.filter((m) => m.showOnNow),
				// movies: movieData.filter((m) => dayjs(m.dateWatched).isAfter(oneMonthAgo)),
			};

			resolve(currentData);
		} catch (error) {
			reject(error);
		}
	});
};

export default now;
