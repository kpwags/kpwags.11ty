const replyLinksShortcode = (title) => {
	return `
		<div class="titled-horizontal-list">
			<div class="lead">Reply via:</div>
			<ul>
				<li><a href="mailto:hello@kpwags.com?subject=${title}">Email</a></li>
				<li><a href="https://hachyderm.io/@kpwags" target="_blank" rel="noreferrer nofollow">Mastodon</a></li>
				<li><a href="https://bsky.app/profile/kpwags.com" target="_blank" rel="noreferrer nofollow">Bluesky</a></li>
			</ul>
		</div>
	`;
};

export default replyLinksShortcode;
