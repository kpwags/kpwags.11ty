const { DateTime } = require('luxon');
const MarkdownIt = require('markdown-it');

const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const pluginImages = require('./eleventy.config.images.js');

module.exports = function (eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        './public/': '/',
        './node_modules/prismjs/themes/prism-okaidia.css': '/css/prism-okaidia.css',
    });

    // App plugins
    eleventyConfig.addPlugin(pluginImages);

    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 },
    });

    eleventyConfig.addFilter('readableDate', (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        if (typeof dateObj === 'string') {
            dateObj = new Date(dateObj);
        }
        return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(format || 'LLLL d, yyyy');
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('tagUrlSlug', (tag) => {
        switch (tag.toUpperCase()) {
            case '.NET':
                return 'dotnet';
            case 'C#':
                return 'csharp';
            case 'F#':
                return 'fsharp';
            default:
                return tag.toLowerCase().replace(/\s/g, '-').replaceAll('.', '').replaceAll("'", '').replaceAll('?', '');
        }
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: '<!-- excerpt -->',
    });

    eleventyConfig.addFilter('toHTML', (str) => {
        return new MarkdownIt({ html: true, linkify: true }).renderInline(str);
    });
};
