---
title: "Handling Page Layouts Without a Framework"
date: '2024-10-28T23:22:24.053Z'
permalink: /posts/2024/10/28/handling-page-layouts-without-a-framework/index.html
description: "Building a web application without a framework and handling common page components can be a challenge."
tags:
  - Web Development
  - Development
  - Web Components
---

I’m currently working on my media repository, what will hopefully be version 1.0 of sorts. What makes this stand out for me is the fact that it’s the first front end project I’m building that will not use a framework in 10+ years. So far it’s going well, I’m making good progress on it and I’m actually pretty happy with where things are with it. The one thing that I haven’t quite figured out though is the base layout.
<!-- excerpt -->

Let’s face it, most sites have some form of a base layout that all their pages share. If you look at my personal site, all pages share the header and the footer. 

<div class="padded-image">
  {% image "./images/site-screen-cap.jpg", "A screen capture of my about page showing that each page has a header and footer with content between them." %}
</div>

The content in between them might change, but the header and footer are always there, and always the same. I really don’t want to have to copy and paste the header and footer onto every page of my site. If I make a change, say by adding a new page to the footer, that would mean I’d have to update the footer on every page of the site. For my personal site, that’d be ***hundreds*** of pages. Fortunately I use [11ty](https://www.11ty.dev/) for my personal site and it does that automatically.

{% raw %}
```liquid
<body>
  {% include "header.html" %}
  {{ content }}
  {% include "footer.html" %}
</body>
```
{% endraw %}

I built a file called `footer.html` and put the code for the footer in it. So every page is built with the footer HTML automatically loaded at the bottom of the page. Same goes for the header.

But since I’m not using a framework or 11ty for my media repository, I’d have to add the HTML to every page. My media repository is made up of a little over a dozen pages, so while not as bad as my personal site, it’s also not great.

<div>
  {% image "./images/not-great.gif", "Not Great Bob" %}
</div>

My solution for my media repository is a web component for the header and the footer. This feels less than ideal as I’m not sure web components are particularly the best fit for page layouts.

For my media repository, it does make it a little simpler and does help make something like my sidebar a little more dynamic. Instead of copying and pasting my sidebar into every file, pages now look like this.

```html
<body>
  <wags-media-header></wags-media-header>
  
  <div class="page-content">
    <wags-media-sidebar activeLink="system-video-services"></wags-media-sidebar>
    <main>
      ...
    </main>
  </div>
</body>
```

I have both my header and my sidebar<a href="#footnote-1" class="footnote-link" aria-describedby="footnote-1">1</a> as web components. The downside to this is that JavaScript needs to be enabled in order for the page to work. For my media repository, that’s not a big deal at all as it’s built only for me and I will be using JavaScript to handle a lot of the site and will have JS enabled. For something like my personal site, that’s kind of a deal breaker<a href="#footnote-2" class="footnote-link" aria-describedby="footnote-2">2</a>.

I think HTML imports used to be a thing, but they’re definitely not available anymore. I’m kind of at a loss as to what the best way to handle this is. I could definitely integrate 11ty into this, but part of what I want to do for this project as it is, is to intentionally build it without any frameworks, without any tooling. It’d be nice to know that I won’t have to worry about any npm dependencies failing later down the road.

Right now I’m going to move forward with the solution I have as this site is only for me, so I can be fine with it only working with JS enabled. I wouldn’t mind a better solution in the future, so if there’s a technology or methodology I’m missing, please let me know.

---

<h2 class="footnotes">Footnotes</h2>

<ol class="footnotes">
  <li id="footnote-1">You can view the code as it currently stands <a href="https://gist.github.com/kpwags/0ae373f1bef4f9f3ff0dcf68f95338cc">here</a>. It does allow me to dynamically highlight what page is active so it has some benefits. It just feels a little “bulky” to me.</li>
  <li id="footnote-2">My personal site’s primary focus is on blog posts and articles. No one should need JavaScript enabled to read articles. Most of the content on my site works without JS, although I have a few “niceties” available only to those with JS enabled.</li>
</ol>