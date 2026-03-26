export default (title, date, subtitle) => {
	const heading = () => {
		if (title.toLowerCase().startsWith('what i learned:')) {
			return `<span class="prefix">What I Learned:</span>${title.replace('What I Learned: ', '')}`;
		}

		if (title.toLowerCase().startsWith('week notes for')) {
			return `<span class="prefix">Week Notes for</span>${title.replace('Week Notes for ', '')}`;
		}

		if (title.toLowerCase().startsWith('reading log - ')) {
			return `<span class="prefix">Reading Log For</span>${title.replace('Reading Log - ', '')}`;
		}

		if (title.toLowerCase().startsWith('digging into blazor - ')) {
			return `<span class="prefix">Digging into Blazor:</span>${title.replace('Digging Into Blazor - ', '')}`;
		}

		return title;
	};

	const outputSubtitle = () => {
		if ((subtitle ?? '').length === 0) {
			return '';
		}

		return `<div class="subtitle">${subtitle}</div>`;
	}

	return `
		<div class="post-heading">
			<h1>${heading()}</h1>
			${outputSubtitle()}
			<div class="metadata">${date}</div>
		</div>
	`;
}
