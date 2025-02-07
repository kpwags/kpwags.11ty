import { getEverything, getBlogPosts, getNotes } from '../lib/CollectionHelpers.js';

export const postsNoPolitics = (collection) => getBlogPosts(collection, true, false);
export const notesNoPolitics = (collection) => getNotes(collection, false);
export const everythingNoPolitics = (collection) => getEverything(collection, true, false);
