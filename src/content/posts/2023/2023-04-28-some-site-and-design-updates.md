---
title: 'Some Site & Design Updates'
date: '2023-04-28'
permalink: /posts/2023/04/28/some-site-and-design-updates/index.html
tags:
  - Site Updates
  - Design
description: "I've made some design updates to my site and have introduced new and upgraded functionality with Next.js, Code Hike, and Sandpack"
---

Over the course of the last month or so, I’ve been tweaking the design of my site. You might have noticed the changes to the look and the feel.
<!-- excerpt -->

Playing around with Astro I realized that I wanted to give my site a bit of a refresh. And given that I’ve put Astro on hold for the time being, I figured I’d take a break and apply some of the refreshes I was developing with Astro to my Next.js implementation.

Some of the changes that I made:

- Removed the font options. I know it kind of feels like removing functionality, but I thought more about it and it will be easier for me to handle typography. I chose the monospaced font because I like the way it looks and feels.
- Better handled my [bookshelf](https://kpwags.com/bookshelf), [TV](https://kpwags.com/tv), [movies](https://kpwags.com/movies), & [video game](https://kpwags.com/video-games) pages. I didn’t like the way I was handling the wider widths so I laid out the HTML elements better to allow for a wider width for the pages.
- Changed the look and feel of blog headers both on the entry page and on the listing pages.
- Improved the header to allow for search and theme picking from mobile.
- Added a proper 404 page.
- Cleaned up all the front matter in my blog posts since they were all over the place depending on when I wrote the post.
- Added [Sandpack](https://sandpack.codesandbox.io/) support for future posts where I want to include a code sandbox.
- Switched from Prism to [Code Hike](https://codehike.org/) for my code blocks.
- Upgraded Next.js to v13.

The one downside that I came across was upgrading to Next.js 13 caused some issues with deploying my site to Netlify. I’ve had to remove my photography pages until I can move the images into a CDN. I had been including them in the project (probably foolishly) and with the upgrade to Next.js and Netlify’s Next.js plugin, it made my deploy way too large. I’ll probably look into S3 or something similar so I can re-add the photographs back. So a bummer, but hopefully only temporary.

I might be making some tweaks here and there, but if you notice anything weird, please let me know.