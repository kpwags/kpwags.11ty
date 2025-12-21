---
title: "Getting Ready for My 2025 Media Consumption Pages"
date: '2025-12-21T17:15:46.488Z'
permalink: /posts/2025/12/21/getting-ready-for-my-2025-media-consumption-pages/index.html
description: "I post what I read, watched, and played every year. This year I'm trying to save me some time by automating some of the scaffolding."
tags:
  - Personal Site
  - Media
  - Books
  - Video Games
  - TV
  - Movies
  - Automation
---
Every year now I've been posting a look back at the books, TV, movies, and video games I consumed the previous year. I find it a rather interesting exercise looking back at what I've read, watched, and played and thinking about what I really enjoyed and what I might not have.
<!-- excerpt -->

One of the more annoying parts of the posts is building out the components in the blog post markdown files. I've built a WebC component to render the content, but there's a lot of copying and pasting from my media repository to lay them all out.

It got me thinking though, my media repository has an API that I use to build my media pages for my site and even my reading log pages. Certainly I could do something similar.

I have a tool that I named [site-content-generator](https://codeberg.org/kpwags/site-content-generator). It's a small .NET console app that I use to generate the bones of my blog posts, notes, book notes, and a few other things. It speeds up the process of scaffolding all the front matter I'd like for my posts.

I'm currently in the process of adding more options to it to handle scaffolding the yearly posts. The endpoints already exist to pull in the books, TV and other media to lay out the bare bones of the pages. I could then go in and make the final tweaks. I started working on it the other night and have the book generation mostly taken care of. Movies and video games won't be too bad now that I have the basic framework taken care of.

TV will be a challenge though as there's no date I can really work off of. Since TV goes from **watching** to **on pause** back to **watching** as seasons end and start, I'm not sure there's anything I can necessarily grab onto in the data. With books, movies, & video games, I have a date watched or date finished I can use to group the media into 2025. Maybe it's an improvement I can make to my media repository, but it doesn't exactly help me now.

Either way, it'll be nice to have a tool to help me get the posts started and trim some time off the tedious work. Automate things when you can.