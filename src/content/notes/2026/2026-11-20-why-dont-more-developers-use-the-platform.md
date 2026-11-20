---
title: "Why Don’t More Developers “Use the Platform”?"
date: '2026-11-20T08:47:00.000Z'
permalink: /notes/why-dont-more-developers-use-the-platform/index.html
link: https://nolanlawson.com/2026/10/03/why-dont-more-developers-use-the-platform/
author: Nolan Lawson
tags:
  - Development
  - Web Development
  - Nolan Lawson
---
> And often, even with a robust standard, libraries on npm would fill a useful gap between framework ergonomics and the platform underneath it. I always found it intriguing that many React developers preferred to stick to JSX and React idioms – raw DOM APIs felt “icky” – but were perfectly happy to use lower-level libraries where raw DOM manipulations are common. For example, a virtual list library might happily use raw DOM APIs for pure performance, while exposing higher-level primitives that a novice React developer could better grasp. In a sense, the ecosystem of React components led to a natural division of labor where those with more expertise packaged up unfamiliar platform APIs in a more familiar form factor.

I’ve been guilty of this more than once. Reach for a solution that might be less performant or more convoluted because it was “easier”.

> In any case, these are my longwinded and somewhat conflicting thoughts on “use the platform.” As a mantra I love it, because it succinctly captures a feeling I have when I’m looking at some overwrought pile of spaghetti code and thinking how much better and more elegant it would be if the author just understood the layers beneath them a bit better. At the same time, I’ve _been_ that author, and I’ve felt the joy of building such beautiful, messy code (beautiful to me, anyway), so I think it’s worth understanding where such developers are coming from. For that reason, I’m sure we’ll be hearing “use the platform” for as long as there are platforms.