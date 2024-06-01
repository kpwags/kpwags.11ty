import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import { getSortedName } from './Utilities.js';

dotenv.config();


const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.PODCAST_DB_ID,
		start_cursor: cursor,
	});

	let nextCursor = undefined;

	if (response.has_more) {
		nextCursor = response.next_cursor;
	}

	return {
		nextCursor,
		results: response.results,
	};
};

const mapResult = (result) => ({
	id: result.id,
	title: result.properties.Name.title[0].plain_text,
	cover: result.properties.ArtworkUrl.url,
	category: result.properties.Category.select.name,
	link: result.properties.Link.url,
	sortedName: getSortedName(result.properties.Name.title[0].plain_text),
});

const podcastFetcher = async () => {
	const tv = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			tv.push(mapResult(m));
		});
	} while (nextCursor);

	return tv.sort((a, b) => a.sortedName.localeCompare(b.sortedName));
};

export default podcastFetcher;
