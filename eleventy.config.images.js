import path from 'path';
import eleventyImage from '@11ty/eleventy-img';

export default function (eleventyConfig) {
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

    eleventyConfig.addAsyncShortcode('creditedImage', async function creditedImageShortcode(src, alt, credit1Text, credit1Link, credit2Text, credit2Link, leadingText = 'Photo by') {
        let formats = ['webp', 'gif', 'auto'];
        let file = relativeToInputPath(this.page.inputPath, src);

        let metadata = await eleventyImage(file, {
            widths: ['auto'],
            formats,
            sharpOptions: { animated: true },
            outputDir: path.join(eleventyConfig.dir.output, 'img'),
        });

        // TODO loading=eager and fetchpriority=high
        let imageAttributes = {
            alt,
            loading: 'lazy',
            decoding: 'async',
        };

        const imageHtml = eleventyImage.generateHTML(metadata, imageAttributes);

        let credit1 = '';
        let credit2 = null;

        if ((credit2Text ?? '').length > 0 || (credit2Link ?? '').length > 0) {
            if (credit2Text && (credit2Link ?? '').length > 0) {
                credit2 = `<a href="${credit2Link}">${credit2Text}</a>`;
            } else {
                credit2 = credit2Text;
            }
        }

        if (credit1Text && (credit1Link ?? '').length > 0) {
            credit1 = `<a href="${credit1Link}">${credit1Text}</a>`;
        } else {
            credit1 = credit1Text;
        }

        return `
    <div class="credited-image">
        <div class="image">
            ${imageHtml}
        </div>
        <div class="credit">
            ${leadingText} ${credit1}${credit2 ? ` / ${credit2}` : ''}
        </div>
    </div>
        `;
    });
}
