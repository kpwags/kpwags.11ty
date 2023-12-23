module.exports = (color, currentValue, fullValue, format = null) => {
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

	switch (format) {
		case 'money':
			formattedCurrentValue = moneyFormatter.format(formattedCurrentValue);
			formattedFullValue = moneyFormatter.format(formattedFullValue);
			break;

		default:
			break;
	}

	return `
<div class="progress-bar">
	<div class="bar">
		<div class="inner-bar" style="background-color: ${color}; width: ${currentPercentage}%"></div>
	</div>
	<p class="legend">${formattedCurrentValue} / ${formattedFullValue} (${actualPercentage}%)</p>
</div>`;
};