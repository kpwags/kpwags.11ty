const postTitleFilter = (title) => {
	if (title.toLowerCase().startsWith('what i learned:')) {
		return `<h1><span class="prefix">What I Learned:</span>${title.replace('What I Learned: ', '')}</h1>`;
	}

	if (title.toLowerCase().startsWith('week notes for')) {
		return `<h1><span class="prefix">Week Notes for</span>${title.replace('Week Notes for ', '')}</h1>`;
	}

	if (title.toLowerCase().startsWith('reading log - ')) {
		return `<h1><span class="prefix">Reading Log For</span>${title.replace('Reading Log - ', '')}</h1>`;
	}

	if (title.toLowerCase().startsWith('digging into blazor - ')) {
		return `<h1><span class="prefix">Digging into Blazor:</span>${title.replace('Digging Into Blazor - ', '')}</h1>`;
	}

	return `<h1>${title}</h1>`;
};

export default postTitleFilter;