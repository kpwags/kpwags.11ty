const CollectionHelpers = require('../lib/CollectionHelpers');

module.exports = (collection) => CollectionHelpers.getBlogPostsAndReadingLogs(collection, false);
