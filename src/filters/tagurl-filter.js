const tagUrlFilter = (tag) => {
	if (typeof tag === 'undefined') {
		return '';
	}

	switch (tag.toUpperCase()) {
		case '.NET':
			return 'dotnet';
		case 'C#':
			return 'csharp';
		case 'F#':
			return 'fsharp';
		case '':
			return '';
		default:
			return tag.toLowerCase().replace(/\s/g, '-').replaceAll('.', '').replaceAll("'", '').replaceAll('?', '');
	}
};

export default tagUrlFilter;
