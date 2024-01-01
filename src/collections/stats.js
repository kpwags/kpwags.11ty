const { getUniqueValues } = require('../lib/Utilities.js');
const { getBlogPostsAndReadingLogs } = require("../lib/CollectionHelpers");
const tagUrl = require('../filters/tagurl-filter.js');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const availableColors = [
	'#ff0000',
	'#e76000',
	'#ddb400',
	'#15931a',
	'#2659e5',
	'#aa00ff',
];

const getYear = (date) => dayjs.utc(date).format('YYYY');

const getPostsByYearData = (posts) => {
	const postsByYear = [];

	const years = posts.map((p) => getYear(p.date));
	const uniqueYears = getUniqueValues(years);

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
			...tags.filter((tag) => !['readinglog', 'post', 'Reading Log'].includes(tag)),
		];
	});

	const uniqueTags = getUniqueValues(tagArray);

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

module.exports = (collection) => {
	const posts = getBlogPostsAndReadingLogs(collection, false);

	const stats = {
		postsByYear: getPostsByYearData(posts),
		popularTags: getPopularTagsData(posts),
	};

	return stats;
};
