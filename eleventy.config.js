const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginImages = require('./eleventy.config.images.js');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const publicPosts = require('./src/collections/publicPosts.js');
const allPublicPosts = require('./src/collections/allPublicPosts.js');
const { postsByMonthAndYear, postsByYear } = require('./src/collections/postsByDate.js');
const stats = require('./src/collections/stats.js');
const everything = require('./src/collections/everything.js');

const dateFilter = require('./src/filters/date-filter.js');
const tagUrlFilter = require('./src/filters/tagurl-filter.js');
const toHtmlFilter = require('./src/filters/tohtml-filter.js');
const readingTimeFilter = require('./src/filters/readingTime-filter.js');
const archivesMonthYear = require('./src/filters/archivesMonthYear-filter.js');
const lengthFilter = require('./src/filters/length-filter.js');
const rssPrefixes = require('./src/filters/rssPrefixes-filter.js');
const domainFilter = require('./src/filters/domain-filter.js');
const postTitle = require('./src/filters/postTitle-filter.js');
const linkFilters = require('./src/filters/link-filters.js');

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
const blogPostShortcode = require('./src/shortcodes/blogPost-shortcode.js');
const bookNoteShortcode = require('./src/shortcodes/bookNote-shortcode.js');
const noteListingShortcode = require('./src/shortcodes/noteListing-shortcode.js');

module.exports = function (eleventyConfig) {
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
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 },
    });
    eleventyConfig.addPlugin(pluginWebc, {
        components: "./src/_components/**/*.webc",
    });

    eleventyConfig.addCollection('publicPosts', publicPosts);
    eleventyConfig.addCollection('postsAndReadingLogs', allPublicPosts);
    eleventyConfig.addCollection('postsByMonthAndYear', postsByMonthAndYear);
    eleventyConfig.addCollection('postsByYear', postsByYear);
    eleventyConfig.addCollection('stats', stats);
    eleventyConfig.addCollection('everything', everything);

    eleventyConfig.addFilter('readableDate', dateFilter);
    eleventyConfig.addFilter('tagUrlSlug', tagUrlFilter);
    eleventyConfig.addFilter('toHTML', toHtmlFilter);
    eleventyConfig.addFilter('readingTime', readingTimeFilter);
    eleventyConfig.addFilter('length', lengthFilter);
    eleventyConfig.addFilter('archivesGetMonth', archivesMonthYear.getMonth);
    eleventyConfig.addFilter('archivesGetYear', archivesMonthYear.getYear);
    eleventyConfig.addFilter('archivesGetDateString', archivesMonthYear.getDateString);
    eleventyConfig.addFilter('bookNoteTitlePrefix', rssPrefixes.bookNoteTitlePrefix);
    eleventyConfig.addFilter('rssOnlyPrefix', rssPrefixes.rssOnlyPrefix);
    eleventyConfig.addFilter('domainFromUrl', domainFilter);
    eleventyConfig.addFilter('postTitle', postTitle);
    eleventyConfig.addFilter('linkContent', linkFilters.linkContent);
    eleventyConfig.addFilter('linkMostRecentDate', linkFilters.linkMostRecentDate);

    eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
    eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);

    eleventyConfig.addPairedShortcode('inDepth', inDepthShortcode);
    eleventyConfig.addShortcode('youTubeEmbed', youTubeShortcode);
    eleventyConfig.addShortcode('starRating', starRatingShortcode);
    eleventyConfig.addShortcode('tagList', tagListShortcode);
    eleventyConfig.addShortcode('movieListing', movieListingShortcode);
    eleventyConfig.addShortcode('tvListing', tvListingShortcode);
    eleventyConfig.addShortcode('musicListing', musicListingShortcode);
    eleventyConfig.addShortcode('videoGameListing', videoGameListingShortcode);
    eleventyConfig.addShortcode('bookListing', bookListingShortcode);
    eleventyConfig.addShortcode('podcastListing', podcastListingShortcode);
    eleventyConfig.addShortcode('progressBar', progressBarShortcode);
    eleventyConfig.addShortcode('blogPost', blogPostShortcode);
    eleventyConfig.addShortcode('bookNote', bookNoteShortcode);
    eleventyConfig.addShortcode('noteListing', noteListingShortcode);

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
