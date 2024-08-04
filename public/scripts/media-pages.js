window.addEventListener('load', () => {
	const dialog = document.querySelector('dialog.thoughts-dialog');

	if (dialog) {
		const toggleButtons = document.querySelectorAll('button.toggle-thoughts');
		toggleButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				const dataType = e.target.getAttribute('data-type');

				switch (dataType) {
					case 'video-game':
						showVideoGameThoughts(e.target.getAttribute('data-id'));
						break;
					case 'movie':
						showMovieThoughts(e.target.getAttribute('data-id'));
						break;
					case 'tv':
						showTelevisionThoughts(e.target.getAttribute('data-id'));
						break;
					case 'book':
						showBookThoughts(e.target.getAttribute('data-id'));
						break;
					default:
						const mediaId = e.target.id.replace('toggle-btn-', '');

						const thoughtsDiv = document.getElementById(`thoughts-${mediaId}`);
						const thoughtsContainer = document.querySelector('dialog .thoughts-content');
						if (thoughtsDiv && thoughtsContainer) {
							thoughtsContainer.innerHTML = thoughtsDiv.innerHTML;
							dialog.showModal();
						}
						break;
				}
			});
		});

		const modalCloseButton = document.querySelector('dialog.thoughts-dialog button');

		if (modalCloseButton) {
			modalCloseButton.addEventListener('click', () => dialog.close());
		}
	}

	const allMusicButton = document.getElementById('all-music');
	const top10MusicButton = document.getElementById('top10-music');
	const vinylMusicButton = document.getElementById('vinyl-music');
	const cdMusicButton = document.getElementById('cd-music');
	const digitalMusicButton = document.getElementById('digital-music');

	if (allMusicButton) {
		allMusicButton.addEventListener('click', () => filterMusic('all'));
	}

	if (top10MusicButton) {
		top10MusicButton.addEventListener('click', () => filterMusic('top10'));
	}

	if (vinylMusicButton) {
		vinylMusicButton.addEventListener('click', () => filterMusic('vinyl'));
	}

	if (cdMusicButton) {
		cdMusicButton.addEventListener('click', () => filterMusic('cd'));
	}

	if (digitalMusicButton) {
		digitalMusicButton.addEventListener('click', () => filterMusic('digital'));
	}
});

function addClassToElement(selector, className) {
	const element = document.querySelector(selector);
	if (element) {
		element.classList.add(className);
	}
}

function filterMusic(mode) {
	const musicFilterButtons = document.querySelectorAll('div.music-sidebar ul li button');
	musicFilterButtons.forEach((btn) => btn.classList.remove('active'));

	const musicAlbums = document.querySelectorAll('div.item');

	switch (mode) {
		case 'all':
			addClassToElement('#all-music', 'active');
			musicAlbums.forEach((album) => {
				album.classList.remove('hidden');
			});
			break;

		case 'top10':
			addClassToElement('#top10-music', 'active');
			musicAlbums.forEach((album) => {
				const isTopTen = album.getAttribute('data-topten');
				if (isTopTen && isTopTen === 'true') {
					album.classList.remove('hidden');
				} else {
					album.classList.add('hidden');
				}
			});
			break;

		case 'vinyl':
		case 'cd':
		case 'digital':
			toggleAlbumFormat(musicAlbums, mode);
			break;

		default:
			break;
	}
}

function toggleAlbumFormat(musicAlbums, format) {
	addClassToElement(`#${format}-music`, 'active');

	musicAlbums.forEach((album) => {
		const formats = album.getAttribute('data-formats');
		if (formats && formats.includes(format)) {
			album.classList.remove('hidden');
		} else {
			album.classList.add('hidden');
		}
	});
}

function showVideoGameThoughts(id) {
	const dialog = document.querySelector('dialog.thoughts-dialog.video-game')
	const videoGame = document.querySelector(`div[data-video-game-id="${id}"]`);

	if (dialog && videoGame) {
		const image = videoGame.querySelector('img.cover');
		const title = videoGame.querySelector('a').innerText;
		const rating = videoGame.querySelector('div.rating')?.innerHTML ?? '';
		const thoughts = videoGame.querySelector('div.thoughts')?.innerHTML ?? '';
		const platform = videoGame.getAttribute('data-platform');
		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('.title').innerHTML = title;
		dialog.querySelector('.platform').innerHTML = platform;
		dialog.querySelector('.rating').innerHTML = rating;
		dialog.querySelector('.thoughts').innerHTML = thoughts;
		dialogImage.setAttribute('src', image.getAttribute('src'));
		dialogImage.setAttribute('alt', image.getAttribute('alt'));

		dialog.showModal();
	}
}

function showMovieThoughts(id) {
	const dialog = document.querySelector('dialog.thoughts-dialog.movie')
	const movie = document.querySelector(`div[data-movie-id="${id}"]`);

	if (dialog && movie) {
		const image = movie.querySelector('img.cover');
		const title = movie.querySelector('a').innerText;
		const rating = movie.querySelector('div.rating')?.innerHTML ?? '';
		const thoughts = movie.querySelector('div.thoughts')?.innerHTML ?? '';
		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('.title').innerHTML = title;
		dialog.querySelector('.rating').innerHTML = rating;
		dialog.querySelector('.thoughts').innerHTML = thoughts;
		dialogImage.setAttribute('src', image.getAttribute('src'));
		dialogImage.setAttribute('alt', image.getAttribute('alt'));

		dialog.showModal();
	}
}

function showTelevisionThoughts(id) {
	const dialog = document.querySelector('dialog.thoughts-dialog.tv')
	const tvShow = document.querySelector(`div[data-tv-id="${id}"]`);

	if (dialog && tvShow) {
		const image = tvShow.querySelector('img.cover');
		const title = tvShow.querySelector('a').innerText;
		const rating = tvShow.querySelector('div.rating')?.innerHTML ?? '';
		const thoughts = tvShow.querySelector('div.thoughts')?.innerHTML ?? '';
		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('.title').innerHTML = title;
		dialog.querySelector('.rating').innerHTML = rating;
		dialog.querySelector('.thoughts').innerHTML = thoughts;
		dialogImage.setAttribute('src', image.getAttribute('src'));
		dialogImage.setAttribute('alt', image.getAttribute('alt'));

		dialog.showModal();
	}
}

function showBookThoughts(id) {
	const dialog = document.querySelector('dialog.thoughts-dialog.book')
	const book = document.querySelector(`div[data-book-id="${id}"]`);

	if (dialog && book) {
		const image = book.querySelector('img');
		const title = book.querySelector('.full-title').innerText;
		const rating = book.querySelector('div.rating')?.innerHTML ?? '';
		const thoughts = book.querySelector('div.thoughts')?.innerHTML ?? '';
		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('.title').innerHTML = title;
		dialog.querySelector('.rating').innerHTML = rating;
		dialog.querySelector('.thoughts').innerHTML = thoughts;
		dialogImage.setAttribute('src', image.getAttribute('src'));
		dialogImage.setAttribute('alt', image.getAttribute('alt'));

		dialog.showModal();
	}
}