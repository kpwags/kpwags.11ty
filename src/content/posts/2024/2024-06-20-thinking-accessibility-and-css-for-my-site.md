---
title: 'Thinking Accessibility and CSS for My Site'
date: '2024-06-20'
permalink: /posts/2024/06/20/thinking-accessibility-and-css-for-my-site/index.html
tags:
  - CSS
  - Accessibility
---

One of the simplest things developers and people can do with regards to accessibility is to make sure that every image has corresponding alt text to go along with it to help describe the image to those who are visibly-impaired.
<!-- excerpt -->

I do my best to make sure that I include alt text on all the images on my site as well as all the images I post on Mastodon and Bluesky. Bluesky even has a handy feature blocking you from posting until you add alt text. Some Mastodon clients might as well.

I mention this because I’ve added a little snippet I found on a [post](https://andrewwalpole.com/blog/opinions-for-writing-good-css/) by Andrew Walpole that was fantastic in its content, but also included a CSS snippet that can help alert me when I miss describing an image.

```css
img:not([alt]),
svg:not([aria-label]) {
  border: 5px solid red;
}
```

What this does is add a thick red border to any image that doesn’t have alt text, or an SVG that doesn’t have a description in the `aria-label` attribute. The thought here is that when I’m checking new posts, it will stick out like a sore thumb and remind me that I need to add a description.

So if you see an image with an ugly red border on my site, let me know so I can correct it.