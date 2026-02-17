import readline from 'readline';
import fs from 'node:fs';
import os from 'node:os';
import pjson from './package.json' with { type: 'json' };
import { config } from './config.js';
import { Api } from './api.js';

const rl = readline.createInterface({
	input: process.stdin,   // Read from stdin (user input)
	output: process.stdout  // Write to stdout (console)
});

const outputDirectory = os.platform() === 'darwin'
	? config.outputDirectory.mac
	: config.outputDirectory.linux;

const writeError = (errorMessage) => {
	console.log('');
	console.log('\x1b[31m-----------------ERROR------------------\x1b[0m');
	console.log('\x1b[31m ' + errorMessage + '\x1b[0m');
	console.log('\x1b[31m----------------------------------------\x1b[0m');
	console.log('');
};

const writeHeader = (text) => {
	console.log('');
	console.log('----------------------------------------');
	console.log(` ${text}`);
	console.log('----------------------------------------');
	console.log('');
};

const writeSuccess = (text) => {
	console.log('');
	console.log('\x1b[32m' + text + '\x1b[0m');
	console.log('');
}

const readLineAsync = (prompt) => {
	if (!prompt.endsWith(': ')) {
		prompt = ` ${prompt}: `;
	}

	return new Promise((resolve) => {
		rl.question(prompt, (answer) => { // Empty prompt; customize as needed
			resolve(answer);
		});
	});
};

const readLineStringDefault = async (prompt, defaultValue) => {
	let response = await readLineAsync(`${prompt} (${defaultValue}): `);

	if (response.trim() === '') {
		response = defaultValue;
	}

	return response;
};

const readUserInputInteger = async (prompt) => {
	const response = await readLineAsync(prompt);

	const value = parseInt(response);

	if (Number.isNaN(value))
	{
		throw new Error('Invalid Input');
	}

	return value;
};

const readUserInputBoolean = async (prompt, defaultValue = 'no') => {
	let response = await readLineAsync(`${prompt} (${defaultValue}): `);

	if (response.trim() === '') {
		response = defaultValue;
	}

	return response.toLowerCase() === 'yes';
};

const readUserInputTags = async (prompt) => {
	const response = await readLineAsync(` ${prompt} (Separate By Commas): `);

	if (response.trim() === '') {
		return '';
	}

	return response
		.split(',')
		.map((i) => i.trim());
};

const buildUrlSlug = (title) => {
	return title
		.toLowerCase()
		.replaceAll(' ', '-')
		.replace(/[^0-9a-z-]/gi, '')
		.replaceAll('--', '-');
};

const getAdditionalPromptResponse = async (prompt) => {
	switch (prompt.promptType) {
		case 'bool':
			return await readUserInputBoolean(`${prompt.prompt}`, prompt.defaultValue);

		default:
			throw new Error(`Invalid Prompt Type (${prompt.promptType})`);
	}
};

const getDate = () => {
	const today = new Date();

	return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}T${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:00.000Z`;
};

const getMonthName = (monthNumber) => {
	switch (monthNumber) {
		case 1:
			return 'January';
		case 2:
			return 'February';
		case 3:
			return 'March';
		case 4:
			return 'April';
		case 5:
			return 'May';
		case 6:
			return 'June';
		case 7:
			return 'July';
		case 8:
			return 'August';
		case 9:
			return 'September';
		case 10:
			return 'October';
		case 11:
			return 'November';
		case 12:
			return 'December';
		default:
			throw new Error('Unknown Month');
	}
}

const getLongDate = (d = null) => {
	const today = d ?? new Date();

	return `${getMonthName(today.getMonth() + 1)} ${today.getDate()}, ${today.getFullYear()}`;
};

const getFilenamePrefix = () => {
	const today = new Date();

	return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
};

const buildBlogPostTemplate = async () => {
	writeHeader('Scaffolding Blog Post');

	const title = await readLineAsync('Title');
	const description = await readLineAsync('Description');
	let urlSlug = await readLineAsync(`Permalink (${buildUrlSlug(title)})`);

	if (urlSlug.trim() === '');
	{
		urlSlug = buildUrlSlug(title);
	}

	let additionalPrompts = '';

	for await (const prompt  of config.prompts.blog) {
		const response = await getAdditionalPromptResponse(prompt);

		if (additionalPrompts === '')
		{
			additionalPrompts = `${prompt.propertyName}: ${response}`;
		}
		else
		{
			additionalPrompts = `${additionalPrompts}
${prompt.propertyName}: ${response}`;
		}
	}

	const tags = await readUserInputTags('Tags');

	let blogTags = '';

	for (const tag of tags) {
		if (blogTags === '')
		{
			blogTags = `  - ${tag}`;
		}
		else
		{
			blogTags = `${blogTags}
  - ${tag}`;
		}
	}

	const scaffoldedTemplate = `---
title: "${title}"
description: "${description}"
date: '${getDate()}'
permalink: /posts/${new Date().getFullYear()}/${urlSlug}/index.html
${additionalPrompts}
tags:
${blogTags}
---
Excerpt
<!-- excerpt -->

`;

	const outputFolder = `${outputDirectory}/${config.outputFolders.blog}/${new Date().getFullYear()}`;
	const outputFile =  `${outputFolder}/${getFilenamePrefix()}-${urlSlug}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder);
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Blog Post Scaffolded to ${outputFile}`);
};

const buildBlogNotePostTemplate = async () => {
	writeHeader('Scaffolding Note');

	const title = await readLineAsync('Title');
	const link = await readLineAsync('Link');
	const author = await readLineAsync('Author');

	let urlSlug = await readLineAsync(`Permalink (${buildUrlSlug(title)})`);

	if (urlSlug.trim() === '');
	{
		urlSlug = buildUrlSlug(title);
	}

	const tags = await readUserInputTags('Tags');

	let noteTags = '';

	for (const tag of tags) {
		if (noteTags === '')
		{
			noteTags = `  - ${tag}`;
		}
		else
		{
			noteTags = `${noteTags}
  - ${tag}`;
		}
	}

	const scaffoldedTemplate = `---
title: "${title}"
date: '${getDate()}'
permalink: /notes/${urlSlug}/index.html
link: ${link}
author: ${author}
tags:
  - ${author}
${noteTags}
---

`;

	const outputFolder = `${outputDirectory}/${config.outputFolders.note}/${new Date().getFullYear()}`;
	const outputFile =  `${outputFolder}/${getFilenamePrefix()}-${urlSlug}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder);
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Blog Note Scaffolded to ${outputFile}`);
};

const getLinkMarkdown = (link) => {
	if (link.category.name === 'Podcasts') {
		return `- [${link.author}: ${link.title}](${link.url})`;
	}

	return `- [${link.title}](${link.url}) - *${link.author}*`;
};

const getReadingLogContentMarkdown = (data) => {
	let readingLogContent = '';

	for (const category of config.readingLogCategories) {
		const links = data.filter((d) => d.category.name === category);

		if (links.length > 0) {
			if (readingLogContent === '')
			{
				readingLogContent = `## ${category}
`;
			}
			else
			{
				readingLogContent = `${readingLogContent}

## ${category}
`;
			}

			for (const link of links) {
				readingLogContent = `${readingLogContent}
${getLinkMarkdown(link)}`;
			}

			readingLogContent = `${readingLogContent}
			
---`;
		}
	}

	return readingLogContent;
};

const buildReadingLogTemplate = async () => {
	writeHeader('Scaffolding Reading Log');

	const readingLogIssue = await readUserInputInteger("Reading Log Issue Number");
	const songYouTubeId = await readLineAsync("Song YouTube ID");
	const songArtist = await readLineAsync("Artist");
	const songTitle = await readLineAsync("Song Title");

	const [data, error] = await Api.Fetch(`link/reading-log/${readingLogIssue}`);

	if (error) {
		throw new Error(error);
	}

	const readingLogMarkdown = getReadingLogContentMarkdown(data);

	const scaffoldedTemplate = `---
title: 'Reading Log - ${getLongDate()} (#${readingLogIssue})'
date: '${getDate()}'
permalink: /reading-log/${readingLogIssue}/index.html
tags:
  - Reading Log
---
Excerpt
<!-- excerpt -->

---

${readingLogMarkdown}

## A Song to Leave You With

### ${songArtist} - ${songTitle}

{% youTubeEmbed "${songYouTubeId}" "${songArtist} - ${songTitle}" %}
`;

	const outputFile =  `${outputDirectory}/${config.outputFolders.readingLog}/${readingLogIssue}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Reading Log Scaffolded to ${outputFile}`);
};

const buildWeekNoteTemplate = async () => {
	writeHeader('Scaffolding Week Note');

	const startMonth = await readLineAsync("Start Month");
	const startDate = await readUserInputInteger("Start Date");
	const endMonth = await readLineStringDefault("Start Month", startMonth);
	const endDate = await readUserInputInteger("Start Date");
	const issueNumber = await readUserInputInteger("Week Note Issue Number");

	const range = startMonth === endMonth
		? `${startMonth} ${startDate} - ${endDate}`
		: `${startMonth} ${startDate} - ${endMonth} ${endDate}`;

	const title = `Week Notes for ${range} (#${issueNumber})`;

	const tags = await readUserInputTags('Tags');

	let weekNoteTags = '';

	for (const tag of tags) {
		if (weekNoteTags === '')
		{
			weekNoteTags = `  - ${tag}`;
		}
		else
		{
			weekNoteTags = `${weekNoteTags}
  - ${tag}`;
		}
	}

	const scaffoldedTemplate = `---
title: "${title}"
description: "My week notes for the week of ${startMonth} ${startDate} through ${endMonth} ${endDate}."
date: '${getDate()}'
permalink: /week-note/${issueNumber}/index.html
tags:
${weekNoteTags}
---
Excerpt
<!-- excerpt -->

`;

	const outputFile =  `${outputDirectory}/${config.outputFolders.weekNote}/${issueNumber}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Week Note Scaffolded to ${outputFile}`);
};

const getBookFormat = async () => {
	console.log('');
	console.log('--------------');
	console.log(' Enter Format');
	console.log('--------------');
	console.log(' 1. Hardcover');
	console.log(' 2. Paperback');
	console.log(' 3. eBook');
	console.log(' 4. Audiobook');
	console.log('');
	
	const choice = await readUserInputInteger('Format');
	
	switch (choice) {
		case 1:
			return 'Hardcover';

		case 2:
			return 'Paperback';

		case 3:
			return 'eBook';

		case 4:
			return 'Audiobook';

		default:
			throw new Error('Invalid Selection');
			break;
	}
};

const buildBookNoteTemplate = async () => {
	writeHeader('Scaffolding Book Note');

	const title = await readLineAsync('Title');
	const subtitle = await readLineAsync('Subtitle');
	const author = await readLineAsync('Author');
	const format = await getBookFormat();
	const coverImageUrl = await readLineAsync('Cover Image URL');
	const rating = await readUserInputInteger('Rating');
	const dateFinished = await readLineAsync('Date Finished');
	let urlSlug = await readLineAsync(`Permalink (${buildUrlSlug(`${author}-${title}`)})`);

	if (urlSlug.trim() === '');
	{
		urlSlug = buildUrlSlug(`${author}-${title}`);
	}

	const categories = await readUserInputTags('Categories');

	let bookCategories = '';

	for (const category of categories) {
		if (bookCategories === '')
		{
			bookCategories = `  - ${category}`;
		}
		else
		{
			bookCategories = `${bookCategories}
  - ${category}`;
		}
	}

	const scaffoldedTemplate = `---
title: "${title}"
subtitle: "${subtitle}"
fullTitle: "${title}: ${subtitle}"
author: "${author}"
coverImage: "${coverImageUrl}"
rating: ${rating}
date: '${dateFinished}'
permalink: /books/${urlSlug}/index.html
categories:
${bookCategories}
purchaseLinks: [
  { title: '', url: '' }
]
---

`;

	const outputFile =  `${outputDirectory}/${config.outputFolders.bookNote}/${urlSlug}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Book Note Scaffolded to ${outputFile}`);
};

const buildMonthlyCheckInTemplate = async () => {
	writeHeader('Scaffolding Monthly Check-In Blog Post');

	const month = await readLineAsync('Month');
	const year = await readUserInputInteger('Year');


	const tags = await readUserInputTags('Tags');

	let blogTags = '';

	for (const tag of tags) {
		if (blogTags === '')
		{
			blogTags = `  - ${tag}`;
		}
		else
		{
			blogTags = `${blogTags}
  - ${tag}`;
		}
	}

	const urlSlug = `${month.toLowerCase()}-${year}-check-in`;

	const scaffoldedTemplate = `---
title: "${month} ${year} Check-In"
description: "Looking back at my ${month} ${year}"
date: '${getDate()}'
permalink: /posts/${new Date().getFullYear()}/${urlSlug}/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - Monthly Check-In
${blogTags}
---
Excerpt
<!-- excerpt -->

{% renderTemplate "webc" %}
<monthly-roundup runs="0" milesran="0" walks="0" mileswalked="0" lifts="0" volumelifted="0" bikes="0" milesrode="0" gaming="true" tv="true" movies="true">
	<ul slot="books-read">
		<li>Finished <a href="LINK">TITLE</a> by AUTHOR</li>
		<li>Started <a href="LINK">TITLE</a> by AUTHOR</li>
	</ul>

	<ul slot="reading-logs">
		<li><a href="/reading-log/105/"> (#)</a></li>
	</ul>

	<ul slot="week-notes">
		<li><a href="/week-note/XX/">DATES (#)</a></li>
	</ul>

	<ul slot="blogging">
		<li><a href="LINK">TITLE</a></li>
	</ul>

	<ul slot="gaming">
		<li>Continued <a href="LINK">TITLE</a></li>
	</ul>

	<ul slot="tv">
		<li>Continued <a href="LINK">TITLE</a></li>
	</ul>

	<ul slot="movies">
		<li><a href="LINK">TITLE</a></li>
	</ul>
</monthly-roundup>
{% endrenderTemplate %}
`;

	const outputFolder = `${outputDirectory}/${config.outputFolders.blog}/${new Date().getFullYear()}`;
	const outputFile =  `${outputFolder}/${getFilenamePrefix()}-${urlSlug}.md`;

	if (fs.existsSync(outputFile)) {
		throw new Error('Output file already exists.');
	}

	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder);
	}

	await fs.writeFileSync(outputFile, scaffoldedTemplate, { flag: 'w+' });

	writeSuccess(`Monthly Check-In Blog Post Scaffolded to ${outputFile}`);
};

const scaffold = async () => {
	console.log('');
	console.log('----------------------------------------');
	console.log(` kpwags.com Scaffolder (v${pjson.version})`);
	console.log('----------------------------------------');
	console.log('');
	console.log('----------------------------------------');
	console.log(' Enter Item Type');
	console.log('----------------------------------------');
	console.log(' 1. Blog Post');
	console.log(' 2. Note');
	console.log(' 3. Reading Log');
	console.log(' 4. Week Note');
	console.log(' 5. Book Note');
	console.log(' 6. Monhly Check-In');
	console.log('');

	try {
		const choice = await readUserInputInteger('Type');
	
		switch (choice) {
			case 1:
				await buildBlogPostTemplate();
				break;

			case 2:
				await buildBlogNotePostTemplate();
				break;

			case 3:
				await buildReadingLogTemplate();
				break;

			case 4:
				await buildWeekNoteTemplate();
				break;

			case 5:
				await buildBookNoteTemplate();
				break;

			case 6:
				await buildMonthlyCheckInTemplate();
				break;

			default:
				throw new Error('Invalid Selection');
				break;
		}

		rl.close();
	} catch (e) {
		writeError(e.message);
		rl.close();
	}
};

scaffold();