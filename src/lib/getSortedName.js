export const getSortedName = (val) => {
	if (val.startsWith('The ') || val.startsWith('the ')) {
		return val.substring(4);
	}

	if (val.startsWith('A ') || val.startsWith('a ')) {
		return val.substring(2);
	}

	return val;
};
