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
		postMonth: ({ page }) => dayjs.utc(page.date).format('MM'),
		postYear: ({ page }) => dayjs.utc(page.date).format('YYYY'),
		postType: { name: 'Week Note', css: 'week-note' },
	}
};
