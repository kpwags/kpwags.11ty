---
title: "Extended Note: Is AI causing a repeat of Frontend’s Lost Decade?"
subtitle: ""
description: "Some thoughts on a piece by Mauro Bieg, LLMs, and what the future might bring."
date: '2026-05-26T18:55:00.000Z'
permalink: /posts/2026/is-ai-causing-a-repeat-of-frontends-lost-decade/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - AI
  - Agentic Coding
  - Vibe Coding
  - Front-End Development
  - Web Development
  - Development
  - Mauro Bieg
---
This was originally going to be a note after reading Mauro Berg's piece, [Is AI causing a repeat of Frontend’s Lost Decade?](https://mastrojs.github.io/blog/2026-05-23-is-AI-causing-a-repeat-of-frontends-lost-decade/), but I think I have more thoughts than what generally fits for a note here.
<!-- excerpt -->

> The *deskilling of the frontend* was the introduction of frameworks and other tooling that treats the browser as a mere compilation target – just like any other app runtime (e.g. JVM or iOS). Then you can just load in [the monstrosity that is a Shadcn radio button](https://paulmakeswebsites.com/writing/shadcn-radio-button/), and don’t need to understand the underlying HTML, any subtleties involving different browsers, page load performance, and accessibility.
> 
> As the Wikipedia quote above points out, this “results in cost savings” for businesses, since they then can easily put any general programmer to work on the frontend. Often, a “full-stack developer” is unfortunately not somebody who deeply understands the frontend *and* the backend, but a generalist who just knows enough to wrangle a JavaScript framework to do both. This allows businesses to easily [switch programmers around between different projects](https://www.seangoedecke.com/seeing-like-a-software-company/). The same generalist can even also do native apps with React Native and Electron! To finish the Wikipedia quote: this “reduces barriers to entry” (which is something I’ve always cherished), but it also “weakens the bargaining power of workers”.

I can say that I'm probably lumped into this group. I've relied on various libraries for UI in both my professional career and side projects. Using libraries can abstract away much of building the UI. I don't want to think about how so much of my previous work was a mess of div soups created by React and other tools I've used. I go back to working on some of my oldest projects like OpenVoter and realize how clean the HTML for that was in comparison.

> We still don’t know exactly what skillset the workers wrangling agentic AI will need to have at the end of this transformation, and at what price point we’ll arrive at – for both labour, and for local and remote LLMs. But it is already clear now, that businesses absolutely will use this technology for cost savings and weakening of the bargaining power of workers.

I'd say that this would eventually be corrected with companies recognizing they've gone too far, but I've seen too much enshittification of late to think that. It will likely take some form of a lawsuit to make a company to (briefly) think it might not be worth the money saved from firing a portion of their workforce.

> It’s common for an abstraction to come at a cost of performance. But since computers are very fast nowadays, we were often willing to trade some runtime performance for increased developer productivity (garbage collection is one example). And for high-powered servers under moderate load, this is a very sensible tradeoff. But mobile phones on slow networks are a different beast.
> 
> By using a heavy client-side JavaScript framework like React, and a lot of packages from that ecosystem, you’re abstracting over things [like accessibility](https://gbbns.co/journal/accessibility-problem-isnt-design/), and [performance on lower-end phones, or on slow networks](https://infrequently.org/series/performance-inequality/). In effect, you’re choosing not to think about those things, and you’re choosing not to care about them.

Again, frameworks have their place, but consider all that comes along for the ride when you run that `npm install` command. Even *if* a library within the React ecosystem does do a decent, if not good job building an accessible UI, if the user has an older phone and/or a lousy internet connection, it doesn't matter much if they can't load your site.

It's what makes me happy to see more and more people embracing using HTML and CSS, with a smattering of JavaScript rather than just jump on the React bandwagon. I'm still a little disappointed in myself for [nearly](/posts/2026/setting-some-side-project-priorities/) [doing that](/posts/2026/ditching-react-for-my-data-repository-after-all/) for my data repository.

> As such, the best analogy for using LLMs I’ve found so far is how a Google search used to behave. It was a skill all of us had to learn at some point: choosing just the right keywords, so that the right forum post (and later Stack Overflow post) would surface on the first Google results page. Just like prompting an LLM, in order to return the right assemblage of its training data, a fuzzy web search is a lookup in a very high-dimensional space. And just like with LLMs, the lookup used to be very sensitive to slight variations of wording, and changes to Google’s search index.

Many of us developers I'm sure, myself included, have gone down the path of copying and pasting bits of code from Stack Overflow hoping that it magically fixes whatever problem it is we're trying to solve. In some cases, we might not even fully understand what it is the code snippet is doing. While by no means ideal, it used to generally at least be confined to a function or class. You'd still have to integrate it with whatever else you're building. Now, with a few keywords, you can generate code, barely aware of what the code even looks like, what it actually does, or how it might interact with other parts of the codebase. Hell, in some cases, it could *be* the codebase. It's almost always easier to refactor troublesome functions, than it is to refactor large portions of an entire application.

As Mauro Bieg opines, I'm wondering what this new world will bring to those developers who appreciate the art of writing code. The pride of bringing a new app or website online with fantastic craftsmanship.

<div class="view-link"><a href="https://mastrojs.github.io/blog/2026-05-23-is-AI-causing-a-repeat-of-frontends-lost-decade/">Read the Original Post</a></div>