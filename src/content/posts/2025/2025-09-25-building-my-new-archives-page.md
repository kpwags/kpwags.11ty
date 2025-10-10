---
title: "Building My New Archives Page"
date: '2025-09-25T23:28:40.977Z'
permalink: /posts/2025/09/25/building-my-new-archives-page/index.html
description: "I'm making some big changes to my archives page in the redesign and thought I'd share how I'm building it."
tags:
  - 11ty
  - Personal Sites
  - Development
  - Web Development
  - Redesign
---
One of the things I'm doing with my redesign is changing my archives page. Right now if you go to my [archives page](/archives), it's a bunch of links to pages for year or month and year. The new page is going to just be everything broken up by year.
<!-- excerpt -->

<div class="bordered-image">
{% image "./images/new-archives-page.png", "A screenshot of my new archives page with all the posts listed with their date and post type" %}
</div>

{% raw %}

One of the things I want to do with this redesign is to clean up my code and address tech debt accumulated by me learning 11ty on the fly. One of the pages that was a challenge was the archives page. With Next.js, all the pages were automatically generated. It was seamless when the year turned into the next. With 11ty, I couldn't quite manage to make it work that simply. Every January, I have to add a new page for the yearly page. It's mostly a copy/paste job and easy enough, but I decided to go another route this time around.

## Defining What I Want

For my archives page, I wanted a page that just listed all my blog posts, notes, reading logs, notes, and book notes. I didn't need any excerpts, or anything along those lines. All I wanted was the title, date, and what kind of post was it. To have it slightly more organized, I wanted to break it out by year, but other than that, keep it simple.

## Tweaking My Collections

For my site content, I take advantage of the `.11tydata.js` files. In the root directory of my content folders, there's a `.11tydata.js` file that help define the collection. One of the things you can add is computed data. You can use it to take the frontmatter from the posts and automatically build some data points that get attached to every object in the collection.

Below is an excerpt from the `.11tydata.js` file for my notes. Any computed data should go in the `eleventyComputed` object. For all of my posts, I added the following properties: `dateString`, `shortDateString`, `postMonth`, & `postYear`. All use [dayjs](https://day.js.org) to provide a formatted date. I use this on different pages, but I can also use it in the JavaScript code to build the archives collection.

```javascript
export default {
  layout: 'layouts/notes.html',
  tags: 'shortnotes',
  eleventyComputed: {
    dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
    shortDateString: ({ page }) => dayjs.utc(page.date).format('MMM D'),
    postYear: ({ page }) => dayjs.utc(page.date).format('YYYY'),
  }
};
```

## Digging into Collections

[Collections](https://www.11ty.dev/docs/collections/) can contain whatever you want. There's no set structure which made my job easier. I decided I wanted to have the following model:

```json
{
  year: number,
  posts: [
    {
      title: string,
      url: string,
      year: number,
      dateString: string,
      type: {
        name: string,
        css: string
      }
    }
  ]
}
```

This data model will allow me to loop through each year, and then again through each post in the year.

Let's build the collection. First, we'll start by building out the collection int the `eleventy.config.js` file.

```javascript
eleventyConfig.addCollection("archives", (collections) => {

});
```

This tells 11ty we're adding a new custom collection called **archives**. The next thing we're going to want to do is pull in all the items. The collections API defined by the `collections` variable contains the ability for us to get all the items I want for the page. So let's get everything, and for good measure, let's sort them by date.

```javascript
eleventyConfig.addCollection("archives", (collections) => {
  const everything = collections.getAll().sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  });
});
```

So now I have all my blog posts, reading logs, week notes, notes, and book notes in the variable `everything`. The next step is to transform each object to the model I'm storing in the posts array for each year. For that I can take advantage of the `.map()` method in JavaScript.

```javascript
const getPostType = (tags) => {
  if (tags.includes('readinglog')) {
    return { name: 'Reading Log', css: 'reading-log' };
  }

  if (tags.includes('shortnotes')) {
    return { name: 'Note', css: 'note' };
  }

  if (tags.includes('weeknote')) {
    return { name: 'Week Note', css: 'week-note' };
  }

  if (tags.includes('booknotes')) {
    return { name: 'Book Note', css: 'book-note' };
  }

  return { name: 'Post', css: 'post' };
}

eleventyConfig.addCollection("archives", (collections) => {
  const everything = collections.getAll().sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  });
  
  const items = everything.map((e) => ({
    title: getPostType(e.data.tags).css === 'book-note'
      ? `${e.data.title}: ${e.data.subtitle}`
      : e.data.title,
    url: e.url,
    year: e.data.postYear,
    dateString: e.data.shortDateString,
    type: getPostType(e.data.tags),
  }));
});
```

I included the `getPostType()` function I built. It takes an array of post tags and returns the type of post and a CSS class to use based on the collection tag that is unique to each collection. I look for that specific tag and if it exists, I know what kind of post I'm looking at. I also use it to tweak the title for book notes as I keep the book's title and subtitle separate, but want both to be displayed.

The next step is to reverse the array and grab the unique years. By default, the collection will be returned starting with the oldest item. I want the newest item at the first item in the array. I use the `toReversed()` function in JavaScript.

```javascript
const sortedItems = items.toReversed();

const uniqueYears = [...new Set(items.map((i) => i.year))];
```

To get the unique years, I use the [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object in Javascript. Initializing a set with an array will return a list of objects where each value only returns once. I use the `map()` function to just pull the year out of the collection items as I don't need any of the other values.

The final piece is to build the final object and return it as the collection.

```javascript
const archivesArray = [];

for (const year of uniqueYears) {
  archivesArray.push({
    year,
    posts: sortedItems.filter((i) => i.year === year),
  });
}

return archivesArray;
```

I start with an empty array. I then go through each unique year and add the year with its posts. I use JavaScript's built in `filter()` function to grab only the posts where their year matches the year being added.

So now that I have the collection, let's build the actual page in 11ty. I'm using [nunjucks](https://mozilla.github.io/nunjucks/) for this page ([11ty documentation](https://www.11ty.dev/docs/languages/nunjucks/)).

Since there is going to be a lot of links on the page, I wanted to add a list of links at the top to allow the user to jump to the year.

For this, I'll use a for loop for each year in the archives collection. If you remember, the archives collection is an array of years and the posts in that year. For this loop, all i really care about is creating a list of links with the year.

I go through each year, and just make an in-page link with the ID being the year, i.e. `#2025`. 

```html
<section class="archives-years">
  <ul>
  {% for year in collections.archives %}
    <li><a href="#{{ year.year }}">{{ year.year }}</a></li>
  {% endfor %}
  </ul>
</section>
```

The next section on the page will be a search filter. More on this later.

The final piece of the page is to list out each year, and then each post.

Again, I start out with looping through the archives collection. This time, I want to start by creating an `h2` with its element ID being the same year so the in-page links bring the user to the correct section.

Once the `h2` is created, I'll build an unordered list for each post. Using [CSS flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), I'm able to neatly lay out the posts with their titles on one side and the date they were posted as well as the post type on the right. The CSS for this is at the bottom of this post.

```html
<section class="archives">
  {% for year in collections.archives %}
  <div class="archive-year">
    <h2 id="{{ year.year }}">{{ year.year }}</h2>

    <ul class="archives-list">
      {% for post in year.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div class="post-metadata">
          <span class="tag {{ post.type.css }}">{{ post.type.name }}</span>
          <span class="date">{{ post.dateString }}</span>
        </div>
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</section>
```

Now back to the filter.

```html
<section class="filter">
  <label for="filter">
    Filter
    <input type="text" name="filter" id="filter" />
  </label>
  <button type="button" id="clear-filters" class="btn-primary">Clear</button>
</section>
```

I wanted an easy way to filter down to the post someone is looking for. There are hundreds of links on this page, I want to make it a little easier to find what one might be looking for.

I'm not going to go crazy with this, I'm just going to allow the user to enter text into the box which will automatically filter the list down to posts with titles matching the text entered into the box. I want to do it in real time as the text is entered. words entered in.

To do this, I'll attach the `keyup` event on the filter textbox and then as text gets input, I'll add the `hidden` attribute for all `li` elements that don't have their text content (the post's title) match the text entered. It might not be the most in-depth search, but it should hopefully allow posts to be found faster than scrolling through.

For good measure, I added a clear button to allow the user to quickly clear the filter and return all the results again.

```javascript
addEventListener('DOMContentLoaded', () => {
  document.getElementById('filter').addEventListener('keyup', function (e) {
    filterItems(e.target.value);
  });

  document.getElementById('clear-filters').addEventListener('click', function () {
    document.getElementById('filter').value = '';
    clearFilters();
  });
});

function filterItems(val) {
  if (val.trim().length === 0) {
    clearFilters();
    return;
  }

  document.querySelectorAll('.archives-list li').forEach((x, idx) => {
    if (x.querySelector('a')?.textContent.toLowerCase().includes(val.toLowerCase())) {
      x.removeAttribute('hidden');
    } else {
      x.setAttribute('hidden', true);
    }
  });
}

function clearFilters() {
  document.querySelectorAll('.archives-list li').forEach((x) => {
    x.removeAttribute('hidden');
  });
}
```

This was a fun little project for me, I wanted something nicer for my archives, and while this might seem a little nuts, I like the way it turned out, and thought I'd share. I don't really have an ETA on when the new design will be finished, but hopefully sometime soon.

And now all the final pieces.

<div class="code-block-filename">archives.js</div>

```javascript
const getPostType = (tags) => {
  if (tags.includes('readinglog')) {
    return { name: 'Reading Log', css: 'reading-log' };
  }

  if (tags.includes('shortnotes')) {
    return { name: 'Note', css: 'note' };
  }

  if (tags.includes('weeknote')) {
    return { name: 'Week Note', css: 'week-note' };
  }

  if (tags.includes('booknotes')) {
    return { name: 'Book Note', css: 'book-note' };
  }

  return { name: 'Post', css: 'post' };
}

eleventyConfig.addCollection("archives", (collections) => {
  const everything = collections.getAll().sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  });

  const items = everything.map((e) => ({
    title: getPostType(e.data.tags).css === 'book-note'
      ? `${e.data.title}: ${e.data.subtitle}`
      : e.data.title,
    url: e.url,
    year: e.data.postYear,
    dateString: e.data.shortDateString,
    type: getPostType(e.data.tags),
  }));

  const sortedItems = items.toReversed();

  const uniqueYears = [...new Set(items.map((i) => i.year))];

  const archivesArray = [];

  for (const year of uniqueYears) {
    archivesArray.push({
      year,
      posts: sortedItems.filter((i) => i.year === year),
    });
  }

  return archivesArray;
});
```

<div class="code-block-filename">archives.njk</div>

```html
<section class="archives-years">
  <ul>
  {% for year in collections.archives %}
    <li><a href="#{{ year.year }}">{{ year.year }}</a></li>
  {% endfor %}
  </ul>
</section>

<section class="filter">
  <label for="filter">
    Filter
    <input type="text" name="filter" id="filter" />
  </label>
  <button type="button" id="clear-filters" class="btn-primary">Clear</button>
</section>

<section class="archives">
  {% for year in collections.archives %}
  <div class="archive-year">
    <h2 id="{{ year.year }}">{{ year.year }}</h2>

    <ul class="archives-list">
      {% for post in year.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div class="post-metadata">
          <span class="tag {{ post.type.css }}">{{ post.type.name }}</span>
          <span class="date">{{ post.dateString }}</span>
        </div>
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</section>

<script>
  addEventListener('DOMContentLoaded', () => {
    document.getElementById('filter').addEventListener('keyup', function (e) {
      filterItems(e.target.value);
    });

    document.getElementById('clear-filters').addEventListener('click', function () {
      document.getElementById('filter').value = '';
      clearFilters();
    });
  });

  function filterItems(val) {
    if (val.trim().length === 0) {
      clearFilters();
      return;
    }

    document.querySelectorAll('.archives-list li').forEach((x, idx) => {
      if (x.querySelector('a')?.textContent.toLowerCase().includes(val.toLowerCase())) {
        x.removeAttribute('hidden');
      } else {
        x.setAttribute('hidden', true);
      }
    });
  }

  function clearFilters() {
    document.querySelectorAll('.archives-list li').forEach((x) => {
      x.removeAttribute('hidden');
    });
  }
</script>
```

<div class="code-block-filename">main.css</div>

```css
section.archives-years {
  text-align: center;
}

section.archives-years ul {
  margin: 0;
  padding: 0;
  display: inline-flex;
  gap: 24px;
  flex-wrap: wrap;
}

section.archives-years ul li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

section.archives-years ul li::marker {
  content: '';
}

section.filter {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: stretch;
}

section.filter label {
  display: inline-block;
}

section.filter input {
  margin-left: 16px;
  padding: 8px 12px;
  width: 300px;
}

section.archives h2 {
  margin-top: 48px;
}

.archives-list {
  list-style-type: none;
}

.archives-list li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  padding: 4px 8px;
  margin: 0;
}

.archives-list li[hidden] {
  display: none;
}

.archives-list li:first-child {
  border-top: 1px solid var(--border-color);
}

.archives-list li .post-metadata {
  display: flex;
  gap: 12px;
  min-width: 195px;
  align-items: center;
  justify-content: flex-end;
}

.archives-list li .post-metadata span.tag {
  padding: 2px 8px;
  border-radius: 2px;
  align-self: center;
  font-size: 0.75rem;
}

.archives-list li .post-metadata span.tag.post {
  background-color: oklch(0.4147 0.0937 241.41);
  color: oklch(100% 0 0);
}

.archives-list li .post-metadata span.tag.reading-log {
  background-color: oklch(0.5235 0.1283 46.59);
  color: oklch(100% 0 0);
}

.archives-list li .post-metadata span.tag.note {
  background-color: oklch(0.4941 0.0863 171.53);
  color: oklch(100% 0 0);
}

.archives-list li .post-metadata span.tag.book-note {
  background-color: oklch(0.4294 0.1603 321.88);
  color: oklch(100% 0 0);
}

.archives-list li .post-metadata span.tag.week-note {
  background-color: oklch(0.4169 0.1381 354.71);
  color: oklch(100% 0 0);
}

.archives-list li .post-metadata span.date {
  min-width: 75px;
  text-align: right;
}

.archive-year:has(li[hidden]) {
  display: none;
}

.archive-year:has(li:not([hidden])) {
  display: inherit;
}

@media (max-width: 500px) {
  section.filter {
    gap: 16px;
  }

  section.filter input {
    display: block;
    margin: 8px 0 0 0;
    padding: 9px 12px;
  }

  section.filter button {
    align-self: flex-end;
  }
  
  .archives-list li {
    padding: 8px;
  }

  .archives-list li .post-metadata {
    flex-direction: column;
    min-width: 100px;
    gap: 4px;
    align-items: flex-end;
  }

  .archives-list li .post-metadata span.tag {
    align-self: flex-end;
  }
}
```
{% endraw %}