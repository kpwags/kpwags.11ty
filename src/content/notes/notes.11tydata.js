import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

export default {
	layout: 'layouts/notes.html',
	tags: 'shortnotes',
	eleventyComputed: {
		dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
		shortDateString: ({ page }) => dayjs.utc(page.date).format('MMM D'),
		dateStringDMYYYY: ({ page }) => dayjs.utc(page.date).format('D MMM YYYY'),
		postMonth: ({ page }) => dayjs.utc(page.date).format('MM'),
		postYear: ({ page }) => dayjs.utc(page.date).format('YYYY'),
		postType: { name: 'Note', css: 'note' },
	}
};
