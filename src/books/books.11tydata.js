const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

module.exports = {
	layout: 'layouts/book-notes.html',
	tags: 'booknotes',
	eleventyComputed: {
		dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
	}
};
