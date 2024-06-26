---
title: 'Is TypeScript Solving a Problem or a Symptom'
date: '2023-08-07'
permalink: /posts/2023/08/07/is-typescript-solving-a-problem-or-a-symptom/index.html
tags:
  - TypeScript
  - JavaScript
  - Web Development
  - Development
---

I was listening to [ShopTalk Episode 553](https://shoptalkshow.com/553/) and Dave asked a question that made me pause and think, hmmm…
<!-- excerpt -->

>  Is TypeScript Solving a Problem or a Symptom? Is the problem “I don’t know what the data is”, or the symptom, “I have too much f*cking JavaScript and that’s the problem.”

I’ve been using TypeScript almost exclusively for 3+ years now. I find it to make my development work easier and myself more productive. For big applications, it’s an absolute godsend. Visual Studio Code lets me know what properties the various objects have and what methods are available to me.

The downside of course is that if I need that help, it probably means there’s a lot of JavaScript and remembering or knowing quickly the properties and definitions of an object becomes more and more troublesome.

If the JavaScript is part of your build tooling, that’s one thing. But if all of the JavaScript is being sent to the client, performance is likely to take a hit.

I don’t really know what the right answer for all of this is, apps are getting bigger and more complex, thus requiring more JavaScript to support them. I just thought it was an interesting thought since TypeScript has become as big as it has.