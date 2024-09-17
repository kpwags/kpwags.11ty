---
title: "My Media Repository, React, & Next Steps"
date: '2024-09-17T22:11:41.179Z'
permalink: /posts/2024/09/17/my-media-repo-react-and-next-steps/index.html
description: "I’m currently rebuilding my media repository in Node and React, but  my plans for the future for it are a little more ambitious with regards to the frontend."
tags:
  - Wags Media Repository
  - React
  - Web Components
  - Web Standards
  - Web Development
---

As I’ve mentioned in a previous [post](https://kpwags.com/posts/2024/09/03/august-2024-check-in/), I’m rebuilding my media repository in Node.js and React since my Blazor implementation is unable to run on my Synology NAS model. It was an unfortunate oversight on my part, but I still had fun building it and it’s working well for me running off my desktop. I’d stick with it, but that’s not really a long-term solution for my needs.
<!-- excerpt -->

## Choosing React

I’ve built projects in React before and while it would seem to be a logical choice of tool, I did want to try sticking more with web standards and see about really digging into web components. I started work that way and realized it was going to be more of an undertaking than I had originally planned. Because of that, and wanting to make sure that I had access to the Windows side of my PC, I decided to go with React for familiarity so that I could get a quicker turnaround.

So far, this seems to be the right call. I’m almost done this next version of my repository. Almost all the pages are built and working, the API is doing its thing, and hopefully in the next couple of weeks I can get this up and running on my NAS. (And yes, after the first page was built, I quickly tested this on my NAS to see if it could run, and while there were some hiccups, it did run.)

My intention with my choice for using React was to make it a stop-gap measure so I could move hosting off my PC. I figure the Node API wouldn’t need to change, so half of what I’m building new would be able to continue to be used.

## Next Steps

My next steps for my media repository after I get the React version would be to go back to the drawing board and rebuild the frontend using web standards, less JavaScript, and no React.

The only thing I haven’t fully decided on is whether I want to see about bringing [11ty](https://www.11ty.dev) into the mix, or if I want to go without a framework of any kind. My inclination now is to keep things simple and go purely out of a folder like I used to do way back in the day...No build systems or anything. I think that would be fun, and more importantly, a good learning experience for me. Web components have been on my radar for a long while now, and it’s about time I dig into them more.

I figure it will give me a lot to learn, write about and share with the world in hopes of someone else learning from my experiences.