import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems, sortByTitle } from './utillities.js';

const trimJson = (podcast) => ({
	podcastId: podcast.podcastId,
	name: podcast.name,
	link: podcast.link,
	coverImageUrl: podcast.coverImageUrl,
	category: {
		name: podcast.category.name,
		colorCode: podcast.category.colorCode,
	},
});

export const populatePodcasts = async () => {
	console.log('Populating Podcasts');

	const [data, error] = await Api.Fetch('podcast');

	if (error) {
		throw new Error(error);
	}

	const categories = getUniqueItems(data.map((d) => d.category.name)).sort((a, b) => a.localeCompare(b));

	const podcastJson = [];

	for (const category of categories) {
		const podcasts = data
			.filter((p) => p.category.name === category)
			.sort((a, b) => sortByTitle(a.name, b.name))
			.map((p) => trimJson(p));

		podcastJson.push({ name: category, podcasts });
	}

	await replaceFile('podcasts.json', JSON.stringify(podcastJson, null, "\t"));
};

