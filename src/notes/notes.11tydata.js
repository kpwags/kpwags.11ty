const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

module.exports = {
	layout: 'layouts/notes.html',
	tags: 'shortnotes',
	eleventyComputed: {
		dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
	}
};
