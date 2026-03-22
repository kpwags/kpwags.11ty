---
title: "Design-First Collaboration"
date: '2026-03-22T18:09:00.000Z'
permalink: /notes/design-first-collaboration/index.html
link: https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html
author: Rahul Garg
tags:
  - Rahul Garg
  - AI
  - Code Review
---
I've heard the term cognitive debt being bandied about. Having to deal with larger PRs, especially with a good deal of AI-generated code can be taxing.

> This, I believe, is why reviewing AI-generated code feels so much more exhausting than reviewing a colleague's work. When a human pair submits code after a whiteboarding session, I am reviewing implementation against a design I already understand and agreed to. When AI generates code from a single prompt, I am simultaneously evaluating scope (did it build what I needed?), architecture (are the component boundaries right?), integration (does it fit our existing infrastructure?), contracts (are the interfaces correct?), and code quality (is the implementation clean?) — all at once, all entangled.
> 
> That is too many dimensions of judgment for a single pass. The brain is not built for it. Things get missed — not because I am careless, but because I am overloaded.