const bookFetcher = require('../lib/bookFetcher.js');
const tvFetcher = require('../lib/tvFetcher.js');
const videoGameFetcher = require('../lib/videoGameFetcher.js');

module.exports = () => {
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
