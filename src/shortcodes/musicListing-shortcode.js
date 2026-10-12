const musicListingShortcode = (album) => `
<div
	class="music-album"
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
	<div class="container">
		<div class="cover">
			<img src="${album.coverImageUrl}" alt="${album.title} by ${album.artist}" width="200" height="200" />
		</div>
		<div class="info">
			<div class="title">
				<a href="/music/album/${album.musicAlbumId}/">${album.title}</a>
			</div>
			<div class="meta">${album.artist}</div>
		</div>
	</div>
</div>
`;

export default musicListingShortcode;
