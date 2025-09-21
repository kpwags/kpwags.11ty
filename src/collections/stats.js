import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { getUniqueItems } from '../lib/getUniqueItems.js';
import { blogPosts } from './blogPosts.js';
import tagUrl from '../filters/tagurl-filter.js';

dayjs.extend(utc);

const availableColors = [
	'#ff0000',
	'#e76000',
	'#ddb400',
	'#15931a',
	'#2659e5',
	'#aa00ff',
];

const excludedTags = [
	'readinglog',
	'post',
	'Reading Log',
	'booknotes',
	'shortnotes',
	'Week Notes',
	'Monthly Check-In',
	'weeknote'
];

const getYear = (date) => dayjs.utc(date).format('YYYY');

const getPostsByYearData = (posts) => {
	const postsByYear = [];

	const years = posts.map((p) => getYear(p.date));
	const uniqueYears = getUniqueItems(years);

	let maxCount = 0;

	uniqueYears.forEach((year) => {
		const count = posts.filter((p) => getYear(p.date) === year).length;

		if (count > maxCount) {
			maxCount = count;
		}
	});

	let colorIndex = 0;
	uniqueYears
		.sort()
		.reverse()
		.forEach((year) => {
			if (colorIndex >= availableColors.length) {
				colorIndex = 0;
			}

			const count = posts.filter((p) => getYear(p.date) === year).length;

			postsByYear.push({
				year,
				color: availableColors[colorIndex],
				count,
				percentage: count === maxCount ? 100 : Math.round((count / maxCount) * 100),
			});

			colorIndex += 1;
		});

	return postsByYear;
}

const getPopularTagsData = (posts, limit = 10) => {
	const postsPerTag = [];
	let tagArray = [];

	posts.forEach((post) => {
		const { tags } = post.data;

		tagArray = [
			...tagArray,
			...tags.filter((tag) => !excludedTags.includes(tag)),
		];
	});

	const uniqueTags = getUniqueItems(tagArray);

	let maxCount = 0;
	uniqueTags.forEach((tag) => {
		const count = tagArray.filter((t) => t === tag).length
		if (count > maxCount) {
			maxCount = count;
		}
	});

	uniqueTags.forEach((tag) => {
		const count = tagArray.filter((t) => t === tag).length;

		postsPerTag.push({
			name: tag,
			url: tagUrl(tag),
			count,
			color: availableColors[0],
			percentage: count === maxCount ? 100 : Math.round((count / maxCount) * 100),
		});
	});

	let limitedResults = postsPerTag.length <= limit
		? postsPerTag
			.sort((a, b) => b.count - a.count)
		: postsPerTag
			.sort((a, b) => b.count - a.count)
			.slice(0, limit);

	let colorIndex = 0;
	limitedResults.forEach((result) => {
		if (colorIndex >= availableColors.length) {
			colorIndex = 0;
		}

		result.color = availableColors[colorIndex];

		colorIndex += 1;
	});

	return limitedResults;
};

const getOverallStats = (posts) => {
	let totalWords = 0;

	posts.forEach((p) => {
		if (p.page.rawInput) {
			const content = p.page.rawInput.replace(/(<([^>]+)>)/gi, '');
			const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
			const count = matches !== null ? matches.length : 0;

			totalWords += count;
		}
	});

	return {
		totalPosts: posts.length,
		totalWords: totalWords.toLocaleString("en-US"),
		firstPostDate: dayjs(posts[0].date).format('M/D/YYYY'),
		lastPostDate: dayjs(posts[posts.length - 1].date).format('M/D/YYYY'),
		averageWordsPerPost: Math.round(totalWords / posts.length).toLocaleString("en-US"),
	};
}

const stats = (collection) => {
	const posts = blogPosts(collection, {
		includeRssOnly: true,
		includePolitics: true,
	});

	const stats = {
		postsByYear: getPostsByYearData(posts),
		popularTags: getPopularTagsData([...posts]),
		overall: getOverallStats(posts),
	};

	return stats;
};

export default stats;
