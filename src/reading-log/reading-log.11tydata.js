const { DateTime } = require('luxon');

module.exports = {
	layout: 'layouts/reading-log.html',
	tags: 'readinglog',
	eleventyComputed: {
		dateString: ({ page }) => DateTime.fromJSDate(page.date, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL),
	}
};
