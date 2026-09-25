export const progressLinks = (currentYear) => {
	const progressYears = [];

	for (let i = 2022; i <= 2026; i++) {
		if (i !== currentYear) {
			progressYears.push(i);
		}
	}

	const yearsHtml = progressYears
		.map((year) => `<a href="/progress/${year}/">${year}</a>`)
		.join(', ');

	return `<p class="align-center">Other Years' Aspirations: ${yearsHtml}</p>`;
}