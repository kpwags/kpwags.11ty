const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

module.exports = {
    layout: 'layouts/blog-post.html',
    tags: 'post',
    eleventyComputed: {
        dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
    }
};
