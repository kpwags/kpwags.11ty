---
title: '6 Months with 11ty'
date: '2024-06-11'
permalink: /posts/2024/06/11/6-months-with-11ty/index.html
tags:
  - Eleventy
  - 11ty
  - Blogging
  - Personal Sites
pinned: true
---

At the end of 2023, I switched my site from being built with [Next.js](https://nextjs.org/) to [11ty](https://www.11ty.dev/). 6 months on, I’m still quite happy with my decision.
<!-- excerpt -->

## Why I Made the Switch

As a [quick refresher](https://kpwags.com/posts/2023/12/14/switching-to-eleventy/), my primary reason for switching was seeing the JS footprint of Next.js growing larger and larger. I’m not some anti-JavaScript person, but most of what I have on my site is static content. I don’t need much JavaScript so the extra JS being delivered through Next.js was just overkill. I was debating between [Astro](https://astro.build/) and 11ty. After playing with both, 11ty won out.

## My Thoughts 6 Months In

The short answer to all of this is that I’m very happy with my decision to switch. So much so that I’m building sites for both my wife and my photography in 11ty. If you’re looking to create yourself a personal site, I cannot recommend 11ty enough.

The longer answer is that I’m incredibly happy with 11ty.

### Ease of Development & The Community

I’ve been consistently adding to my site over the years. I’ve added additional pages, listed out the media I’m consuming and more. While not all of it is new to my 11ty build, I’m quite happy with how easy it is to make tweaks and add to my site. The documentation is fantastic, the community is super helpful, and Zach Leatherman, 11ty’s creator is always communicative and willing to offer help. I don’t recall ever having this kind of support from the community the same way anywhere else.

### Ease of Posting

The one thing I really liked when I switched over to static site generators was the lack of a database. You wanted a new blog post, just add a file to a directory. I’ve lost so many posts to lost databases over the various redesigns prior. It’s so much nicer when you can just commit the file to a Git repo and/or back it up as a simple markdown file. I was able to do it with Jekyll, Next.js and now 11ty and it makes it simple to add new content. I use iA Writer for my writing and I can just copy the markdown over. It’s not really any easier to add  new posts than it was on Jekyll or Next.js, but it continues to be easy which is the important part.

### Fantastic Performance

One of the reasons I went with 11ty was the lack of JavaScript being sent to the client. Compared to my Next.js setup, I felt this was a good thing. I have minimal JS on my site. Basically all I use JavaScript for is theming and for viewing my thoughts on the different media like books and movies. Beyond that, I don’t really have a need for it so I have no reason to send any more down to the client.

The end result is that 11ty generates a site that is performant, loads quickly, and is a pleasure to develop and work with.

## Support 11ty

Zach Leatherman is working to try to make [11ty independent and sustainable](https://www.11ty.dev/blog/sustainability-fundraising/). If you are an 11ty user or decide to use it, consider supporting its independence.