import musicFetcher from '../lib/musicFetcher.js';

const music = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const music = await musicFetcher();

			resolve(music);
		} catch (error) {
			reject(error);
		}
	});
};

export default music;