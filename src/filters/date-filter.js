const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = (dateObj, format = 'MMMM D, YYYY', zone) => {
	if (typeof dateObj === 'string') {
		dateObj = new Date(dateObj);
	}

	return dayjs(dateObj).tz('America/New_York').format(format);
};
