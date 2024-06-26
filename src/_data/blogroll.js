const blogRoll = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const blogRoll = [
				{
					title: 'Andy Bell',
					link: 'https://andy-bell.co.uk',
					rssLink: 'https://andy-bell.co.uk/feed.xml',
					description: 'Designer and front end developer often writing about CSS and web design.',
				},
				{
					title: 'Chris Coyier',
					link: 'https://chriscoyier.net',
					rssLink: 'https://chriscoyier.net/feed/',
					description: 'Creator of CSS-Tricks and the Co-Founder of Codepen.',
				},
				{
					title: 'Cory Dransfeldt',
					link: 'https://coryd.dev',
					rssLink: 'https://feedpress.me/coryd',
					description: 'Software developer often writing about the web and other things.',
				},
				{
					title: 'Dave Rupert',
					link: 'https://daverupert.com',
					rssLink: 'https://daverupert.com/atom.xml',
					description: 'Developer and co-host of ShopTalk.',
				},
				{
					title: 'Paul Stamatiou',
					link: 'https://paulstamatiou.com',
					rssLink: 'https://paulstamatiou.com/posts.xml',
					description: 'Designer with facinating pieces aroud code and design.',
				},
				{
					title: 'Robb Knight',
					link: 'https://rknight.me',
					rssLink: 'https://rknight.me/subscribe/posts/atom.xml',
					description: 'Developer writing about the internet and technology.',
				},
			];

			resolve(blogRoll);
		} catch (error) {
			reject(error);
		}
	});
};

export default blogRoll;
