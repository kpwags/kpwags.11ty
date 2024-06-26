---
title: 'Email Development Sucks, but Refactoring is Oddly Satisfying'
date: '2023-09-12'
permalink: /posts/2023/09/12/email-development-sucks-but-refactoring-is-oddly-satisfying/index.html
tags:
  - Development
  - Email Development
  - Refactoring
  - HTML
rss_only: true
---

*This post is for the [Secret RSS Club Readers](https://kpwags.com/posts/2022/08/15/welcome-to-the-rss-club).*
<!-- excerpt -->

Over the last week at work, I've been spending most of my time working on overhauling the email backend code as well as the HTML markup of the emails themselves. [Email development kinda sucks](https://dodov.dev/blog/why-does-email-development-have-to-suck) and it hasn't been the most fun of tasks. With that said, I'm actually kind of enjoying the refactoring part.

## HTML Markup

The email HTML that was originally given to us to use is less than stellar and has been throwing a lot of red flags in our code analysis tools. We've been ignoring them at our own peril for a long while now, but are now starting to get serious about cleaning things up.

This meant that I had the fun of starting from scratch and building a brand new email template and then testing it out on various devices and apps. Thankfully our app is internal so we don't have to test it on every single email client, but even with a limited client base, there's plenty of fun to go around. Fix a problem on desktop Outlook, web Outlook breaks. Fix that, then iOS breaks. Cycle, rinse, repeat. Not gonna lie, there's a part of me that thinks supporting IE6 would be preferable.

I was finally able to get a working template and then came the fun part of refactoring how our app sends out email.

## Refactoring

Over the course of the three years of development on the app I'm working with, the code for the emails have gone all over the place. Part of what I'm working on, is condensing it into one service to make things far more simpler, and to make using our the template above, all the more easier to use.

This part is the fun part. I don't know what it is, but to see the lines of code shrink and to see all the different calls simplify, is quite satisfying.

---

I guess that's the big takeaway from this slightly frustrating work. Certain tasks might suck, but when you can clean the code up and make things simpler and easier to work with, the satisfaction is worth it.