const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginImages = require('./eleventy.config.images.js');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const publicPosts = require('./src/collections/publicPosts.js');
const allPublicPosts = require('./src/collections/allPublicPosts.js');
const postsByYear = require('./src/collections/postsByYear.js');
const stats = require('./src/collections/stats.js');

const dateFilter = require('./src/filters/date-filter.js');
const tagUrlFilter = require('./src/filters/tagurl-filter.js');
const toHtmlFilter = require('./src/filters/tohtml-filter.js');
const readingTimeFilter = require('./src/filters/readingTime-filter.js');
const archivesMonthYear = require('./src/filters/archivesMonthYear-filter.js');
const lengthFilter = require('./src/filters/length-filter.js');

const inDepthShortcode = require('./src/shortcodes/inDepth-shortcode.js');
const youTubeShortcode = require('./src/shortcodes/youTube-shortcode.js');
const starRatingShortcode = require('./src/shortcodes/starRating-shortcode.js');
const tagListShortcode = require('./src/shortcodes/tagList-shortcode.js');
const movieListingShortcode = require('./src/shortcodes/movieListing-shortcode.js');
const tvListingShortcode = require('./src/shortcodes/tvListing-shortcode.js');
const musicListingShortcode = require('./src/shortcodes/musicListing-shortcode.js');
const videoGameListingShortcode = require('./src/shortcodes/videoGameListing-shortcode.js');
const bookListingShortcode = require('./src/shortcodes/bookListing-shortcode.js');
const podcastListingShortcode = require('./src/shortcodes/podcastListing-shortcode.js');
const progressBarShortcode = require('./src/shortcodes/progressBar-shortcode.js');

module.exports = function (eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        './public/': '/',
        './node_modules/prismjs/themes/prism-okaidia.css': '/css/prism-okaidia.css',
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '<!-- excerpt -->',
    });

    // App plugins
    eleventyConfig.addPlugin(pluginImages);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 },
    });
    eleventyConfig.addPlugin(pluginWebc, {
        components: "src/_includes/components/*.webc",
    });

    eleventyConfig.addCollection('publicPosts', publicPosts);
    eleventyConfig.addCollection('postsAndReadingLogs', allPublicPosts);
    eleventyConfig.addCollection('postsByYear', postsByYear);
    eleventyConfig.addCollection('stats', stats);

    eleventyConfig.addFilter('readableDate', dateFilter);
    eleventyConfig.addFilter('tagUrlSlug', tagUrlFilter);
    eleventyConfig.addFilter('toHTML', toHtmlFilter);
    eleventyConfig.addFilter('readingTime', readingTimeFilter);
    eleventyConfig.addFilter('length', lengthFilter);
    eleventyConfig.addFilter('archivesGetMonth', archivesMonthYear.getMonth);
    eleventyConfig.addFilter('archivesGetYear', archivesMonthYear.getYear);
    eleventyConfig.addFilter('archivesGetDateString', archivesMonthYear.getDateString);

    eleventyConfig.addPairedLiquidShortcode('inDepth', inDepthShortcode);
    eleventyConfig.addLiquidShortcode('youTubeEmbed', youTubeShortcode);
    eleventyConfig.addLiquidShortcode('starRating', starRatingShortcode);
    eleventyConfig.addLiquidShortcode('tagList', tagListShortcode);
    eleventyConfig.addLiquidShortcode('movieListing', movieListingShortcode);
    eleventyConfig.addLiquidShortcode('tvListing', tvListingShortcode);
    eleventyConfig.addLiquidShortcode('musicListing', musicListingShortcode);
    eleventyConfig.addLiquidShortcode('videoGameListing', videoGameListingShortcode);
    eleventyConfig.addLiquidShortcode('bookListing', bookListingShortcode);
    eleventyConfig.addLiquidShortcode('podcastListing', podcastListingShortcode);
    eleventyConfig.addLiquidShortcode('progressBar', progressBarShortcode);

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
        ],
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};
