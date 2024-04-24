window.addEventListener('load', () => {
	const dialog = document.querySelector('dialog.media-thoughts-dialog');

	if (dialog) {
		const toggleButtons = document.querySelectorAll('button.toggle-thoughts');
		toggleButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				const mediaId = e.target.id.replace('toggle-btn-', '');

				const thoughtsDiv = document.getElementById(`thoughts-${mediaId}`);
				const thoughtsContainer = document.querySelector('dialog .thoughts-content');
				if (thoughtsDiv && thoughtsContainer) {
					thoughtsContainer.innerHTML = thoughtsDiv.innerHTML;
					dialog.showModal();
				}
			});
		});

		const modalCloseButton = document.querySelector('dialog.media-thoughts-dialog button');
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

	const musicAlbums = document.querySelectorAll('div.music-album');

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