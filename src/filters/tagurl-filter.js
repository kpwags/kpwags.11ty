module.exports = (tag) => {
	switch (tag.toUpperCase()) {
		case '.NET':
			return 'dotnet';
		case 'C#':
			return 'csharp';
		case 'F#':
			return 'fsharp';
		default:
			return tag.toLowerCase().replace(/\s/g, '-').replaceAll('.', '').replaceAll("'", '').replaceAll('?', '');
	}
};