export const getUniqueItems = (arr) => [...new Set(arr)];

export const sortByTitle = (a, b) => {
	const articles = ['a', 'an', 'the'],
		re = new RegExp('^(?:(' + articles.join('|') + ') )(.*)$'), // e.g. /^(?:(foo|bar) )(.*)$/
		replacor = function (_, $1, $2) {
			return $2 + ', ' + $1;
		};
	a = a.toLowerCase().replace(re, replacor);
	b = b.toLowerCase().replace(re, replacor);

	return a === b ? 0 : a < b ? -1 : 1;
};

export const sortByDate = (a, b, direction = 'DESC') => {
	if (direction === 'DESC') {
		return new Date(b).getTime() - new Date(a).getTime();
	}

	return new Date(a).getTime() - new Date(b).getTime();
};

export const sortAlphabetically = (a, b) => a.localeCompare(b);

export const sortNumerically = (a, b, direction = 'ASC') => {
	if (direction === 'ASC') {
		return a - b;
	}

	return b - a;
};