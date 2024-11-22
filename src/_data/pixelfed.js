import { XMLParser } from 'fast-xml-parser';

const pixelfed = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const images = [];

			const res = await fetch('https://pixelfed.social/users/kpwags.atom');

			if (!res.ok) {
				reject('error during fetch');
			}

			const response = await res.text();

			const options = {
				ignoreAttributes: false
			};

			const parser = new XMLParser(options);
			const data = parser.parse(response);

			data.feed.entry.forEach((i) => {
				images.push({
					link: i.id,
					title: i.title,
					image: i['media:content']['@_url'],
				});
			});

			resolve(images.slice(0, 3));
		} catch (error) {
			reject(error);
		}
	});
};

export default pixelfed;
