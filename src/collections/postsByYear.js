const dayjs = require("dayjs");
const CollectionHelpers = require('../lib/CollectionHelpers');

function getByDate(collection, dateFormat) {
	const postsByDate = {};

	const allPosts = CollectionHelpers.getBlogPostsAndReadingLogs(collection, false);

	allPosts.forEach(function (post) {
		// Get the year from the date
		const d = dayjs(post.data.date).format(dateFormat);

		// Create a new array key with the year
		if (!postsByDate[d]) {
			postsByDate[d] = new Array();
		}

		// Add the post to the year array key
		postsByDate[d].push(post);
	});

	// hacky way to get an index page
	// TODO: find a better way?
	const nextYear = dayjs().add(1, 'year')
	postsByDate[nextYear.format('MM-YYYY')] = new Array();

	return postsByDate;
}

module.exports = (collection) => {
	return getByDate(collection, "MM-YYYY");
};