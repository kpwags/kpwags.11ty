import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems } from './utillities.js';

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
		.sort((a, b) => a.title.localeCompare(b.title));

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
