const musicListingShortcode = (album) => `
<div class="music-album" data-topten="${album.isTopTen}" data-formats="${album.formats.join(",").toLowerCase()}">
	<div>
		<img src="${album.coverUrl}" alt="${album.title} by ${album.artist}" class="music-album-cover" />
	</div>
	<div>
		<div class="music-album-title">${album.title}</div>
		<div class="music-album-meta">${album.artist}</div>
	</div>
</div>
`;

export default musicListingShortcode;
