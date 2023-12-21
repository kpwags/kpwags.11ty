const dayjs = require("dayjs");

exports.getYear = (val) => val.split('-')[1];

exports.getMonth = (val) => val.split('-')[0];

exports.getDateString = (val) => {
	const date = dayjs(`${this.getYear(val)}-${this.getMonth(val)}-1`);

	return date.format('MMMM YYYY');
}