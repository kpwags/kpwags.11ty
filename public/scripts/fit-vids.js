// source: https://github.com/davatron5000/fit-vids
/* eslint-disable no-param-reassign */
class FitVids extends HTMLElement {
    connectedCallback() {
        const videoSources = ['iframe[src*="youtube"]', 'iframe[src*="vimeo"]'];
        this.style.display = 'block';

        this.querySelectorAll(videoSources.join(',')).forEach((video) => {
            // ↔️ Make it go big
            video.style.width = '100%';
            video.style.height = 'auto';
            // 🔛 But not too big
            video.style.maxWidth = '100%';
            // 🪄✨ Sprinkle the magic
            video.style.aspectRatio = `${video.getAttribute('width')} / ${video.getAttribute('height')}`;
            // 🐾 Leave no trace
            video.removeAttribute('height');
            video.removeAttribute('width');
        });
    }
}

if ('customElements' in window) {
    window.customElements.define('fit-vids', FitVids);
}

export { FitVids };
