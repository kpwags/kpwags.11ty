export const getUniqueValues = (obj) => {
	return [...new Set(obj)];
};

export const getSortedName = (val) => {
	if (val.startsWith('The ')) {
		return val.substring(4);
	}

	return val;
};
