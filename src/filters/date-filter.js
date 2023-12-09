const { DateTime } = require('luxon');

module.exports = (dateObj, format, zone) => {
	// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	if (typeof dateObj === 'string') {
		dateObj = new Date(dateObj);
	}
	return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(format || 'LLLL d, yyyy');
}