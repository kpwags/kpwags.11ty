---
title: 'My Blogging Workflow'
date: '2023-09-25'
permalink: /posts/2023/09/25/my-blogging-workflow/index.html
tags:
  - Blogging
  - Writing
---

Since my plan to start writing more will undoubtedly cause more posts on my blog, I figured I'd write down my general workflow on how I go about writing some of my more in-depth blog posts. It might sound familiar, but thought it might help someone who might be starting out.
<!-- excerpt -->

## Generating a List of Ideas

I've been using [Obsidian](https://obsidian.md/) tied to a shared folder on iCloud for my notes and journaling. In there I have a note with a list of ideas for blog posts. Some of them are fleshed out some, others are just off-hand thoughts I've had. Whenever I think something might be worth writing about, I add it.

## Creating an Outline of Sorts

Over time, as it grows more legs, I create a second note for it with various bullet points I want to include in the post. Sometimes that even means creating an outline for the post.

## Time for the First Draft

Once I have an outline in place, I go and actually start writing the post. Sometimes I'll write the entire thing in one go. Other times, I'll edit as I write. But either way, I try to get the guts of what I'm trying to write out so I can easily go back out and edit it.

Any images I might add get thrown into a subfolder and then added to the post. I generally at this point don't worry about compression or file size, I handle that later.

## Editing Time

At this point, the post is written and I try to go back through and re-read it to see where I might have missed some words, or rambled on too much. I'm not the greatest writer, so it's worth the time.
## Image Compression and Creating the Post

My site runs off [Next.js](https://nextjs.org/) and all of my blog posts are mdx files. The first thing I do is create a new branch off my main branch on my site's repository. I then create the mdx file in the blog directory. I add the front matter indicating tags, post date, title, etc. and then paste in the markdown from Obsidian. If the post has any images, I use [Squoosh](https://squoosh.app/) to resize and compress it so that people viewing don't have to deal with massive downloads. I put them in the images directory in my site's folder and add them to the mdx file. I have a handy image component that takes advantage of Next.js' image component to help optimize the image even further.

## Running My Site & Final Edits

My next step is to start up my site locally and view the new post. I go through and make sure that everything looks right, and then I go through and re-read it again to make sure it all makes sense. Sometimes I notice things when I see it live on the web browser that I miss in my notes editor. I make any final edits, also trying to mirror the edits in the notes editor as well, just because.

## Creating the Social Image

I then use my [social image generator](https://kpwags.com/posts/2022/11/03/building-a-social-image-generator-console-app) to generate the image for the post. Helpfully, it puts the image exactly where it needs to be in the file system, so there's nothing more I need to do.

## Creating a Pull Request

The next step of the process is to commit the code and push the new branch to GitHub. Once there, I open a pull request and Netlify's integration will automatically build my site and make sure that everything is up to snuff and it builds correctly. Once that is complete, I can then complete the pull request, and Netlify will deploy it.

## It's Live!

Once the PR is completed on GitHub, the site will deploy. In a couple minutes I can refresh my site and viola...the post is there!

---

That's basically it. It's not a complicated process, I want to keep the friction at a minimum to make it easier to post. The harder it is to get a post up, the less likely I'm going to go about doing it. It'd be kind of nice if I could more easily write a post without the whole PR process, but I find having each post be a file makes it easy to store in a git repository to backup and save. I've lost many older (much older) blog posts because they used to be stored in a database that has since been lost to time. My own fault for not backing them up, but still.

There are also plenty of posts I just write on a whim and might forego some of the early steps if I'm just feeling like sending something out there.

Maybe this is more than some want to deal with, but either way, just write. You'll find your own process and how to best handle your way of doing things.
