require("dotenv").config();

const { Client } = require('@notionhq/client');
const dayjs = require('dayjs');

const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.LINKS_DB_ID,
		start_cursor: cursor,
		sorts: [
			{ property: 'Date', direction: 'descending' },
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

const mapResults = (result) => ({
	id: result.id,
	title: result.properties.Title.title[0].plain_text,
	author: result.properties.Author.rich_text[0].plain_text,
	link: result.properties.Link.url,
	date: result.properties.Date.date ? dayjs(result.properties.Date.date.start).format('MMMM D, YYYY') : null,
});

module.exports = async () => {
	const links = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			links.push(mapResults(m));
		});
	} while (nextCursor);

	return links;
}