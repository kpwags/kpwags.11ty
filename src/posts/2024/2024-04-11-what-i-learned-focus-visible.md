---
title: 'What I Learned: CSS :focus-visible'
date: '2024-04-12T19:31:05Z'
permalink: /posts/2024/04/12/what-i-learned-focus-visible/index.html
tags:
  - What I Learned
  - CSS
  - Web Development
  - Development
  - Accessibility
---

I’ve been aware of `:focus-visible` for a little while now, but haven’t really dug into some of its details. I’ve noticed that browsers have their default behavior and I’ve just left them do their thing without adjusting the focus CSS. Of late, I’ve been digging into accessibility a lot more both for work and my own knowledge and have now finally dug more into `:focus-visible`.
<!-- excerpt -->

I remember finding the `:focus` pseudo class a long time ago back when I was first getting into web development. I seem to recall not liking how it looked and likely turned it off. Thankfully, I’ve learned a lot since then and don’t do that anymore. The `:focus-visible` pseudo class came about to provide a better balance to how browsers indicate elements have focus depending on how it interprets the user is navigating the page.

To put it succinctly, the browser handles focus differently depending on whether the user is navigating the site with a finger or a mouse, or if the user is using their keyboard.

MDN has [good information on it](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible). Thankfully it’s relatively simple to use too.

```css
input:focus-visible {
	outline: 4px solid red;
}
```
