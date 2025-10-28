const musicListingShortcode = (album) => `
<div
	class="item"
	data-albumid="${album.musicAlbumId}"
	data-topten="${album.isTopTen}"
	data-format="${album.formats
		.map((f) => f.name)
		.join(',')
		.toLowerCase()}"
	data-genre="${album.genres
		.map((g) => g.name.replaceAll(' ', '-'))
		.join(',')
		.toLowerCase()}"
	data-album="${encodeURIComponent(JSON.stringify(album))}"
>
	<div class="cover">
		<img src="${album.coverImageUrl}" alt="${album.title} by ${album.artist}" width="200" height="200" />
	</div>
	<div class="info">
		<div class="title">
			<button type="button" class="btn-link" data-id="${album.musicAlbumId}">${album.title}</button>
		</div>
		<div class="meta">${album.artist}</div>
	</div>
</div>
`;

export default musicListingShortcode;
