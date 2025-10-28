const replyLinksShortcode = (title) => {
	return `
		<ul class="titled-horizontal-list">
			<li><strong>Reply via:</strong></li>
			<li><a href="mailto:hello@kpwags.com?subject=${title}">Email</a></li>
			<li><a href="https://hachyderm.io/@kpwags" target="_blank" rel="noreferrer nofollow">Mastodon</a></li>
			<li><a href="https://bsky.app/profile/kpwags.com" target="_blank" rel="noreferrer nofollow">Bluesky</a></li>
		</ul>
	`;
};

export default replyLinksShortcode;
