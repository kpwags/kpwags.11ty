---
title: 'In Defense of TypeScript'
date: '2023-10-06T15:00:00.000Z'
permalink: /posts/2023/10/06/in-defense-of-typescript/index.html
tags:
  - Web Development
  - JavaScript
  - TypeScript
---

The other day in my quest to go through my podcast queue I was listening to an episode of PodRocket, [The state of JS frameworks with Chris Ferdinandi](https://podrocket.logrocket.com/state-of-js-frameworks). It was a good discussion on some of the downsides of frameworks like React, Vue, and the like. I would highly recommend listening to it.
<!-- excerpt -->

During the discussion, it veers into TypeScript. Chris questions some of the "gung ho" attitudes people have about TypeScript. And while his criticisms are completely valid and he makes some good points, I wanted to defend some of the uses of TypeScript.

One of the applications I work on at my job, is an app with a .NET backend with a React/TypeScript frontend. The application is fairly large with a large range of components and models to support all the business cases and logic.

While we do have a core dev team working on it, other devs have come in and have helped out from time to time. Given the large code base, I do believe TypeScript is a blessing. I think it makes the process of getting up to speed on certain areas within the app smoother and faster. When generating objects or adding components, it becomes easier to know what props and properties the components and objects need as well as their types.

This does require developers to carefully craft the models so they're useful, and it does carry some extra overhead, but for large projects, I've found it invaluable.

Could this be written without TypeScript? Absolutely. But in use cases of large apps, I believe TypeScript is worth it.

Me arguing for TypeScript doesn't mean that Chris' arguments are wrong or that he's wrong. For smaller, simpler sites and web apps, TypeScript is most certainly overkill. You'll spend more time working with and tweaking the TypeScript config than you would just building in JavaScript.

> I think that's true of most of the tools that we use. State-based UI libraries provide an incredible benefit for certain types of user interfaces and add a lot of overhead and create a lot of potential break points in many, many others. But we have a tendency today to just use them for everything. So, for me, that's what it's really about, being a little bit more thoughtful about the tools that we choose to use and when and why we choose to use them.

I think this is the key point to all of this. We should be give more consideration to the tools we use and make sure the languages, libraries, frameworks, and all tools are the best ones for the task at hand.