import { XMLParser } from 'fast-xml-parser';
import getDomainFromUrl from '../filters/domain-filter.js';

const likes = () => {
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

export default likes;
