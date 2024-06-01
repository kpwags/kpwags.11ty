import dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import dayjs from 'dayjs';

dotenv.config();

const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.MOVIE_DB_ID,
		start_cursor: cursor,
		filter: {
			property: 'Status',
			select: {
				equals: 'Watched',
			},
		},
		sorts: [
			{ property: 'DateWatched', direction: 'descending' },
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
	title: result.properties.Name.title[0].plain_text,
	cover: result.properties.CoverUrl.url,
	rating: result.properties.Rating.number,
	thoughts: result.properties.Thoughts.rich_text[0]?.plain_text ?? null,
	link: result.properties.ImdbLink.url,
	dateWatched: result.properties.DateWatched.date ? dayjs(result.properties.DateWatched.date.start).format('MMMM D, YYYY') : null,
	yearWatched: result.properties.DateWatched.date ? dayjs(result.properties.DateWatched.date.start).year() : null,
});

const moviesFetcher = async () => {
	const movies = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			movies.push(mapResults(m));
		});
	} while (nextCursor);

	return movies;
};

export default moviesFetcher;
