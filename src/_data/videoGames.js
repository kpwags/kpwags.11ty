const videoGameFetcher = require('../lib/videoGameFetcher.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const gameData = await videoGameFetcher();

			const games = [];

			games.push({ status: 'Currently Playing', games: gameData.filter((g) => g.status === 'current') });
			games.push({ status: 'Played', games: gameData.filter((g) => g.status !== 'current') });

			resolve(games);
		} catch (error) {
			reject(error);
		}
	});
};
