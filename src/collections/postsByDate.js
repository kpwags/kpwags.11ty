import dayjs from 'dayjs';
import { getItemsConsideredPosts } from '../lib/CollectionHelpers.js';

function getByDate(collection, dateFormat) {
	const postsByDate = {};

	const allPosts = getItemsConsideredPosts(collection, false);

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

	if (dateFormat === 'MM-YYYY') {
		// hacky way to get an index page
		// TODO: find a better way?
		const nextYear = dayjs().add(1, 'year')
		postsByDate[nextYear.format('MM-YYYY')] = new Array();
	}

	if (dateFormat === 'YYYY') {
		Object.keys(postsByDate).forEach((p) => postsByDate[p].reverse());
	}

	return postsByDate;
}

export const postsByMonthAndYear = (collection) => {
	return getByDate(collection, "MM-YYYY");
};

export const postsByYear = (collection) => {
	return getByDate(collection, "YYYY");
};
