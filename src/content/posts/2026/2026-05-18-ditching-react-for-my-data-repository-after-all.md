---
title: "Ditching React for My Data Repository After All"
subtitle: ""
description: "Going to use HTML/CSS/Vanilla JS and Web Components to build the frontend, just like my media repository."
date: '2026-05-18T11:48:00.000Z'
permalink: /posts/2026/ditching-react-for-my-data-repository-after-all/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - React
  - JavaScript
  - Web Components
  - Side Projects
  - Wags Data Repository
---
I [recently wrote](/posts/2026/setting-some-side-project-priorities/) about how I was building out my data repository using React rather than what my media repository’s current stack is, HTML/CSS/VanillaJS/Web Components. Part of my original decision was a little bit of laziness, but at the end of the day, I think I want to have a platform that is built without frameworks, and without too many dependencies I have to worry about. The backend will still be Node, TypeScript, with dependencies, I’ll have to maintain, why not lessen the burden on the frontend. 
<!-- excerpt -->

One of my original thoughts when I started up the React frontend for my data repository was that I know React from years of working on it at work. I’m definitely better with it now than I was when I first started. I like the way its components and prop system works when building reusable components. I felt like I could build it out in such a way that wouldn’t be all awful from a performance standpoint. And maybe that would end up all being true, I mean I would be the only one using it, it’s not like I’d have to worry about scaling it up for any number of users.

And I’d be lying if I wasn’t still considering all of that in my decision. In many cases, I could probably build out something that would do what I want potentially faster. But that’s not the only consideration I have for this project. Yes, part of this project is a working, useful tool. Another part of it is for me to play around. I want to learn more about web components, CSS and JavaScript tricks, and anything else I feel like experimenting with.

I did start taking Scott Jehl’s Web Component course, and while I’m only 2 parts in, I’ve already learned something I didn’t fully recognize. I didn’t realize the [template functionality](/posts/2025/07/03/using-the-html-template-tag/) was part of the general ecosystem around web components. I found out about the `<template>` tag last year and didn’t think anything about how it tied into the larger ecosystem. I just saw it as a neat, nifty, and useful way to make adding nodes to the DOM after page load. And let me tell you, compared to building out a table row node by node, HTML templates are a godsend.

I still have plenty of the course left to take and I’m intending to do it over the next week or two. I’m intending on continuing with my data repository work to hopefully have an even more useful tool to keep track of my media, fitness, and any other data points I care to add. I’m excited to see what the rest of the course holds as well as how I can build on and improve my data repository as I continue building it.

I did decide to start the frontend over from scratch. I’ll still copy some code over from my media repository as it makes sense, but I’m going to treat this a lot more like a rewrite than simply an extension of what it already is. I figure it will allow me to clean up some code and hopefully make managing and updating the code easier and overall a better experience.
