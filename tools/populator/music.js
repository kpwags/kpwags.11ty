import { config } from './config.js';
import { Api } from './api.js';
import { replaceFile } from './io.js';
import { getUniqueItems } from './utillities.js';

const trimJson = (album) => ({
	musicAlbumId: album.musicAlbumId,
	title: album.title,
	artist: album.artist,
	thoughts: album.thoughts,
	coverImageUrl: album.coverImageUrl,
	isTopTen: album.isTopTen,
	showOnNowPage: album.showOnNowPage,
	datePurchased: album.datePurchased,
	genres: album.genres.map((g) => ({
		name: g.name,
		colorCode: g.colorCode,
	})),
	formats: album.formats.map((f) => ({
		name: f.name,
		colorCode: f.colorCode,
	})),
	tracks: album.tracks.map((t) => ({
		trackNumber: t.trackNumber,
		title: t.title,
	})),
});

const populateRecentMusic = async () => {
	console.log('Populating Recent Music');

	const [data, error] = await Api.Fetch(`music/recent/${config.musicDateRange}`);

	if (error) {
		throw new Error(error);
	}

	const musicJson = data.map((m) => trimJson(m));

	await replaceFile('recentMusic.json', JSON.stringify(musicJson, null, "\t"));
}

const populateMusicAlbums = async () => {
	console.log('Populating Music');

	const [data, error] = await Api.Fetch('music');

	if (error) {
		throw new Error(error);
	}

	const musicJson = data.map((m) => trimJson(m));

	await replaceFile('music.json', JSON.stringify(musicJson, null, "\t"));

	return data;
};

const buildFrontMatterForAlbum = (album) => {
	let tracks = '';
	let formats = '';
	let genres = '';

	for (const track of album.tracks.map((t) => t.title)) {
		if (tracks === '')
		{
			tracks = `  - "${track.replaceAll('"', '&quot;').replaceAll('\\', '\\\\')}"`;
		}
		else
		{
			tracks = `${tracks}
  - "${track.replaceAll('"', '&quot;').replaceAll('\\', '\\\\')}"`;
		}
	}

	for (const format of album.formats) {
		if (formats === '')
		{
			formats = `  { name: "${format.name}", color: "${format.colorCode}" },`;
		}
		else
		{
			formats = `${formats}
  { name: "${format.name}", color: "${format.colorCode}" },`;
		}
	}

	for (const genre of album.genres) {
		if (genres === '')
		{
			genres = `  { name: "${genre.name}", color: "${genre.colorCode}" },`;
		}
		else
		{
			genres = `${genres}
  { name: "${genre.name}", color: "${genre.colorCode}" },`;
		}
	}

	const frontMatter = `---
layout: "layouts/music-album.html"
title: "${album.title}"
artist: "${album.artist}"
coverImageUrl: ${album.coverImageUrl}
datePurchased: ${album.datePurchased}
permalink: /music/album/${album.musicAlbumId}/index.html
thoughts: "${album.thoughts}"
formats: [
${formats}
]
genres: [
${genres}
]
tracks:
${tracks}
---
`;

	return frontMatter;
};

const writeMusicPages = async (albums) => {
	console.log('Writing Music Album Pages');

	await Promise.all(albums.map(async (album) => {
		console.log(`Writing ${album.artist} - ${album.title}`);
		const frontMatter = buildFrontMatterForAlbum(album);
		await replaceFile(`${album.musicAlbumId}.md`, frontMatter, '/src/music/album')
	}));
};

export const populateMusic = async () => {
	const musicAlbums = await populateMusicAlbums();
	await populateRecentMusic();
	await writeMusicPages(musicAlbums);
};
