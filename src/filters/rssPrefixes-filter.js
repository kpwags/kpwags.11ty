export const rssOnlyPrefix = (post) => {
	if (post.data.rss_only === true) {
		return `
<p><em>This post is for the <a href="https://kpwags.com/posts/2022/08/15/welcome-to-the-rss-club">Secret RSS Club Readers</a>.</em></p>
${post.templateContent}
		`;
	}

	return post.templateContent;
}

export const bookNoteTitlePrefix = (post) => {
	if (post.data.tags.includes('booknotes')) {
		return `Book Notes for ${post.data.title}`;
	}

	return post.data.title;
}