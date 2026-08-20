---
title: "Tackling a Redesign Can Be Difficult"
subtitle: ""
description: "Figuring out how to handle redesigning a site that's been around for 13 years is no easy task."
date: '2026-08-20T18:51:00.000Z'
permalink: /posts/2026/tackling-a-redesign-can-be-difficult/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - Personal Sites
  - Site Updates
  - HTML
  - 11ty
  - Next.js
---
So I'm currently working on redesigning my personal site. So far, I think the hardest part is integrating all the little things I've built into my site over the course of the 13 years I've been building and writing on it.
<!-- excerpt -->

I'll give a simple example. If you go back to my early reading logs ([like this one](/reading-log/2/)), you'll notice I have what I called in-depth pieces at the top. Eventually, they got replaced by my [notes](https://kpwags.com/notes/), and now my reading logs are just a link dump broken up by category. It's not that big of a deal or that big of a change, but guess what, I still have to support it in my new build.

And this support goes up against something else I'm hoping to accomplish with this redesign. I'm hoping to tackle some tech debt and remove or condense components. I'm left with having to go through old posts and clean up the components, markdown, and HTML of the elements. And here's where I'm trying to figure out what I want to do. Do I keep the different shortcodes and components? With the in-depth links, I used to do something similar with my week notes. Do I combine the components into one for use in both, or do I get rid of the components all together and just put in the HTML? HTML is timeless and will remain valid no matter what tool or tools I use to build my site.

I say "tools", because much of this predicament I'm in started before I even heard of 11ty, the static site generator I've been using since December 2023. When I started this site, I was using WordPress. Then I was using Ghost, then back to WordPress, then Jekyll, then Next.js, and now 11ty. The predicament likely started with Next.js as that was when I really started really playing around with my site and adding new features. Either way, these components have evolved with time and tooling, each time having to be converted to work with the setup I use. HTML? It's pretty much the same now as it was back in 2013, only now improved upon with new elements like `<dialog />` and whatnot.

I haven't made a final decision yet on what I'm going to do. I have moved them all into HTML, but I'm now second guessing myself in the event my inevitable next redesign requires a different HTML structure. I've been kicking it around in my head for a little bit as to whether I want to go back in and really start figuring this out to prevent duplication and to standardize things so I'd be able to change them all at once later down the line.

Now I feel like I'm talking myself back into building a component? I don't know, fortunately, I have plenty of work left to do on the redesign that I can put this on the backburner and tackle some other pages in the meantime.