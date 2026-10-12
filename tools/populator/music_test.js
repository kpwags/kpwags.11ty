import fs from 'node:fs';
import { config } from './config.js';
import { populateMusic } from './music.js';

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
};

const populate = async () => {
	console.log('');
	console.log('----------------------------------------');
	console.log(` kpwags.com Populator (v${config.build})`);
	console.log('----------------------------------------');
	console.log('');

	try {
		await populateMusic();

		writeSuccess(`JSON Download Complete`);
	} catch (e) {
		writeError(e.message);
	}
};

populate();
