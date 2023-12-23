require("dotenv").config();

const { Client } = require('@notionhq/client');
const dayjs = require('dayjs');
const { getSortedName } = require('./Utilities');

const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.VIDEOGAMES_DB_ID,
		start_cursor: cursor,
		filter: {
			or: [
				{
					property: 'Status',
					select: {
						equals: 'Current',
					},
				},
				{
					property: 'Status',
					select: {
						equals: 'Completed',
					},
				},
				{
					property: 'Status',
					select: {
						equals: 'Maybe Later',
					},
				},
			],
		},
		sorts: [
			{ property: 'Date Completed', direction: 'descending' },
		],
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
	coverUrl: result.properties.CoverUrl.url,
	rating: result.properties.Rating.number,
	thoughts: result.properties.Thoughts.rich_text[0]?.plain_text ?? null,
	status: result.properties.Status.select.name === 'Current' ? 'current' : 'past',
	platform: result.properties.Platform.select.name,
	completed: result.properties.Completed.select.name,
	link: result.properties.Link.url,
});

module.exports = async () => {
	const videoGames = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			videoGames.push(mapResult(m));
		});
	} while (nextCursor);

	return videoGames;
};
