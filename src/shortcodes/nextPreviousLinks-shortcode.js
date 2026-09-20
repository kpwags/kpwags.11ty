export const nextPreviousLinks = (root, prev, next) => {
	return `
<section class="pagination">		
	${prev ? `<a href="/${root}/${prev}/">&leftarrow; Previous</a>` : ''}
	${next ? `<a href="/${root}/${next}/">Next &rightarrow;</a>` : ''}
</section>
`;
};