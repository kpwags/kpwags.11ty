window.addEventListener('load', () => {
	const toggleButtons = document.querySelectorAll('button.toggle-thoughts');
	toggleButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const toggleButton = document.getElementById(e.target.id);
			const mediaId = e.target.id.replace('toggle-btn-', '');

			if (toggleButton) {
				if (e.target.innerText === 'View Thoughts') {
					toggleButton.innerText = 'Hide Thoughts';
				} else {
					toggleButton.innerText = 'View Thoughts';
				}
			}

			const thoughtsDiv = document.getElementById(`thoughts-${mediaId}`);
			if (thoughtsDiv) {
				thoughtsDiv.classList.toggle('hidden');
			}
		});
	});
});