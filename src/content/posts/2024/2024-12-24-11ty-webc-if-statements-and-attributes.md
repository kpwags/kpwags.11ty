---
title: "11ty WebC If Statements and Attributes"
date: '2024-12-24T15:23:22.379Z'
permalink: /posts/2024/12/24/11ty-webc-if-statements-and-attributes/index.html
description: "I was building a component for my site and needed to add some logic as to what displays. After some searching and experimentation, I figured it out and thought I'd share what I found."
tags:
  - Development
  - WebC
  - 11ty
---
I've been slowly building out components for my site and have been slowly moving more and more to [WebC](https://www.11ty.dev/docs/languages/webc/) rather than shortcodes. One of the things that I was having trouble figuring out how to do was handle if statements with WebC. I build shortcodes with JavaScript, so if statements are second nature to me. I needed to do a little digging with WebC.
<!-- excerpt -->

I've been working on a new component for sharing my 2024 media consumption summaries. At the beginning of the year I like to share the books, movies, TV & video games I consumed the previous year. I was looking to build something a little nicer this year and figured I'd build a new component. I wanted something that I could use for the four different types of media. It's not terribly complicated, but the different types have different requirements. For books, I want to include the author. For video games I want to include the platform. Movies & TV don't have either. So I wanted to use conditional logic to handle what gets displayed.

Let's think about the book example versus a movie. I want the author to be displayed when I pass in the author as an attribute or prop of the component.

```html
<media-box
  title="Wanderers"
  image="https://i.postimg.cc/KvtWvfkk/wanderers.jpg"
  link="https://bookshop.org/p/books/wanderers-chuck-wendig/11314587?ean=9780399182129"
  rating="5"
  author="Chuck Wendig"
>
  De Niro vs. Pacino. They don’t make heist movies like this anymore.
</media-box>
```

```html
<media-box
  title="Heat"
  image="https://i.postimg.cc/kGkFdTpY/temp-Imagezbw7-ZR.jpg"
  link="https://www.imdb.com/title/tt0113277/"
  rating="4"
>
  De Niro vs. Pacino. They don’t make heist movies like this anymore.
</media-box>
```

Both components take mostly the same attributes. The only difference is that author is included for books. It would be repetitive to build 2 components.

Fortunately WebC has the [webc:if syntax](https://www.11ty.dev/docs/languages/webc/#webcif) so I should be able to conditionally display content. And to make matters a little easier, I was able to find out that you can just use the attribute name in the `webc:if` attribute.

```html
<div class="author" webc:if="author != ''" @html="author"></div>
```

Above is the div where I would display the author in the media box. The `if` block compares the author attribute and checks to see if it's a blank string. If it is not a blank string, it renders. If it is a blank string, it does not get rendered.

It took me a little more time than I'd like to admit to figure this out so I thought I'd share in case it helps someone else.