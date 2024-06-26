---
title: 'Digging Into Astro'
date: '2023-08-21'
permalink: /posts/2023/08/21/digging-into-astro/index.html
tags:
  - Astro
  - Web Development
  - Next.js
  - JavaScript
  - Blogging
---

Over the last week and a half, I've been starting to play around with [Astro](https://astro.build) again. I had built a good bit of my site in it a while back, but then decided just to re-jigger my Next.js site. Reading and listening to some podcasts has brought me back to starting over.
<!-- excerpt -->

One of the things I've been wanting to do is to improve the performance of my site. Next.js hasn't been bad in that aspect, but I've been reading about Astro and how it ships 0 bytes of JavaScript to the client by default and that's impressive.

## What I Like So Far About Astro

1. It easily handles the content for my blog and reading logs. It has what it calls [Content Collections](https://docs.astro.build/en/guides/content-collections/) to handle the different pieces of content and easily allows me to define front matter with support to show me missing data pieces. I can separate out my reading logs and blog posts to have different definitions too.
2. Modularized CSS built right into the components. Instead of having to use CSS modules or a massive stylesheet, I can just add a `<style />` tag to the bottom of the component and it will load it right in, scoped to that component. It's not difficult to do this with CSS modules, but it's convenient that it's built right in by default.
3. Knowing that I can add React components (or Vue, or Svelt) later should I need to. I’ve been sticking with Astro components so far and it’s been fine. But it’s nice to know that I can add them later should the need arise.

I’m not certain if I’ll finish this take on things. My plan is to get an MVP up and see what Lighthouse and other performance tools say about it in comparison.