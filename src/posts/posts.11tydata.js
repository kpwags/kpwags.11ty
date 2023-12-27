const { DateTime } = require('luxon');

module.exports = {
    layout: 'layouts/blog-post.html',
    tags: 'post',
    eleventyComputed: {
        dateString: ({ page }) => DateTime.fromJSDate(page.date, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL),
    }
};
