const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');

module.exports = (eleventyConfig) => {
    function relativeToInputPath(inputPath, relativeFilePath) {
        let split = inputPath.split('/');
        split.pop();

        return path.resolve(split.join(path.sep), relativeFilePath);
    }

    eleventyConfig.addAsyncShortcode('image', async function imageShortcode(src, alt, widths, sizes) {
        let formats = ['webp', 'gif', 'auto'];
        let file = relativeToInputPath(this.page.inputPath, src);
        let metadata = await eleventyImage(file, {
            widths: widths || ['auto'],
            formats,
            sharpOptions: { animated: true },
            outputDir: path.join(eleventyConfig.dir.output, 'img'),
        });

        // TODO loading=eager and fetchpriority=high
        let imageAttributes = {
            alt,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        };
        return eleventyImage.generateHTML(metadata, imageAttributes);
    });
};
