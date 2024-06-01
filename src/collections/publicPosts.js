import { getBlogPosts } from '../lib/CollectionHelpers.js';

const publicPosts = (collection) => getBlogPosts(collection, false);

export default publicPosts;
