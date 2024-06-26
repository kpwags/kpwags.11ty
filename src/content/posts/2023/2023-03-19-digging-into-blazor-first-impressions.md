---
title: 'Digging Into Blazor - First Impressions'
date: '2023-03-19'
permalink: /posts/2023/03/19/digging-into-blazor-first-impressions/index.html
tags:
  - .NET
  - Blazor
  - C#
  - Development
---

I've been hearing a lot of good things about Blazor for a while now and as a .NET developer I figured it was time for me to see what the fuss was about.
<!-- excerpt -->

This post will be the first in a multi-part series.

<section class="blog-series">
    <h4>Series: Digging into Blazor</h4>
    <ul class="posts">
        <li class="post"><span class="current">First Impressions</span></li>
        <li class="post"><a href="/posts/2023/04/04/digging-into-blazor-entity-framework">Integrating with Entity Framework</a></li>
        <li class="post"><a href="/posts/2023/07/31/blazor-custom-authentication">Setting Up Custom Authentication</a></li>
        <li class="post"><a href="/posts/2023/09/29/digging-into-blazor-forms">Forms</a></li>
    </ul>
</section>

To get started, I went through [Microsoft's tutorials](https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/intro). Playing around with it, my first thought was this felt kind of similar to my time years ago working with ASP.NET MVC sites. It was different, and it looked different in a good way, but the little bit of familiarity was definitely beneficial as it gave me a good jumping off point.

After going through the tutorials, I realized I needed something to build. The best way I've found for myself to learn new languages and tools is to build something. Tutorials only go so far. The project I decided to build is an app to inventory my baseball and [Star Wars Customizable Card Game](https://en.wikipedia.org/wiki/Star_Wars_Customizable_Card_Game) cards. I recently found a bunch of cards from when I was a kid, so I figured it'd be a fun way to learn a new framework.

The first thing I did was to figure out the technology I was going to use. To make things simple, I was just going to stick with Microsoft technologies for the core of the app. I was going to store the data with Entity Framework and use Microsoft Identity for user authentication. I'm not sure I really need user authentication for a little side project, but figured “why not?”.

I'll go into more details in later posts, but suffice it to say, it was both familiar and alien at the same time. The libraries used have been the same ones I've used in both Digital Family Cookbook and my fitness tracker which helped smooth out the differences in usage. But the ways I needed to use them posed some challenges and made my learning curve a tad bit steeper.

I've also decided to use Tailwind to help with the styling for this project. This is one of the things I kind of miss from working with React, TypeScript & Vite. The build system made it pretty easy to adjust to changes. I'm currently having some issues in bundling my CSS. Part of this is because I'm trying to trim down the Tailwind bundle size by limiting what Tailwind classes are included. I'm sure there's a way to make this easier, but I often find myself having to manually run a `yarn` command to build the latest CSS based on the classes included. This is probably a little more on me though as I probably need to familiarize myself with some of the internal tooling.

I've been making a lot of progress over the last few weeks. So much so that I'm actually a little surprised at how easy it is to build things. In my case it helps that I'm familiar with .NET, but I think that bodes well for Blazor. The easier it is to get a minimal viable product (MVP) out the door, the better.

I'm excited by how nice it is to work in Blazor and am hoping by sharing my experiences starting up, I can help others get off the ground.