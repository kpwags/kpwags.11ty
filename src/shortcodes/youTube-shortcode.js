module.exports = (id, title) => `
<fit-vids>
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${id}"
        title="${title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
</fit-vids>
`;