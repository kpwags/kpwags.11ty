---
title: "My Next Side Project and Choosing its Platform"
date: '2026-01-15T23:06:09.494Z'
permalink: /posts/2026/my-next-side-project-and-choosing-its-platform/index.html
description: "I've been debating what I want to use for my next side project and keep going back and forth."
tags:
  - Side Projects
  - .NET
  - Blazor
  - React
---
I've had an idea for my next side project for a little while now. I'll share more in a little bit, but I wanted to just muse a little bit about building it and what platform I would like to use.
<!-- excerpt -->

I'm generally a fan of .NET and this is definitely the root platform I intend to build it on. .NET has come such a long way since the olden days of it being Windows only. It's now incredibly powerful and can be run on Windows, Mac, and Linux. It really is pretty awesome that no matter what platform you use, you can still run and develop .NET apps. There are a few limitations and gotchas, but by and large, if it's a modern .NET app, your operating system can work with it.

My choice of backend isn't in doubt, but my choice of frontend is. For the frontend, I could use Blazor, I could just have a .NET web API and use something like React, Vue, or Svelte. I could even go "old school" and just use ASP.NET MVC like it's 2010. I keep going back and forth on this and it's left me slightly paralyzed.

Blazor is the new player in the .NET ecosystem. I've used it at work and it's easy to work with, but I'm not always a fan of how it operates almost exclusively through SignalR and WebSockets. I have to be extra careful with the code as exceptions can cause extra problems for the end user if the SignalR connection is broken. I mean error handling is always important, but I've found I have less wiggle room here. Part of this could also be me needing more experience and work with it.

I know React well from previous projects and using it quite at bit at work. It's issues are there and I can't say it's my go to for projects anymore. I'm not against using it, but I think I'd rather go for more of a multipage application.

I've heard good things about Svelte and have been meaning to give it a go, but I think I'd want to build something smaller to start with Svelte to teach myself it. The same would apply to Vue since I've never worked with it.

That leaves ASP.NET MVC as the last option. It definitely feels old school, but it does check a lot of the boxes for how I want to build this project. Needless to say, this is what I'm leaning towards. It's been a while since I've used it so I might be a little rusty, but it will be multipage and server rendered, two things I'm leaning towards wanting for this.

I haven't made a decision just yet, I'm currently working on building out the database and some of the backend framing, but I wanted to sort of just lay out what I was thinking and where I was planning on going.