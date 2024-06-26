---
title: 'Moving Away from Next.js'
date: '2023-12-06'
permalink: /posts/2023/12/06/moving-away-from-nextjs/index.html
tags:
  - Eleventy
  - Blogging
  - Performance
  - JavaScript
  - Astro
  - Next.js
---

I’ve toyed with the idea over the last year about possibly [moving](https://kpwags.com/posts/2023/04/28/some-site-and-design-updates) [away](https://kpwags.com/posts/2023/08/21/digging-into-astro) from using Next.js for my website. A recent [post on Mastodon](https://fediverse.zachleat.com/@zachleat/111524558114433017) from Zach Leatherman gave me a little bit more of a push.
<!-- excerpt -->

{% renderTemplate "webc" %}
<social-embed
    link="https://fediverse.zachleat.com/@zachleat"
    author="Zach Leatherman"
    date="December 4, 2023"
    site="mastodon"
>
    <p>Vercel’s Next.js v14 has shipped and (as one does) I had a look at the JavaScript footprint of the production build of Hello World:</p>
    <p>v14 (2023): 299 kB<br/>v13 (2022): 272 kB<br/>v12 (2021): 228 kB</p>
    <p>Unfortunately the same trend continues, even with a new bundler: the bundles are growing!</p>
    <p>(and with Tailwind included by default, too)</p>
</social-embed>
{% endrenderTemplate %}

I’ve been concerned about my site’s performance has been a concern to me, albeit I’ll admit I haven’t done that much about it. Looking at the future path of Next.js, I’m not sure it’s what I want for the future of my site.

I had been playing with [Astro](https://astro.build/), and now I’m playing with [Eleventy](https://www.11ty.dev/).

I kind of think right now I’m going to move forward with Eleventy and see if it can indeed do everything I’m looking for.

The biggest benefit of my site system is that all my posts are simple markdown files. This allows me to move between systems with minimal trouble. I no longer have to worry about backing up a Wordpress database or anything. (No disrespect to Wordpress, I just like simple markdown files.)

My site for the most part is static content. The only thing really dynamic are the pages like my bookshelf, video games, TV, movies, & music. I changed them a little while back to pull from Notion. From a performance perspective, they’re really the only non-performant pages given the JavaScript load.

So I think I’m finally going to pull the trigger and rebuild my site from the ground up. I’m just not 100% certain which tool I’m going to use. I’m going to get some basic framing up and see which one performs best and which is easiest for me to work with.