const podcastListingShortcode = (podcast) => `
<div class="item">
	<div class="cover">
		<img src="${podcast.coverImageUrl}" alt="${podcast.name}" class="podcast-cover" />
	</div>
	<div class="podcast-title">
		<a href="${podcast.link}">${podcast.name}</a>
	</div>
</div>
`;

export default podcastListingShortcode;
