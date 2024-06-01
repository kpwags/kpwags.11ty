import videoGameFetcher from '../lib/videoGameFetcher.js';

const videoGames = () => {
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

export default videoGames;
