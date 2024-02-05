module.exports = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const blogRoll = [
				{
					title: 'Andy Bell',
					link: 'https://andy-bell.co.uk',
					rssLink: 'https://andy-bell.co.uk/feed.xml',
				},
				{
					title: 'Chris Coyier',
					link: 'https://chriscoyier.net',
					rssLink: 'https://chriscoyier.net/feed/',
				},
				{
					title: 'Cory Dransfeldt',
					link: 'https://coryd.dev',
					rssLink: 'https://feedpress.me/coryd',
				},
				{
					title: 'Dave Rupert',
					link: 'https://daverupert.com',
					rssLink: 'https://daverupert.com/atom.xml',
				},
				{
					title: 'Lynn Fisher',
					link: 'https://lynnandtonic.com',
					rssLink: 'https://lynnandtonic.com/feed.xml',
				},
				{
					title: 'Matt Birchler',
					link: 'https://birchtree.me',
					rssLink: 'https://birchtree.me/rss/',
				},
				{
					title: 'Matthias Ott',
					link: 'https://matthiasott.com',
					rssLink: 'https://matthiasott.com/rss',
				},
				{
					title: 'Rach Smith',
					link: 'https://rachsmith.com',
					rssLink: 'https://rachsmith.com/feed.xml',
				},
				{
					title: 'Robb Knight',
					link: 'https://rknight.me',
					rssLink: 'https://rknight.me/subscribe/posts/atom.xml',
				},
			];

			resolve(blogRoll);
		} catch (error) {
			reject(error);
		}
	});
};
