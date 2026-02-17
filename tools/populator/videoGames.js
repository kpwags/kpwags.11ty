import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems } from './utillities.js';

export const populateVideoGames = async () => {
	console.log('Populating Video Games');

	const [data, error] = await Api.Fetch('video-game');

	if (error) {
		throw new Error(error);
	}

	const videoGameJson = {
		inProgress: [],
		completed: [],
	};

	const games = data.filter((d) => d.status.name === 'Completed' || d.status.name === 'In Progress');

	for (const game of games) {
		if (game.status.name === 'Completed') {
			videoGameJson.completed.push(game);
		} else {
			videoGameJson.inProgress.push(game);
		}
	}

	await replaceFile('videoGames.json', JSON.stringify(videoGameJson, null, "\t"));
};
