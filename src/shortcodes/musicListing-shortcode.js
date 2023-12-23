module.exports = (album) => `
<div class="music-album">
	<div>
		<img src="${album.coverUrl}" alt="${album.title} by ${album.artist}" class="music-album-cover" />
	</div>
	<div>
		<div class="music-album-title">${album.title}</div>
		<div class="music-album-meta">${album.artist}</div>
	</div>
</div>
`;
