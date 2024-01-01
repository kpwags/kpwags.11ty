const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);


module.exports = (dateObj, format = 'MMMM D, YYYY', zone) => {
	if (typeof dateObj === 'string') {
		dateObj = new Date(dateObj);
	}

	return dayjs.utc(dateObj).format(format);
};
