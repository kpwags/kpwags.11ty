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

<div class="embedded-post">
    <blockquote class="post">
        <div>
            <p>Vercel’s Next.js v14 has shipped and (as one does) I had a look at the JavaScript footprint of the production build of Hello World:</p>
            <p>v14 (2023): 299 kB<br/>v13 (2022): 272 kB<br/>v12 (2021): 228 kB</p>
            <p>Unfortunately the same trend continues, even with a new bundler: the bundles are growing!</p>
            <p>(and with Tailwind included by default, too)</p>
        </div>
        <div class="credit">
            <div class="author">(<a href="https://fediverse.zachleat.com/@zachleat" target="_blank" rel="noreferer noopener">Zach Leatherman</a>) <a href="https://fediverse.zachleat.com/@zachleat/111524558114433017" target="_blank" rel="noreferer noopener">December 4, 2023</a></div>
            <div class="source-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764.442.505.661 1.187.661 2.046v4.203z" />
                </svg>
            </div>
        </div>
    </blockquote>
</div>

I’ve been concerned about my site’s performance has been a concern to me, albeit I’ll admit I haven’t done that much about it. Looking at the future path of Next.js, I’m not sure it’s what I want for the future of my site.

I had been playing with [Astro](https://astro.build/), and now I’m playing with [Eleventy](https://www.11ty.dev/).

I kind of think right now I’m going to move forward with Eleventy and see if it can indeed do everything I’m looking for.

The biggest benefit of my site system is that all my posts are simple markdown files. This allows me to move between systems with minimal trouble. I no longer have to worry about backing up a Wordpress database or anything. (No disrespect to Wordpress, I just like simple markdown files.)

My site for the most part is static content. The only thing really dynamic are the pages like my bookshelf, video games, TV, movies, & music. I changed them a little while back to pull from Notion. From a performance perspective, they’re really the only non-performant pages given the JavaScript load.

So I think I’m finally going to pull the trigger and rebuild my site from the ground up. I’m just not 100% certain which tool I’m going to use. I’m going to get some basic framing up and see which one performs best and which is easiest for me to work with.