import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems, sortByTitle } from './utillities.js';

const trimJson = (tv) => ({
	televisionShowId: tv.televisionShowId,
	title: tv.title,
	imdbLink: tv.imdbLink,
	rating: tv.rating,
	thoughts: tv.thoughts,
	coverImageUrl: tv.coverImageUrl,
	seasonEpisodeCount: tv.seasonEpisodeCount,
	currentSeasonEpisode: tv.currentSeasonEpisode,
	progress: tv.progress,
	sortOrder: tv.sortOrder,
	status: {
		name: tv.status.name,
		colorCode: tv.status.colorCode,
	},
	genres: tv.genres.map((g) => ({
		name: g.name,
		colorCode: g.colorCode,
	})),
	services: tv.services.map((s) => ({
		name: s.name,
		colorCode: s.colorCode,
	})),
});

export const populateTelevision = async () => {
	console.log('Populating Television');

	const [data, error] = await Api.Fetch('tv');

	if (error) {
		throw new Error(error);
	}

	const tvJson = {
		inProgress: [],
		betweenSeasons: [],
		completed: [],
	};

	const shows = data
		.filter((d) => d.status.name === 'Watched' || d.status.name === 'Watching' || d.status.name === 'In Between Seasons')
		.sort((a, b) => sortByTitle(a.title, b.title))
		.map((s) => trimJson(s));

	for (const show of shows) {
		if (show.status.name === 'Watched') {
			tvJson.completed.push(show);
		} else if (show.status.name ==='In Between Seasons') {
			tvJson.betweenSeasons.push(show);
		} else {
			tvJson.inProgress.push(show);
		}
	}

	await replaceFile('tv.json', JSON.stringify(tvJson, null, "\t"));
};
