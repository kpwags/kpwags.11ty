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
});