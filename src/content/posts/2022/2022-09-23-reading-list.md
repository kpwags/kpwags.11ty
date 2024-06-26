---
title: 'Reading List: September 3 - 23'
date: '2022-09-23'
permalink: /posts/2022/09/23/reading-list/index.html
tags:
  - Reading Log
  - Free Speech
  - Development
  - .NET
  - Destiny 2
  - Space
---

Life's been busy lately and I didn't get around to posting my weekly reading the last 2 weeks. I'ms starting back up with a slightly new format. I'm going to have a few links that I go into more depth with my thoughts on and then follow it up with the normal link list.
<!-- excerpt -->

<div class="reading-log"></div>

## In-Depth

{% inDepth "Mike Masnick" "Everyone's Mad At Cloudflare; Is There Room For Principled Takes On Moderation?" "https://www.techdirt.com/2022/09/06/everyones-mad-at-cloudflare-is-there-room-for-principled-takes-on-moderation-when-everyone-wants-what-feels-right-to-them/" %}
  This all came to a head at the beginning of the month when Cloudflare stopped providing services for Kiwi Farms so it's probably several news cycles behind us at this point. I wanted to share this because it's important to think about how difficult content moderation actually is.

  <blockquote><p>The biggest issue with targeting infrastructure providers is that — generally speaking — they don't have any nuance on their side when it comes to remedies. They pull their services, and an entire site breaks. It does not allow for the more narrow targeting of specific content. It's very much a nuclear option.</p></blockquote>

  I think this is kind of the key point when thinking about content moderation at the infrastructure-level. When looking at services like Twitter and Facebook, if they want to kick someone off their platform, users can just go to a different service, or start their own like Trump did with Truth Social, cesspool it might be. There are even open source solutions like [Mastodon](https://joinmastodon.org/) that would allow someone to quickly setup their own Twitter clone.

  When going after the infrastructure-level, it's a lot harder to start your own infrastructure platform like Cloudflare.</p>

  I'm not saying this to defend Kiwi Farms. That site was fucking awful and the world is better with it offline. But like Mike Masnick talks about, it get's messy.

  <blockquote><p>When we're talking about taking down entire sites because some content on them is objectionable, even to a horrifying level, things get really messy, really fast.</p></blockquote>

  Who determines what is "good" content, and what is "bad" content. It gets complicated and I'm still not convinced there's a good answer. It's often very nuanced and there really isn't a one-size-fits-all answer. It just gets a little more dangerous the farther up the tech stack you go.

  Mike Masnick continues to go over the issues at stake here.

  <blockquote><p>The fire department analogy also got me thinking, because it kind of highlights how much of the anger directed at Cloudflare is similarly misplaced. The anger is basically saying “you need to remove your protection, so that we can burn Kiwi Farms down.” But, the larger question remains unaddressed: why does Kiwi Farms exist in the first place, and why is it left to Cloudflare to determine whether or not the public should be able to burn it down?</p></blockquote>

  And this is the crux of the issue. We in America are blessed with the First Amendment. The government is not allowed to restrict what people can and can't say. Private companies, however, through the same first amendment are allowed to determine what can and can’t be said on their platforms.

  One final note, I do appreciate the response from Cloudflare. They too recognize how much power they hold at the infrastructure level and don't take their responsibility lightly. You should read their [statement on their policies and their approach](https://blog.cloudflare.com/cloudflares-abuse-policies-and-approach/) to all of this. They talk a great deal about how they handle sites and services that use their platform.
{% endinDepth %}

{% inDepth "Joël Quenneville" "Working Iteratively" "https://thoughtbot.com/blog/working-iteratively" %}
  I thought this was a good article looking at how we as developers can improve how we write code.

  <blockquote><p>Before even getting into code, try to break your features into smaller chunks. What’s the smallest incremental amount of value you can ship to customers? This allows you to ship and get feedback faster while also giving you more flexibility to pause and shift focus to other priorities.</p></blockquote>

  This is definitely something I’ve done more of as I have grown as a software developer. In my early days I was very much just of the mind to “start writing code” and see where things go. Nowadays, both at work and on side projects, I try to slow things down and break up tasks into smaller chunks.

  Ironically, by slowing things down up front, I’ve found it ends up speeding things up down the line while doing the actual development.
{% endinDepth %}

## Link Blast

<h3 className="text">👨🏼‍💻 Software Development</h3>

[New in Entity Framework 7: Bulk Operations with ExecuteDelete and ExecuteUpdate](https://timdeschryver.dev/blog/new-in-entity-framework-7-bulk-operations-with-executedelete-and-executeupdate?) *(Tim Deschryver)*

[Any() vs Count() in .NET: Which One is Better?](https://code-maze.com/any-vs-count-dotnet/) *(Marko Hrnčić)*

[Edge's Super-Res Image Enhancement](https://textslashplain.com/2022/09/12/edges-super-res-image-enhancement/) *(Eric Lawrence)*

[JetBrains Rider .NET Watch Run Configuration Plugin](https://blog.jetbrains.com/dotnet/2022/09/12/jetbrains-rider-net-watch-run-configuration-plugin/) *(JetBrains)*

[When to refactor](https://blog.ploeh.dk/2022/09/19/when-to-refactor/) *(Mark Seemann)*

[Why the Number Input is the Worst Input](https://stackoverflow.blog/2022/09/15/why-the-number-input-is-the-worst-input/) *(Jared Toporek)*

[I have complicated feelings about TDD](https://buttondown.email/hillelwayne/archive/i-have-complicated-feelings-about-tdd-8403/) *(Hillel Wayne)*

<h3 className="text">🖥 Technology</h3>

[Getty Images bans AI-generated content over fears of legal challenges](https://www.theverge.com/2022/9/21/23364696/getty-images-ai-ban-generated-artwork-illustration-copyright) *(The Verge)*

<h3 className="text">🎮 Gaming</h3>

[Destiny 2's new Eruption mode is the best thing to happen to its PvP in years](https://www.theverge.com/2022/9/7/23340667/destiny-2-eruption-iron-banner-mode-explained-review) *(The Verge)*

<h3 className="text">📈 Business and Finance</h3>

💰 [From Boom to Gloom: Tech Recruiters Struggle to Find Work](https://www.nytimes.com/2022/09/07/technology/recruiters-tech-layoffs.html) *(New York Times)*

<h3 className="text">🔬 Science</h3>

[New JWST image reveals full glory of Neptune, its moons, and rings](https://arstechnica.com/science/2022/09/webb-telescope-captures-dazzling-views-of-neptune-and-its-moons/) *(Ars Technica)*

<h3 className="text">🎧 Podcasts</h3>

[Techdirt Podcast Episode 328: The Problems With The California Kids' Code](https://www.techdirt.com/2022/09/06/techdirt-podcast-episode-328-the-problems-with-the-california-kids-code/)

<h3 className="text">🎵 A Song to Leave You With</h3>

#### TIM - High Hopes

<fit-vids>
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/pw0kJMh9SfM"
        title="TIM - High Hopes"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
</fit-vids>