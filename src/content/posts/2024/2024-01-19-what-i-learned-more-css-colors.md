---
title: 'What I Learned: More CSS Colors'
date: '2024-01-19'
permalink: /posts/2024/01/19/what-i-learned-more-css-colors/index.html
tags:
  - What I Learned
  - CSS
---

This past weekend while I was lifting, I was listening to a [JS Party podcast episode](https://changelog.com/jsparty/273) from April 2023 (yes, I’m that far behind) talking about the new color ranges.
<!-- excerpt -->

I had heard that more colors had indeed come to CSS, but had never really done any digging into it. It’s been on my list of things to look at and [Adam Argyle](https://nerdy.dev) did a great job explaining the new color options.

I’d highly recommend listening to the podcast as Adam is better able to articulate how the new colors work than myself, but suffice it to say, the new color values take advantage of the newer and better displays available today.

There are several new options, Display P3, LCH, and OKLCH. OKLCH is the recommended color space to use. LCH stands for Lightness (the perception human eyes can see), Chroma, & Hue. They provide access to a much larger range of colors that older monitors can’t display, but newer monitors and mobile devices can. And the best part is that it’s fully backwards compatible. So if you convert all your colors to OKLCH and someone on an old device comes and views your site, they’ll see the closest color that their device can render.

The other awesome feature of this is that you can use JavaScript functions on the color to lighten, darken, or do other calculations on them and manipulate the colors as you see fit.

I’ve played around with some of the various links mentioned in the podcast and have an [issue logged](https://github.com/kpwags/kpwags.11ty/issues/102) for my site to convert the colors to OKLCH. I’ll probably tweak them as well to hopefully make them “pop” a little more.

So much new functionality has been added to CSS and supported globally now that it’s becoming hard to keep up!