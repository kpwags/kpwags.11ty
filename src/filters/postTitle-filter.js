module.exports = (title) => {
	if (title.startsWith('What I Learned:')) {
		return `<h1><span class="prefix">What I Learned:</span>${title.replace('What I Learned: ', '')}</h1>`
	}

	return `<h1>${title}</h1>`;
};
