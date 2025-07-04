import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export default {
	layout: 'layouts/weeknote.html',
	tags: 'weeknote',
	eleventyComputed: {
		dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
		archiveDateString: ({ page }) => dayjs.utc(page.date).format('M-D'),
        shortDateString: ({ page }) => dayjs.utc(page.date).format('MMM D'),
	}
};
