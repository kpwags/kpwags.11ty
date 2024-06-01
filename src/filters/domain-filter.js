const domainFilter = (url) => {
	const domain = (new URL(url));

	return domain.hostname.startsWith('www.') ? domain.hostname.replace('www.', '') : domain.hostname;
};

export default domainFilter;
