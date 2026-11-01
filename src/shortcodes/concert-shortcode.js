import dayjs from 'dayjs';

export default (concert) => {
	const getHeadliner = (headliner) => {
		if (headliner.length === 3){
			return `${headliner[0]}, ${headliner[1]}, & ${headliner[2]}`;
		}

		if (headliner.length === 2){
			return `${headliner[0]} & ${headliner[1]}`;
		}

		return headliner[0];
	}

	const getOpeneners = (openers) => {
		if (openers.length === 0) {
			return '<div class="spacer"></div>';
		}

		let html = '<div class="openers"><span>with</span><ul> ';

		openers.forEach((opener) => {
			html += `<li>${opener}</li>`;
		});

		html += '</ul></div>';

		return html;
	}

	return `
		<div class="event">
			<div class="date"><span>${dayjs(concert.date).format('MMMM D, YYYY')}</span></div>

			<h3>${getHeadliner(concert.headliner)}</h3>
			
			${getOpeneners(concert.openers)}
			
			<div class="details">
				<div>${concert.location} &bull; <em>${concert.city}</em></div>
			</div>
		</div>
	`;
};
