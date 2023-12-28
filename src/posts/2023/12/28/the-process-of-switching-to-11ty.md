---
title: 'The Process of Switching to 11ty'
date: '2023-12-28'
tags:
  - Eleventy
  - 11ty
  - Development
---

Over the course of the last month or so, I began the process of converting my site from Next.js to 11ty. It was actually a pretty straightforward process and I’m happy with the result. I figure I’ll share some of the gotchas and the challenges that I faced moving my various pages over.
<!-- excerpt -->

## Handling All My Blog Posts

This was one of the first tasks I set out to do. I wanted to move all my blog posts into 11ty and also keep their URLs. The last thing I wanted to do was to break all my previous links. In Next.js, my URL structure was `/posts/{year}/{month}/{day}/{slug}` so I needed to maintain that. That meant that I had to move all the markdown files into the corresponding directories and subdirectories.

### An Easier Permalink Solution

I unfortunately realized the permalink front matter property existed AFTER I created all the subdirectories. I considered re-organizing, but have decided against it. I will probably change things up slightly for 2024 and beyond, but it didn’t seem worth the effort to go through all the old posts and all the work I did to get them in the correct directories.

So in hopes of saving someone from my folly, you can add the following to your front matter to have 11ty automatically place the generated content in the proper spot:

```markdown
---
permalink: '/posts/2023/12/27/now-on-11ty'
---
```

### MDX to Markdown

I also had to rename all my markdown files from `.mdx` to `.md` so 11ty could find and read them. Thankfully I didn’t use too many JSX components, so I was easily able to convert them to [shortcodes](https://www.11ty.dev/docs/languages/liquid/#shortcodes) which made things relatively simple.

### Shortcode Conversion Example

 One example of an JSX component I have is for YouTube embeds. For Next.js, this is what I used:

 ```jsx
 import Head from 'next/head';

const YouTubeEmbed = ({
    id,
    title,
}): JSX.Element => (
    <>
        <Head>
            <script type="module" src="/scripts/fit-vids.js" />
        </Head>
        <fit-vids>
            <iframe
                width={560}
                height={315}
                src={`https://www.youtube.com/embed/${id}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </fit-vids>
    </>
);

export default YouTubeEmbed;
 ```

Converting it to a shortcode was relatively simple:

```js
module.exports = (id, title) => `
<fit-vids>
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${id}"
        title="${title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
</fit-vids>
`;
```

I was happy with how it ended up working out as I don’t have to worry about duplicating all the iframe code each time I want to embed a YouTube video.

## Handling My Archives Page

One thing that I did end up losing in the conversion is the yearly view for my archives pages. This was probably the page I spent the most time working on and after a lot of grief, I opted to push on without it for the initial version, and go back and [add it in later](https://github.com/kpwags/kpwags.11ty/issues/68). For my [archives](https://kpwags.com/archives/), all I have currently is all posts in a given month. I figure it’s a little more narrow and might be slightly more useful all things considered.

I was able to get that working thanks to a [great blog post by James Doc](https://jamesdoc.com/blog/2021/11ty-posts-by-year/).

## Supporting My Notion Data

This part is something I’ve been adding to my site over the last year. I’ve been pulling in my Notion lists for books, video games, TV shows, music, & movies. I wanted to maintain that in my new build and I was able to do that. I found this [walkthrough for accessing data for AirTable](https://danabyerly.com/articles/using-airtable-with-eleventy/) and was able to use that as a template to take the code from my Next.js implementation and apply that to 11ty.

The only thing I’ve lost in the conversion is the real time updates of any data changes in Notion. This was by choice. One of the things I’ve noticed with my Next.js site was that performance was a little less than stellar for those pages while they fetched the data. I decided with my hope to post more, my site would naturally be built more often and thus updated. I also figure it wouldn’t matter if the pages aren’t quite up to date. They’ll be close and the performance improvements would be worth it.

## Overall Thoughts

Overall, the process of converting my site over to 11ty was relatively smooth. I had some small hiccups, but they’re to be expected whenever you are learning a new platform or tool. I’m happy with how things have ended up and already have a few features and enhancements I intend on adding to my site.

For anyone building a new blog or personal site, I’d highly recommend 11ty as the tool to use.