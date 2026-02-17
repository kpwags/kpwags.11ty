import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems } from './utillities.js';

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
			.sort((a, b) => a.name.localeCompare(b.name));

		podcastJson.push({ name: category, podcasts });
	}

	await replaceFile('podcasts.json', JSON.stringify(podcastJson, null, "\t"));
};

