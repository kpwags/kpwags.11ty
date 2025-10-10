export const rssThankYou = (postContent) => {
	return `
		${postContent}
		<p>Thank you for reading this with RSS and keeping RSS alive! You're awesome!</p>
		<p><strong>Reply via:</strong> <a href="mailto:hello@kpwags.com">Email</a> &bull; <a href="https://hachyderm.io/@kpwags" target="_blank" rel="noreferrer nofollow">Mastodon</a> &bull; <a href="https://bsky.app/profile/kpwags.com" target="_blank" rel="noreferrer nofollow">Bluesky</a></p>
	`;
}