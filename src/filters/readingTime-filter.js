const readingTimeFilter = (postOrContent) => {
	const htmlContent =
	  typeof postOrContent === 'string'
		? postOrContent
		: postOrContent.templateContent;

	if (!htmlContent) {
	  return '';
	}

	const content = htmlContent.replace(/(<([^>]+)>)/gi, '');
	const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
	const count = matches !== null ? matches.length : 0;

	const min = Math.ceil(count / 200);

	return min + ' Minute Read';
  };

  export default readingTimeFilter;
  