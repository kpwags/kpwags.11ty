const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginImages = require('./eleventy.config.images.js');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const publicPosts = require('./src/collections/publicPosts.js');

const dateFilter = require('./src/filters/date-filter.js');
const tagUrlFilter = require('./src/filters/tagurl-filter.js');
const toHtmlFilter = require('./src/filters/tohtml-filter.js');
const readingTimeFilter = require('./src/filters/readingTime-filter.js');

const inDepthShortcode = require('./src/shortcodes/inDepth-shortcode.js');
const youTubeShortcode = require('./src/shortcodes/youTube-shortcode.js');

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

    eleventyConfig.addFilter('readableDate', dateFilter);
    eleventyConfig.addFilter('tagUrlSlug', tagUrlFilter);
    eleventyConfig.addFilter('toHTML', toHtmlFilter);
    eleventyConfig.addFilter('readingTime', readingTimeFilter);

    eleventyConfig.addPairedLiquidShortcode('inDepth', inDepthShortcode);
    eleventyConfig.addLiquidShortcode('youTubeEmbed', youTubeShortcode);

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};
