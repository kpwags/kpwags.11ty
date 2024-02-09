---
title: 'What I Learned: HTML Dialog'
date: Created
permalink: /posts/2024/02/09/what-i-learned-html-dialog/index.html
tags:
  - What I Learned
  - Development
  - HTML
  - JavaScript
---

I know I’m a little late to the game, but I recently learned how to use the new HTML `<dialog>` element.
<!-- excerpt -->

On my media pages, I used to just put my thoughts in a hidden div below the cover image. The issue came when I wanted to add more than a sentence or two. It would look bad trying to squeeze it in. I had considered a pop up modal before, but I didn’t want to build it manually or add an additional dependency, so I skipped it in favor of the div.

Recently, it had come to a head when I shrunk the cover images a bit which made the hidden divs look even worse. I had heard about the `<dialog>` element and jumped in.

In Eleventy on my media page layout, I added a dialog element for me to work with.

```html
<dialog class="media-thoughts-dialog">
	<div class="thoughts-content"></div>
	<div class="close-button"><button type="button">Close</button></div>
</dialog>
```

This provides the dialog box I need to display the end result. It even allows you to style it. Let’s give it some styling. Nothing fancy, but something a little nicer.

```css
dialog.media-thoughts-dialog {
    width: 600px;
    text-align: center;
    border-color: var(--primary-color-1);
    border-radius: 10px;
}

dialog.media-thoughts-dialog .thoughts-content {
    margin-bottom: 24px;
}

dialog.media-thoughts-dialog button {
    padding: 8px 16px;
    border-style: solid;
    border-color: var(--primary-color-2);
    cursor: pointer;
    appearance: none;
    border-radius: 5px;
}


dialog.media-thoughts-dialog button:hover {
    color: var(--primary-color-1);
    border-color: var(--primary-color-1);
}

@media (max-width: 650px) {
    dialog.media-thoughts-dialog {
        width: 300px;
    }
}
```

Now, this will require some JavaScript to get functional, but thankfully not too much.

The first thing I needed to figure out was how to get the content. I didn’t want to make an API call, not only because I don’t have an API, but also that’s more network calls that weren’t really needed. So instead, I kept the hidden divs to store my thoughts.

Here’s a simplified version of the HTML:

{% raw %}
```html
<div class="item">
	<div class="book-cover">
		<img src="{{ coverUrl }}" alt="The cover for {{ title }}" class="cover" height="225" width="150" />
	</div>
	<div>
		<a href="{{ link }}" target="_blank" rel="noreferrer">{{ title }}</a>

		<div class="meta">{{ author }}</div>

		<div class="view-thoughts">
			<button
				class="toggle-thoughts"
				id="toggle-btn-{{ id }}"
				type="button"
			>
				View Thoughts
			</button>
			<div class="thoughts hidden" id="thoughts-{{ id }}">
				{{ thoughts }}
			</div>
		</div>
	</div>
</div>
```
{% endraw %}

Each book comes with an ID from Notion, so that when I build the HTML, I attach it to both the view thoughts button as well as the hidden content.

So now we need to handle the action that occurs when the user clicks the button.

```js
window.addEventListener('load', () => {
	const dialog = document.querySelector('dialog.media-thoughts-dialog');

	if (dialog) {
		const toggleButtons = document.querySelectorAll('button.toggle-thoughts');

		toggleButtons.forEach((button) => {
			button.addEventListener('click', (e) => {
				const mediaId = e.target.id.replace('toggle-btn-', '');
				const thoughtsDiv = document.getElementById(`thoughts-${mediaId}`);
				const thoughtsContainer = document.querySelector('dialog .thoughts-content');

				if (thoughtsDiv && thoughtsContainer) {
					thoughtsContainer.innerHTML = thoughtsDiv.innerHTML;
					dialog.showModal();
				}
			});
		});

		const modalCloseButton = document.querySelector('dialog button');
		if (modalCloseButton) {
			modalCloseButton.addEventListener('click', () => dialog.close());
		}
	}
});
```

When the window is loaded, the script finds all the view thoughts buttons and adds an event listener for the onClick event. When a button is clicked, it gets the ID of the book from the event target, which in this case is the button. It uses the ID to find the hidden div with my thoughts. It then takes the inner HTML from the container and inserts it into the dialog’s content div. The final piece is to show the dialog which is accomplished by calling `dialog.showModal()`. The end result is

{% image "./images/htmldialog.png", "The end result of an HTML dialog appearing on my site" %}

The final pieces is the last piece of code. Attaching the event listener to the close button which closes the modal by calling `dialog.close()`.

In this implementation, I only need one dialog element created and have a nice looking dialog to show my thoughts. No 3rd party libraries or questionable custom HTML to create.