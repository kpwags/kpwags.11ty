import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems, sortByDate, sortByTitle } from './utillities.js';

const trimJson = (game) => ({
	videoGameId: game.videoGameId,
	title: game.title,
	link: game.link,
	dateStarted: game.dateStarted,
	dateCompleted: game.dateCompleted,
	rating: game.rating,
	thoughts: game.thoughts,
	coverImageUrl: game.coverImageUrl,
	sortOrder: game.sortOrder,
	status: {
		name: game.status.name,
		colorCode: game.status.colorCode,
	},
	completion: {
		name: game.completion.name,
		colorCode: game.completion.colorCode,
	},
	genres: game.genres.map((g) => ({
		name: g.name,
		colorCode: g.colorCode,
	})),
	systems: game.systems.map((s) => ({
		name: s.name,
		colorCode: s.colorCode,
	})),
});

export const populateVideoGames = async () => {
	console.log('Populating Video Games');

	const [data, error] = await Api.Fetch('video-game');

	if (error) {
		throw new Error(error);
	}

	const inProgress = [];
	const completed = [];

	const games = data
		.filter((d) => d.status.name === 'Completed' || d.status.name === 'In Progress')
		.map((g) => trimJson(g));

	for (const game of games) {
		if (game.status.name === 'Completed') {
			completed.push(game);
		} else {
			inProgress.push(game);
		}
	}

	const videoGameJson = {
		inProgress: inProgress.sort((a, b) => sortByTitle(a.title, b.title)),
		completed: completed.sort((a, b) => sortByDate(a.dateCompleted, b.dateCompleted, 'DESC'))
	};

	await replaceFile('videoGames.json', JSON.stringify(videoGameJson, null, "\t"));
};
