import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginImages from './eleventy.config.images.js';
import pluginWebc from '@11ty/eleventy-plugin-webc';
import { EleventyRenderPlugin } from "@11ty/eleventy";

import { archives } from './src/collections/archives.js';
import { tags } from './src/collections/tags.js';
import stats from './src/collections/stats.js';
import { pinnedBlogPosts } from './src/collections/pinnedBlogPosts.js';
import { allContent } from './src/collections/allContent.js';
import { blogNotes } from './src/collections/blogNotes.js';
import { blogPosts } from './src/collections/blogPosts.js';

import dateFilter from './src/filters/date-filter.js';
import tagUrlFilter from './src/filters/tagurl-filter.js';
import toHtmlFilter from './src/filters/tohtml-filter.js';
import { cleanTitle } from './src/filters/cleanTitle.js';
import readingTimeFilter from './src/filters/readingTime-filter.js';
import { getDateString, getMonth, getYear } from './src/filters/archivesMonthYear-filter.js';
import lengthFilter from './src/filters/length-filter.js';
import { bookNoteTitlePrefix } from './src/filters/rssPrefixes-filter.js';
import domainFilter from './src/filters/domain-filter.js';
import { linkContent, linkMostRecentDate } from './src/filters/link-filters.js';
import { rssThankYou } from './src/filters/rssThankYou-filter.js';
import { tagFilter } from './src/filters/tagFilter-filter.js';

import inDepthShortcode from './src/shortcodes/inDepth-shortcode.js';
import youTubeShortcode from './src/shortcodes/youTube-shortcode.js';
import starRatingShortcode from './src/shortcodes/starRating-shortcode.js';
import tagListShortcode from './src/shortcodes/tagList-shortcode.js';
import movieListingShortcode from './src/shortcodes/movieListing-shortcode.js';
import tvListingShortcode from './src/shortcodes/tvListing-shortcode.js';
import musicListingShortcode from './src/shortcodes/musicListing-shortcode.js';
import videoGameListingShortcode from './src/shortcodes/videoGameListing-shortcode.js';
import bookListingShortcode from './src/shortcodes/bookListing-shortcode.js';
import progressBarShortcode from './src/shortcodes/progressBar-shortcode.js';
import bookNoteShortcode from './src/shortcodes/bookNote-shortcode.js';
import noteListingShortcode from './src/shortcodes/noteListing-shortcode.js';
import replyLinksShortcode from './src/shortcodes/replyLinks-shortcode.js';
import postTitleShortcode from './src/shortcodes/postTitle-shortcode.js';
import concertShortcode from './src/shortcodes/concert-shortcode.js';

export default function (eleventyConfig) {
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

    eleventyConfig.addCollection('publicPosts', (collection) => blogPosts(collection, { includePolitics: true, includeRssOnly: false }));
    eleventyConfig.addCollection('archives', archives);
    eleventyConfig.addCollection('stats', stats);
    eleventyConfig.addCollection('everything', allContent);
    eleventyConfig.addCollection('postsNoPolitics', (collection) => blogPosts(collection, { includePolitics: false, includeRssOnly: true }));
    eleventyConfig.addCollection('notesNoPolitics', (collection) => blogNotes(collection, { includePolitics: false }));
    eleventyConfig.addCollection('everythingNoPolitics', (collection) => allContent(collection, false));
    eleventyConfig.addCollection('pinnedPosts', pinnedBlogPosts);
    eleventyConfig.addCollection('tags', tags);

    eleventyConfig.addFilter('readableDate', dateFilter);
    eleventyConfig.addFilter('tagUrlSlug', tagUrlFilter);
    eleventyConfig.addFilter('tagFilter', tagFilter);
    eleventyConfig.addFilter('toHTML', toHtmlFilter);
    eleventyConfig.addFilter('readingTime', readingTimeFilter);
    eleventyConfig.addFilter('length', lengthFilter);
    eleventyConfig.addFilter('archivesGetMonth', getMonth);
    eleventyConfig.addFilter('archivesGetYear', getYear);
    eleventyConfig.addFilter('archivesGetDateString', getDateString);
    eleventyConfig.addFilter('bookNoteTitlePrefix', bookNoteTitlePrefix);
    eleventyConfig.addFilter('domainFromUrl', domainFilter);
    eleventyConfig.addFilter('linkContent', linkContent);
    eleventyConfig.addFilter('linkMostRecentDate', linkMostRecentDate);
    eleventyConfig.addFilter('cleanTitle', cleanTitle);
    eleventyConfig.addFilter('rssThankYou', rssThankYou);

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
    eleventyConfig.addShortcode('progressBar', progressBarShortcode);
    eleventyConfig.addShortcode('bookNote', bookNoteShortcode);
    eleventyConfig.addShortcode('noteListing', noteListingShortcode);
    eleventyConfig.addShortcode('replyLinks', replyLinksShortcode);
    eleventyConfig.addShortcode('postTitle', postTitleShortcode);
    eleventyConfig.addShortcode('concert', concertShortcode);

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
}
