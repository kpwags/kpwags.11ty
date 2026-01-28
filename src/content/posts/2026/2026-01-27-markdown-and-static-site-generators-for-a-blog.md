---
title: "Markdown and Static Site Generators for a Blog"
description: "I've been using markdown for my blog posts for over 10 years now. I think it's a great option."
date: '2026-01-27T20:08:28.552Z'
permalink: /posts/2026/markdown-and-static-site-generators-for-a-blog/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - Markdown
  - Blogging
  - Jekyll
  - Next.js
  - 11ty
  - Personal Sites
---
Ever since the end of 2015, my blog has been running on some form of static site generator. First it was Jekyll, then Next.js, now I'm running 11ty and I can't see myself ever going back to something like WordPress, Ghost, or some other content management system (CMS) based on a database. Writing in markdown is the way to go for my needs.

Before going into why I like markdown, that last line should be highlighted. Everyone has different purposes and needs for building their sites. I use mine to play around with things, share my writing and media diet. This makes markdown especially appealing for me as my posts are basically just a folder of markdown files. Each time I migrated, I had to play around with some of the front matter in the files, but little else. For others, there might be a good reason to tie into Ghost or one of the other content management systems. It's important to do what works best for your needs or preferences.

## Folder Full of Text Files

Much like Obsidian and iA Writer with notes, using markdown for a blog means having a bunch of markdown files in a folder somewhere in your project. This has several benefits, the first one I can think of is that it's easier to back up and version.

I've been blogging off and on since 2007. My first sites, and their posts are long gone. I can probably find some of the posts in the Internet Archive if I want to (I might do this at some point), but the posts would have to be manually copied from the archive. From 2007-2015 I operated first under my own system (how I taught myself PHP) or WordPress, and briefly an early version of Ghost. I was notorious for playing around, and often wasn't as studious as I should have been backing up my database. Whoops. Part of that is most certainly on me, I'm not going to try to claim that backing content up on WordPress and the like is difficult, there's just an ease when you have a folder full of files that can be copied, pasted, and easily added to a version control tool like Git.

## Flexible Content

For a blog like mine, the content is pretty simple all things considered. Most of my posts are just text and images. Maybe some lists or quotes, maybe even a code block. All of this can be written in markdown with little issue. I've had to tweak some CSS here and there for the occasional weirdness, but those cases aren't all that common.

But what also makes markdown so nice is that I can mix in HTML as needed. If I'm writing a post that has something more complex, I can just mix in some HTML as if I was in an `.html` file. I don't have to do any extra tricks, just write good ol' HTML. And this has been the case for when my blog was on Jekyll, Next and now 11ty.

That, and the various platforms can provide additional features that can also be mixed in. 11ty has functionality like [shortcodes](https://www.11ty.dev/docs/shortcodes/) that allow me to create reusable content for things like book notes or anything else I want. Similarly I can inject [WebC](https://www.11ty.dev/docs/languages/webc/) components into my posts with minimal effort. WebC are similar to web components in some of their functionality. It's how I build my media cards you see in my yearly media posts like my recent one on [movies](/posts/2026/movies-i-watched-in-2025/). Instead of having to write out the HTML for each movie, all I have to do is call the component.

```html
<media-box
  title="Rogue One: A Star Wars Story"
  link="https://www.imdb.com/title/tt3748528/"
  image="https://i.postimg.cc/g23ZjSrs/star-wars-rogue-one.jpg"
  rating="5"
>
  One of the best Star Wars movies and definitely the best of the new movies. A good story and enjoyable.
</media-box>
```

One note is that things like shortcodes and WebC are definitely platform-specific. They are things that I had to go through and adjust every time I migrated between platforms. The good news though is that most platforms, be it Next.js or 11ty have something that can do this.

## Markdown is Becoming Ubiquitous

The other good thing about markdown is that other platforms are picking it up. You can export your Apple Notes in markdown format. Google Docs has started to support it as well. The benefit is that more and more apps support it, which means that it's becoming more likely even more will. So it could be that no matter what app you use to write, be it on your phone, tablet or laptop; you'll likely be able to export it to markdown for your blog. For me, I write my posts in Obsidian or iA Writer, both support markdown natively.

## Drawbacks

For me, the biggest drawback is that in order to publish new posts, I need to create the post in my Git repository, create a pull request, and on completion, it will build and deploy my site. No more can I just pop open a browser window, write a quick entry in WordPress' admin panel, and click publish. Now to be fair, I'm pretty sure there are ways to streamline this process, but I haven't dug into it at all that much as I'm actually mostly happy with my process. It's a slight drawback for me, but not one that comes anywhere close to a showstopper for me. I'm also pretty sure I could find a better way to do this if I dug into it more, but I'm relatively happy with my process.

Again though, each person has their own needs and desires for their website. Some people like and prefer platforms like WordPress. When it comes to personal sites, I'm not sure there really is a wrong answer. Go with what you like and are comfortable with, you can always change it later. The important thing is that it's *yours*.