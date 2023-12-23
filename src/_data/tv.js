const tvFetcher = require('../lib/tvFetcher.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const tvData = await tvFetcher();

			const tv = [];

			tv.push({ status: 'Currently Watching', shows: tvData.filter((t) => t.status === 'current') });
			tv.push({ status: 'In-Between Seasons', shows: tvData.filter((t) => t.status === 'between-seasons') });
			tv.push({ status: 'Completed', shows: tvData.filter((t) => t.status === 'completed') });

			resolve(tv);
		} catch (error) {
			reject(error);
		}
	});
};
