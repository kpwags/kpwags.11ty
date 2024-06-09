import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export default {
	layout: 'layouts/notes.html',
	tags: 'shortnotes',
	eleventyComputed: {
		dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
	}
};
