import { readFile } from 'fs/promises';

const now = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const music = JSON.parse(await readFile(new URL('./music.json', import.meta.url)));

            const currentData = {
                music: music.filter((m) => m.showOnNowPage),
            };

            resolve(currentData);
        } catch (error) {
            reject(error);
        }
    });
};

export default now;
