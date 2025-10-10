---
title: "An Addendum to Building My New Archives Page"
date: '2025-10-01T18:17:18.084Z'
permalink: /posts/2025/10/01/an-addendum-to-building-my-new-archives-page/index.html
description: "After I posted about building my new archives page, I realized I could simplify the code using 11ty's built-in collections functionality."
tags:
  - Personal Site
  - 11ty
---
Last week I posted about [how I built my new archives page](/posts/2025/09/25/building-my-new-archives-page/). After releasing the post and getting back to my redesign, I realized that I overcomplicated one bit of code and figured I'd add an addendum to the post showing the simplification.
<!-- excerpt -->

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
```

I had built this code to help me identify the post type. It's not awful code (at least I don't think it is), but 11ty can help me out here so much easier.

With 11ty, I could use the `.11tydata.js` file for each of my collections to simplify the process. Remember how I added `postYear` to the `eleventyComputed` object? Well, if I was thinking, I would have realized I could have added the data returned in the above function as well.

```javascript
export default {
  layout: 'layouts/notes.html',
  tags: 'shortnotes',
  eleventyComputed: {
    dateString: ({ page }) => dayjs.utc(page.date).format('MMMM D, YYYY'),
    shortDateString: ({ page }) => dayjs.utc(page.date).format('MMM D'),
    postYear: ({ page }) => dayjs.utc(page.date).format('YYYY'),
    postType: { name: 'Note', css: 'note' },
  }
};
```

So now, instead of calling the `getPostType()` function, I can simply access the data from the post itself:

```javascript
const items = everything.map((e) => ({
  title: e.data.postType.css === 'book-note'
    ? `${e.data.title}: ${e.data.subtitle}`
    : e.data.title,
  url: e.url,
  year: e.data.postYear,
  month: e.data.postMonth,
  dateString: e.data.shortDateString,
  type: e.data.postType,
}));
```

It's not a huge change, but it simplifies the code just a bit.