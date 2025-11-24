import dayjs from 'dayjs';

export default (concert) => {
	const getHeadliner = (headliner) => {
		if (headliner.length === 2){
			return `${headliner[0]} & ${headliner[1]}`;
		}

		return headliner[0];
	}

	const getOpeneners = (openers) => {
		if (openers.length === 0) {
			return '';
		}

		let html = '<div class="openers">with ';

		if (openers.length === 3) {
			html += `${openers[0]}, ${openers[1]}, & ${openers[2]}`;
		}

		if (openers.length === 2){
			html += `${openers[0]} & ${openers[1]}`;
		}

		if (openers.length === 1) {
			html += openers[0];
		}

		html += '</div>';

		return html;
	}

	return `
		<div class="event">
			<h3>${getHeadliner(concert.headliner)}</h3>
			${getOpeneners(concert.openers)}
			<div class="date">${dayjs(concert.date).format('MMMM D, YYYY')}</div>
			<div>${concert.location} &bull; <em>${concert.city}</em></div>
		</div>
	`;
};
