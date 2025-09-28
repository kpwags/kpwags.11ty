window.addEventListener('load', function () {
	const musicDialog = document.querySelector('dialog.music-dialog');

	const musicDialogCloseButton = document.querySelector('dialog.music-dialog button');

	if (musicDialogCloseButton) {
		musicDialogCloseButton.addEventListener('click', () => musicDialog.close());
	}
});

function attachMusicAlbumEvents(selector) {
	const albumButtons = document.querySelectorAll(selector);

	albumButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const id = e.target.getAttribute('data-id');
			showMusicDialog(id);
		});
	});
}

function showMusicDialog(id) {
	const item = document.querySelector(`div[data-albumid="${id}"]`)
	const dialog = document.querySelector('dialog.music-dialog');

	if (item && dialog) {
		const data = decodeURIComponent(item.getAttribute('data-album'));
		const album = JSON.parse(data);

		const dialogImage = dialog.querySelector('img');

		dialog.querySelector('.title').textContent = album.title;
		dialog.querySelector('.artist').textContent = album.artist;
		dialogImage.setAttribute('src', album.coverImageUrl);
		dialogImage.setAttribute('alt', `The cover art for ${album.title} by ${album.artist}`);

		const genre = dialog.querySelector('.genres');
		const genreHtml = buildTagString(album.genres);

		const format = dialog.querySelector('.formats');
		const formatHtml = buildTagString(album.formats);

		if (genreHtml.length > 0) {
			genre.innerHTML = genreHtml;
			genre.classList.remove('hidden');
		} else {
			genre.classList.add('hidden');
		}

		if (formatHtml.length > 0) {
			format.innerHTML = formatHtml;
			format.classList.remove('hidden');
		} else {
			format.classList.add('hidden');
		}

		const thoughts = dialog.querySelector('.thoughts');
		if (album.thoughts.length > 0) {
			thoughts.innerHTML = album.thoughts;
			thoughts.classList.remove('hidden');
		} else {
			thoughts.classList.add('hidden');
		}

		const trackList = dialog.querySelector('ol.track-list');

		if (album.tracks.length > 0) {
			trackList.innerHTML = '';

			trackList.setAttribute('start', album.tracks[0].trackNumber.toString())

			album.tracks.forEach((track) => {
				const li = document.createElement('li');
				li.appendChild(document.createTextNode(track.title));
				trackList.appendChild(li);
			});

			dialog.querySelector('h2.track-list-title').classList.remove('hidden');
			trackList.classList.remove('hidden');
		} else {
			dialog.querySelector('h2.track-list-title').classList.add('hidden');
			trackList.classList.add('hidden');
		}

		dialog.showModal();
	}
}
