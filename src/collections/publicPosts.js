import { blogPosts } from './blogPosts.js';

const publicPosts = (collection) => blogPosts(collection, {
	includeRssOnly: false,
	includePolitics: true,
});

export default publicPosts;
