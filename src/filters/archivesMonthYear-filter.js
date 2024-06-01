import dayjs from 'dayjs';

export const getYear = (val) => val.split('-')[1];

export const getMonth = (val) => val.split('-')[0];

export const getDateString = (val) => {
	const date = dayjs(`${getYear(val)}-${getMonth(val)}-1`);

	return date.format('MMMM YYYY');
};
