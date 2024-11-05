const progressBarShortcode = (color, currentValue, fullValue, mode = 'percentage', format = null) => {
	let currentPercentage = 0;

	if (currentValue > fullValue) {
		currentPercentage = 100;
	} else {
		currentPercentage = Math.round((currentValue / fullValue) * 100);
	}

	const actualPercentage = Math.round((currentValue / fullValue) * 100);

	let formattedCurrentValue = Math.round(currentValue);
	let formattedFullValue = Math.round(fullValue);

	const moneyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const largeNumberFormatter = new Intl.NumberFormat('en-US', {
		maximumSignificantDigits: 3,
	});

	switch (format) {
		case 'money':
			formattedCurrentValue = moneyFormatter.format(formattedCurrentValue);
			formattedFullValue = moneyFormatter.format(formattedFullValue);
			break;

		case 'large-number':
			formattedCurrentValue = largeNumberFormatter.format(formattedCurrentValue);
			formattedFullValue = largeNumberFormatter.format(formattedFullValue);
			break;

		default:
			break;
	}

	const legendMode = mode === 'percentage'
		? `<p class="legend">${formattedCurrentValue} / ${formattedFullValue} (${actualPercentage}%)</p>`
		: `<p class="legend">${mode}</p>`;

	return `
<div class="progress-bar">
	<div class="bar">
		<div class="inner-bar" style="background-color: ${color}; width: ${currentPercentage}%"></div>
	</div>
	${legendMode}
</div>`;
};

export default progressBarShortcode;
