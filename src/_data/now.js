import bookFetcher from '../lib/bookFetcher.js';
import tvFetcher from '../lib/tvFetcher.js';
import videoGameFetcher from '../lib/videoGameFetcher.js';

const now = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const gameData = await videoGameFetcher();
			const tvData = await tvFetcher();
			const bookData = await bookFetcher('In Progress');

			const currentData = {
				reading: bookData,
				watching: tvData.filter((t) => t.status === 'current'),
				playing: gameData.filter((g) => g.status === 'current'),
			};

			resolve(currentData);
		} catch (error) {
			reject(error);
		}
	});
};

export default now;
