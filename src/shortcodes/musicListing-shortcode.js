const musicListingShortcode = (album) => `
<div class="item" data-topten="${album.isTopTen}" data-formats="${album.formats.map((f) => f.name).join(",").toLowerCase()}">
	<div class="cover">
		<img src="${album.coverImageUrl}" alt="${album.title} by ${album.artist}" width="150" height="150" />
	</div>
	<div class="info">
		<div class="title">${album.title}</div>
		<div class="meta">${album.artist}</div>
	</div>
</div>
`;

export default musicListingShortcode;
