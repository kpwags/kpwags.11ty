const musicFetcher = require('../lib/musicFetcher.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const music = await musicFetcher();

			resolve(music);
		} catch (error) {
			reject(error);
		}
	});
};
