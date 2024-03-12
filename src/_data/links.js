const linkFetcher = require('../lib/linkFetcher.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const links = await linkFetcher();

			resolve(links);
		} catch (error) {
			reject(error);
		}
	});
};
