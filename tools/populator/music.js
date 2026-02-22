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

export const populateMusicAlbums = async () => {
	console.log('Populating Music');

	const [data, error] = await Api.Fetch('music');

	if (error) {
		throw new Error(error);
	}

	const musicJson = data.map((m) => trimJson(m));

	await replaceFile('music.json', JSON.stringify(musicJson, null, "\t"));
};

export const populateMusic = async () => {
	await populateMusicAlbums();
	await populateRecentMusic();
};
