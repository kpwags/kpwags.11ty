const { XMLParser } = require('fast-xml-parser');

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
				const domain = (new URL(i.link));

				likes.push({
					title: i.title,
					link: i.link,
					domain: domain.hostname.startsWith('www.') ? domain.hostname.replace('www.', '') : domain.hostname,
				});
			});

			resolve(likes.slice(0, 25));
		} catch (error) {
			reject(error);
		}
	});
};
