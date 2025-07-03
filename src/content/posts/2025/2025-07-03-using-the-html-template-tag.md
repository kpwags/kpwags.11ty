---
title: "Using the HTML Template Tag"
date: '2025-07-03T11:46:14.884Z'
permalink: /posts/2025/07/03/using-the-html-template-tag/index.html
description: "I recently learned about the HTML <template> tag and thought I'd share a quick demo."
tags:
  - HTML
  - Web Development
---
Recently I finally learned about the [`<template />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) element in HTML. I'm not sure how long it's been there, but it came at the right time for me and I figured I'd share a quick demo about how I've been using it in the hopes that maybe it'll help you or someone else.
<!-- excerpt -->

I've been using a little homemade app I've called "Wags Media Repository" to keep track of my media backlog and to help build the media pages on my site. The web portion is built with HTML, CSS & Vanilla JavaScript. Outside my use of the [dayjs](https://day.js.org/) library for dates, I don't use any frameworks or 3rd party libraries. I recently started on a repository for my fitness data.

Part of what that means is that I don't have React or Vue or Blazor components I would've reached to in other projects. Almost all of the content in my media and fitness repositories is displayed in tables. That means that when I load the data, I am going through each record and building a table row and inserting it into the table using JavaScript. This can get rather verbose in the code.

Here's an example for my podcasts page.

```javascript
function loadRowsIntoTable() {
  const fragment = document.createDocumentFragment();

  podcasts.forEach((podcast) => {
    const tr = document.createElement('tr');
    tr.classList.add('data-row');

    const nameCell = document.createElement('td');

    const linkAnchor = createLinkElement(podcast.name, podcast.link, true);
    nameCell.appendChild(linkAnchor);

    tr.appendChild(nameCell);

    const categoryCell = document.createElement('td');
    categoryCell.classList.add('center-align');

    const categoryTag = document.createElement('div');
    categoryTag.classList.add('tag');
    categoryTag.setAttribute('style', `background: ${podcast.category.colorCode};`);
    categoryTag.textContent = podcast.category.name;

    categoryCell.appendChild(categoryTag);

    tr.appendChild(categoryCell);

    const actionsCell = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn-link');
    editButton.addEventListener('click', function () {
      editPodcast(podcast);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn-link');
    deleteButton.addEventListener('click', function () {
      openDeleteConfirmation(podcast);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    tr.appendChild(actionsCell);

    fragment.appendChild(tr);
  });

  document.querySelector('tr.loading')?.classList.add('hidden');

  document.getElementById('podcast-table-body').appendChild(fragment);
}
```

I'm creating a `<tr />`, then adding the content for each `<td />`, including any buttons and links. Adding that to a fragment, and then finally inserting that into the table once all the rows are parsed. Not ideal, but it gets the job done and I can avoid the overhead of frameworks like React.

Stumbling upon the `<template />` element has been a game changer as I move forward on the fitness repository. While I haven't yet gone back into my media repository to adapt the new method, let's do it for the podcast table right now.

First, we'll need to add some code to the html page

```html
<table>
  <thead>
    <tr>
      <th scope="column" class="title-col">Name</th>
      <th scope="column" class="category-col">Category</th>
      <th scope="column" class="actions-col">Actions</th>
    </tr>
  </thead>
  <tbody id="podcast-table-body">
    <tr class="loading">
      <td colspan="3"><loading-spinner></loading-spinner></td>
    </tr>
    <tr class="no-content hidden">
      <td colspan="3">No Podcasts</td>
    </tr>
  </tbody>
</table>

<!-- additional code -->

<template id="podcast-row">
  <tr>
    <td class="name-col">
      <a href="" target="_blank" rel="noreferrer nofollow"></a>
    </td>
    <td class="category-col center-align">
      <div class="tag"></div>
    </td>
    <td class="actions-col">
      <button class="btn-link btn-edit">Edit</button>
      <button class="btn-link btn-delete">Delete</button>
    </td>
  </tr>
</template>
```

The `<template />` element and its children will sit in the code, but will not be rendered by the browser. You can view it if you view the source or navigate in the dev tools, but as far as the user is concerned, it doesn't exist. What it does do though is provide me with a template for adding rows to the table.

Going back to the JavaScript code, we can make some pretty big changes.

```javascript
function loadRowsIntoTable() {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('template#podcast-row');
  
  podcasts.forEach((podcast) => {
    const tr = template.content.cloneNode(true);

    tr.querySelector('.name-col a').textContent = podcast.name;
    tr.querySelector('.name-col a').setAttribute('href', podcast.link);
    tr.querySelector('.category-col .tag').textContent = podcast.category.name;
    tr.querySelector('.category-col .tag').setAttribute('style', `background: ${podcast.category.colorCode};`);
    
    tr.querySelector('.btn-edit').addEventListener('click', function () {
      editPodcast(podcast);
    });
  
    tr.querySelector('.btn-delete').addEventListener('click', function () {
      openDeleteConfirmation(podcast);
    });

    fragment.appendChild(tr);
  });

  document.querySelector('tr.loading')?.classList.add('hidden');

  document.getElementById('podcast-table-body').appendChild(fragment);
}
```

There is now much less code, and it still feels readable. Let's take a deeper dive into what it's doing.

The first thing that's different is that I'm pulling the template from the HTML in the JavaScript into a variable aptly named `template`.

```javascript
const template = document.querySelector('template#podcast-row');
```

This gets the DOM element and stores it for use.

Moving into the loop, I create the table row by cloning the template using the following code:

```javascript
const tr = template.content.cloneNode(true);
```

I can then apply the content and attribute adjustments to the cloned node rather than building everything out from scratch. By running the `querySelector()` call off the `tr` object, I'm telling the JavaScript to look for the CSS selector within the `tr` node, and ignore the rest. It's no different than if I were just grabbing another node off the DOM.

In this case, instead of going through and creating each `<tr />`, `<td />`, `<a />`, etc., I've pre-built them in the HTML template. All I need to do is apply the content, attributes, and event listeners.

I'm not sure how long this has been available, but it seems like it's been around for a while now. If nothing else, it shows how much stuff there always is to learn about web development, and that the native platform can do *so* much all on its own without the need for external libraries.