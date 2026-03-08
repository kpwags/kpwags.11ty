---
title: "JS-Heavy Approaches are Not Compatible with Long-Term Performance Goals"
date: '2026-03-08T18:21:00.000Z'
permalink: /notes/js-heavy-approaches-are-not-compatible-with-long-term-performance-goals/index.html
link: https://sgom.es/posts/2026-02-13-js-heavy-approaches-are-not-compatible-with-long-term-performance-goals/
author: Sérgio Gomes
tags:
  - Sérgio Gomes
  - JavaScript
  - Web Development
  - Development
---
> I do get the appeal of building in React, really, I do. It’s a fun programming model, and there are inherent organisational benefits to the component paradigm it pushes so hard. There’s also a lot you can reuse out there, and maybe that gives you the confidence that you’ll spend less time in the initial implementation, leaving you longer for improvements and polish.
> 
> And that’s fair, you probably won’t find a larger ecosystem of components, libraries, and complementary frameworks, ready to use! But beyond generally poor performance, they come with another pretty big caveat: they don’t seem to last very long. In my experience, there isn’t much in the way of stability in the React ecosystem, or even the JS ecosystem as a whole. Perhaps that’s changing lately, but historically, I’ve seen multiple large applications end up rewriting massive portions of their code after a while, not because of product reasons, but because of dependencies

It is easy to find a library for anything you need in React. It's what it makes it easy to quickly build things. But building quickly doesn't mean building well.

> It’s time to stop lying to ourselves that JS-heavy client-side approaches are the way to develop a web app nowadays. We really should stop reflexively reaching for JS frameworks for everything we build, and to stop basing our architecture decisions on the stack we’re most familiar with.

"How we've always done it" is so often too easy to say and do.

>  We really owe it to our users to do better as an industry, because right now we’re often building the way we want to, not the way they need us to.
