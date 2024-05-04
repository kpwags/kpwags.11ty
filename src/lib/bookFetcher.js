require("dotenv").config();

const { Client } = require('@notionhq/client');

const defaultSorts = [
	{ property: 'DateFinished', direction: 'descending' },
];

const fetchFromNotion = async (status, sorts = undefined, cursor = undefined) => {
	if (typeof sorts === 'undefined') {
		sorts = defaultSorts;
	}

	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.BOOKS_DB_ID,
		start_cursor: cursor,
		filter: {
			property: 'Status',
			select: {
				equals: status,
			},
		},
		sorts,
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
	title: result.properties.Name.title[0].plain_text,
	subtitle: result.properties.SubTitle.rich_text[0]?.plain_text ?? null,
	author: result.properties.Author.rich_text[0].plain_text,
	coverUrl: result.properties.CoverUrl.url,
	rating: result.properties.Rating.number,
	thoughts: result.properties.Thoughts.rich_text[0]?.plain_text ?? null,
	status: result.properties.Status.select.name === 'In Progress' ? 'current' : 'read',
	link: result.properties.Link.url,
	yearRead: result.properties.DateFinished.date ? new Date(result.properties.DateFinished.date.start).getFullYear() : null,
	reviewUrlSlug: result.properties.ReviewUrlSlug.rich_text[0]?.plain_text ?? null,
	progress: result.properties.Progress.formula?.number ?? 0,
});

module.exports = async (status = 'Completed', sorts = undefined) => {
	const books = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(status, sorts, nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			books.push(mapResults(m));
		});
	} while (nextCursor);

	return books;
}