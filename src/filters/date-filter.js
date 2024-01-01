const { DateTime } = require('luxon');

module.exports = (dateObj, format = 'MMMM D, YYYY', zone) => {
	if (typeof dateObj === 'string') {
		dateObj = new Date(dateObj);
	}

	return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_FULL)
};
