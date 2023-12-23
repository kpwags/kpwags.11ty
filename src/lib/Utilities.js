exports.getUniqueValues = (obj) => {
	return [...new Set(obj)];
};

exports.getSortedName = (val) => {
	if (val.startsWith('The ')) {
		return val.substring(4);
	}

	return val;
};