require("dotenv").config();

const { Client } = require('@notionhq/client');
const dayjs = require('dayjs');
const { getSortedName } = require('./Utilities');

const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.TV_DB_ID,
		start_cursor: cursor,
		filter: {
			or: [
				{
					property: 'Status',
					select: {
						equals: 'In Progress',
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
						equals: 'Between Seasons',
					},
				},
			],
		},
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

const getStatus = (name) => {
	switch (name) {
		case 'Completed':
			return 'completed';
		case 'Between Seasons':
			return 'between-seasons';
		case 'In Progress':
		default:
			return 'current';
	}
};

const mapResult = (result) => ({
	id: result.id,
	title: result.properties.Name.title[0].plain_text,
	cover: result.properties.CoverUrl.url,
	rating: result.properties.Rating.number,
	thoughts: result.properties.Thoughts.rich_text[0]?.plain_text ?? null,
	status: getStatus(result.properties.Status.select.name),
	link: result.properties.Link.url,
	sortedName: getSortedName(result.properties.Name.title[0].plain_text),
});

module.exports = async () => {
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
}