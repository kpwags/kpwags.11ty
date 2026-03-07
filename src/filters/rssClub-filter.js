export const rssClub = (post) => {
	if (post.data.rss_only) {
		return '<p>It’s a secret to everyone! This post is for RSS subscribers only. <a href="https://kpwags.com/rss-club/">Read more about RSS Club</a>.</p>'
	}

	return '';
};
