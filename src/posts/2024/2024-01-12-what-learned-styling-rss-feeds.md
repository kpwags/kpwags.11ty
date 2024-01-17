---
title: 'What I Learned: Styling RSS Feeds'
date: '2024-01-12'
permalink: /posts/2024/01/12/what-i-learned-styling-rss-feeds/index.html
tags:
  - What I Learned
  - RSS
---

I’m a big fan of RSS feeds. I believe that everyone who has a blog or a personal site should have one set up so that others can consume their content. The one downside is that when you open the RSS link in your browser, it renders as XML which can be confusing, especially to those who might not know what RSS or XML is.
<!-- excerpt -->

A while back I stumbled onto a [post](https://darekkay.com/blog/rss-styling/) by Darek Kay who had figured out how to make the feeds look nicer using [XML & XSLT](https://developer.mozilla.org/en-US/docs/Web/XSLT/Transforming_XML_with_XSLT) to make them look nicer. The gist of it is XSLT stands for Extensible Stylesheet Language Transformation, and what it does it transform XML into a different format, in this case, HTML. I took a quick look at how I was building my feeds with Next.js and realized that it wouldn’t be super simple to implement so I threw it on the back burner and pretty much forgot about it.

A week ago I saw another [post](https://rknight.me/blog/styling-rss-and-atom-feeds/), this one by Robb Knight talking about how he styled his feeds. Thinking about it some more and looking at Robb’s post (who also got the idea from Darek), I realized with my migration to [Eleventy](https://www.11ty.dev), this would actually be much more (easily) feasible than it was with Next.js.

I’d highly recommend checking out both [Darek’s post](https://darekkay.com/blog/rss-styling/) and [Robb’s post](https://rknight.me/blog/styling-rss-and-atom-feeds/) since they’re who got the ball rolling for me, but here’s some of the highlights of what I did.

Like Robb & Darek, I started with [pretty-feed-v3](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl) as it provided a good jumping off point. And again, like both of them, I pulled out all the Tailwind code that it came with in favor of my own CSS stylesheet.

It has been a long while since I last used XML & XSLT...we’re talking 10+ years. It took me a little bit to figure out exactly what I needed to do. It didn’t help that I started with my Atom feed where pretty-feed-v3 was focused on the RSS spec.

## XML & XSLT

Actually, let’s back up a little bit here to go over some XML parsing for those who might not be familiar.

Let’s look at the Atom XML for my site.

```xml
<feed xmlns="http://www.w3.org/2005/Atom" xml:base="https://kpwags.com/">
	<title>Keith Wagner</title>
	<subtitle>Thoughts and musings of a nerd and software developer.</subtitle>
	<link href="https://kpwags.com/"/>
	<link href="https://kpwags.com/rss/atom.xml" rel="self"/>
	<updated>2024-01-10T00:00:00Z</updated>
	<id>https://kpwags.com/</id>
	<author>
		<name>Keith Wagner</name>
		<email>hello@kpwags.com</email>
	</author>
	<entry>
		<title>Remembering Cookie</title>
		<link href="https://kpwags.com/posts/2024/2024-01-10-remembering-cookie/"/>
		<updated>2024-01-10T00:00:00Z</updated>
		<id>https://kpwags.com/posts/2024/2024-01-10-remembering-cookie/</id>
		<content><!-- The HTML Content --></content>
	</entry>
	<!-- More Entries -->
</feed>
```

The way XSLT navigates XML is much like you’d see in a file directory. So when you see something like

```html
<xsl:value-of select="/atom:feed/atom:title"/>
```

What that is saying (ignore the `atom:`, that was my first gotcha I dealt with), is navigate to the `<feed>` node and find the node within it called `<title>`

The gotcha with Atom is that the nodes in XSLT need to be prefixed with `atom:`. But in general, each '/' indicates traveling down an XML node as you would your file system.

## Back to Building

Since I started with Atom, the paths in the starter template didn’t work as they were built for the RSS spec. Needless to say, most of the page came back blank. Once I re-familiarized myself with XSLT, I started to remember what I was doing. I changed the paths to match Atom...and still nothing. That’s when I figured out the gotcha I mentioned above about having to prefix the paths with `atom:`. Easy enough, I did that and sure enough, the content appeared.

The next step was building the styles in my CSS stylesheet. I got it looking nice and how I wanted it.

I was about ready to create a copy of the file for my RSS spec feed, when I noticed that Robb had discovered that if the value in the path wasn’t found, it outputted nothing. The lightbulb went off in my head as well since I remembered what the pages looked like when I first started. Like Robb, I created duplicate nodes inside the different elements:

```html
<h2>
	<xsl:value-of select="/atom:feed/atom:title"/>
	<xsl:value-of select="/rss/channel/title"/>
</h2>
```

This means that when the user is viewing the Atom feed, they’ll get the top node with the bottom node returning blank. And if they’re viewing the RSS feed, it will be the reverse.

I made the same changes to all of my different feeds and I was just about done.

The only thing I then had to figure out was how to configure custom headers in Netlify to support Safari. Per pretty-feeds, I needed to add custom headers to the feeds so that Safari would render them properly.

```
Content-Type: application/xml; charset=utf-8
x-content-type-options: nosniff
```

I found their [documentation](https://docs.netlify.com/routing/headers/#syntax-for-the-headers-file) and I was good to go. I created the pull request, checked the deploy preview, and sure enough the headers were set properly.

You can view the full code for my [Atom](https://github.com/kpwags/kpwags.11ty/blob/main/src/rss/everything_atom.njk) & [RSS](https://github.com/kpwags/kpwags.11ty/blob/main/src/rss/everything_rss.njk) feeds, the [XSL Stylesheet](https://github.com/kpwags/kpwags.11ty/blob/main/public/feedstyles/rss.xsl), &  the [CSS Stylesheet](https://github.com/kpwags/kpwags.11ty/blob/main/public/css/feeds.css) on GitHub.