import linkFetcher from '../lib/linkFetcher.js';

const links = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const links = await linkFetcher();

			resolve(links);
		} catch (error) {
			reject(error);
		}
	});
};

export default links;
