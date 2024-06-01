const postTitleFilter = (title) => {
	if (title.startsWith('What I Learned:')) {
		return `<h1><span class="prefix">What I Learned:</span>${title.replace('What I Learned: ', '')}</h1>`
	}

	if (title.startsWith('Week Notes for')) {
		return `<h1><span class="prefix">Week Notes for</span>${title.replace('Week Notes for ', '')}</h1>`
	}

	return `<h1>${title}</h1>`;
};

export default postTitleFilter;