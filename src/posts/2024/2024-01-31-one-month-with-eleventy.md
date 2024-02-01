---
title: 'One Month with Eleventy'
date: '2024-01-31'
permalink: /posts/2024/01/31/one-month-with-eleventy/index.html
tags:
  - Eleventy
  - Personal Sites
  - 11ty
---

I’ve now been using [Eleventy](https://www.11ty.dev) for my site for a little over a month and I have to say I’m happy I made the change. I’ve continued writing. I’ve added some features, tweaked some things here and there, almost all has been good. I have run into a few hiccups, mostly of my own making, but highly doubt I’d ever consider going back at this point.
<!-- excerpt -->

## My Biggest Hiccup

My biggest hiccup has been permalinks. Starting with my posts in 2024, I’ve taken advantage of the `permalink` keyword in the front matter to assign the URL rather than nesting everything like I did when I did the original migration. It’s much more convenient and it does the trick nicely. I have on several occasions though either mistyped the permalink, or skipped the `/index.html` on the end. Skipping the `index.html` is particularly nefarious because it will work locally, but will just render the raw HTML of the page when viewed live on Netlify. Oops. Again, this is on me and is not at all the fault of 11ty. I’ve since updated my VS Code snippets to hopefully prevent it from happening anymore.

## Smooth Sailing Otherwise

Other than the permalink debacle (caused by me), it’s been mostly smooth sailing. I’ve found it generally easier to make the changes I’d been considering for my site prior to the switch. I’m looking forward to upgrading to version 3 when it comes out and adding more content and features as time goes on.

