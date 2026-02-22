import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { sortByDate } from './utillities.js';

const trimJson = (link) => ({
	linkId: link.linkId,
	title: link.title,
	author: link.author,
	url: link.url,
	linkDate: link.linkDate,
	category: {
		name: link.category.name,
		colorCode: link.category.colorCode,
	},
	type: {
		name: link.type.name,
		colorCode: link.type.colorCode,
	},
});

export const populateLinks = async () => {
	console.log('Populating Links');

	const [data, error] = await Api.Fetch('link');

	if (error) {
		throw new Error(error);
	}

	const links = data
		.sort((a, b) => sortByDate(a.linkDate, b.linkDate, 'DESC'))
		.map((l) => trimJson(l));

	await replaceFile('links.json', JSON.stringify(links, null, "\t"));
};
