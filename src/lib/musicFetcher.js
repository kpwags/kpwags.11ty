require("dotenv").config();

const { Client } = require('@notionhq/client');
const { getSortedName } = require('./Utilities');

const fetchFromNotion = async (cursor = undefined) => {
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.MUSIC_DB_ID,
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
	artist: result.properties.Artist.rich_text[0].plain_text,
	title: result.properties.Album.title[0].plain_text,
	coverUrl: result.properties.CoverUrl.url,
	genres: result.properties.Genre.multi_select.map((i) => i.name),
	formats: result.properties.Format.multi_select.map((i) => i.name),
	sortedName: getSortedName(result.properties.Artist.rich_text[0].plain_text),
	sortedAlbumName: getSortedName(result.properties.Album.title[0].plain_text),
});

module.exports = async () => {
	const music = [];

	let nextCursor;

	do {
		const response = await fetchFromNotion(nextCursor);

		nextCursor = response.nextCursor;

		response.results.forEach((m) => {
			music.push(mapResult(m));
		});
	} while (nextCursor);

	return music
		.sort((a, b) => {
			if (a.sortedName > b.sortedName) {
				return 1;
			} else if (a.sortedName < b.sortedName) {
				return -1;
			} else {
				if (a.sortedAlbumName > b.sortedAlbumName) {
					return 1;
				} else {
					return -1;
				}
			}
		});
};
