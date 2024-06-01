import { getBlogPostsAndReadingLogs } from '../lib/CollectionHelpers.js';

const allPublicPosts = (collection) => getBlogPostsAndReadingLogs(collection, false);

export default allPublicPosts;
