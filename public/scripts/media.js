function getMedia(id, mediaType) {
	switch (mediaType) {
		case 'video-game':
			return document.querySelector(`div[data-video-game-id="${id}"]`);
		case 'movie':
			return document.querySelector(`div[data-movie-id="${id}"]`);
		case 'tv':
			return document.querySelector(`div[data-tv-id="${id}"]`);
		case 'book':
			return document.querySelector(`div[data-book-id="${id}"]`);
		default:
			return undefined;
	}
}

function showThoughts(id, mediaType) {
	const item = getMedia(id, mediaType);
	const dialog = document.querySelector('dialog.thoughts-dialog');

	if (item && dialog) {
		const image = item.querySelector('.cover img');
		const title = item.getAttribute('data-title') ? item.getAttribute('data-title') : item.querySelector('a').textContent;
		const rating = item.querySelector('div.rating')?.innerHTML ?? '';
		const thoughts = item.querySelector('div.thoughts')?.textContent ?? '';
		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('h2').textContent = title;
		dialog.querySelector('.rating').innerHTML = rating;
		dialog.querySelector('.thoughts').textContent = thoughts;
		dialogImage.setAttribute('src', image.getAttribute('src'));
		dialogImage.setAttribute('alt', image.getAttribute('alt'));

		if (mediaType === 'video-game') {
			const platform = item.getAttribute('data-platform');

			dialog.querySelector('.platform').textContent = platform;
			dialog.querySelector('.platform').classList.remove('hidden');
		} else if (mediaType === 'book') {
			const format = item.getAttribute('data-format');

			dialog.querySelector('.platform').textContent = format;
			dialog.querySelector('.platform').classList.remove('hidden');
		} else {
			dialog.querySelector('.platform').classList.add('hidden');
		}

		dialog.showModal();
	}
}

