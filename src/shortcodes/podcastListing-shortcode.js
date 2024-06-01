const podcastListingShortcode = (podcast) => `
<div class="podcast">
	<div>
		<img src="${podcast.cover}" alt="${podcast.title}" class="podcast-cover" />
	</div>
	<div>
		<div class="podcast-title">
			<a href="${podcast.link}">${podcast.title}</a>
		</div>
	</div>
</div>
`;

export default podcastListingShortcode;
