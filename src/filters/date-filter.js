import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const dateFilter = (dateObj, format = 'MMMM D, YYYY') => {
	if (typeof dateObj === 'string') {
		dateObj = new Date(dateObj);
	}

	return dayjs.utc(dateObj).format(format);
};

export default dateFilter;
