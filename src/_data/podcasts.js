import podcastFetcher from '../lib/podcastFetcher.js';

const podcasts = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const podcastData = await podcastFetcher();

			const podcasts = [];

			podcasts.push({ category: 'Business & Economics', shows: podcastData.filter((t) => t.category === 'Business & Economics') });
			podcasts.push({ category: 'Food', shows: podcastData.filter((t) => t.category === 'Food') });
			podcasts.push({ category: 'Gaming', shows: podcastData.filter((t) => t.category === 'Gaming') });
			podcasts.push({ category: 'Health & Fitness', shows: podcastData.filter((t) => t.category === 'Health & Fitness') });
			podcasts.push({ category: 'History', shows: podcastData.filter((t) => t.category === 'History') });
			podcasts.push({ category: 'News', shows: podcastData.filter((t) => t.category === 'News') });
			podcasts.push({ category: 'Personal Finance & Investing', shows: podcastData.filter((t) => t.category === 'Personal Finance & Investing') });
			podcasts.push({ category: 'Politics', shows: podcastData.filter((t) => t.category === 'Politics') });
			podcasts.push({ category: 'Science', shows: podcastData.filter((t) => t.category === 'Science') });
			podcasts.push({ category: 'Software Development', shows: podcastData.filter((t) => t.category === 'Software Development') });
			podcasts.push({ category: 'Sports', shows: podcastData.filter((t) => t.category === 'Sports') });
			podcasts.push({ category: 'Stories', shows: podcastData.filter((t) => t.category === 'Stories') });
			podcasts.push({ category: 'Tech & Design', shows: podcastData.filter((t) => t.category === 'Tech & Design') });
			podcasts.push({ category: 'Everything Else', shows: podcastData.filter((t) => t.category === 'Everything Else') });

			resolve(podcasts);
		} catch (error) {
			reject(error);
		}
	});
};

export default podcasts;
