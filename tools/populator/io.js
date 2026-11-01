import fs from 'node:fs';
import os from 'node:os';
import { config } from './config.js';

const outputDirectory = os.platform() === 'darwin'
	? config.outputDirectory.mac
	: config.outputDirectory.linux;

export const replaceFile = async (filename, content, path = '/src/_data') => {
	const outputFile =  `${outputDirectory}${path}/${filename}`;

	if (fs.existsSync(outputFile)) {
		await fs.unlinkSync(outputFile)
	}

	await fs.writeFileSync(outputFile, content, { flag: 'w+' });
};
