const { XMLParser } = require('fast-xml-parser');
const getDomainFromUrl = require('../filters/domain-filter.js');

module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const likes = [];

			const res = await fetch('https://feedbin.com/starred/a9276a5b66c7d72ffb7b7f64628f70a5.xml');

			if (!res.ok) {
				reject('error during fetch');
			}

			const response = await res.text();

			const parser = new XMLParser();
			const data = parser.parse(response);

			data.rss.channel.item.forEach((i) => {
				likes.push({
					title: i.title,
					link: i.link,
					domain: getDomainFromUrl(i.link),
				});
			});

			resolve(likes.slice(0, 25));
		} catch (error) {
			reject(error);
		}
	});
};
