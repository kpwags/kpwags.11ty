---
title: "How I Work On My Side Projects"
subtitle: ""
description: "When I build my side projects, I will generally handle them the same way I would at work in my professional career. It might seem like overkill, but I find that it's been working for me pretty well."
date: '2026-08-25T19:46:00.000Z'
permalink: /posts/2026/how-i-work-on-my-side-projects/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - Development
  - Side Projects
  - Code
  - Organization
---
When I build my side projects, I will generally handle them the same way I would at work in my professional career. It might seem like overkill, but I find that it's been working for me pretty well.
<!-- excerpt -->

## Issue Types

Every project for me gets 4 basic labels in GitHub or Codeberg.

- **Features:** These issues involve brand new functionality or an enhancement on existing functionality. It's probably pretty self-explanatory, but take my blog as an example. If I wanted to add a button that would take the user to a random post, that'd be a feature as it's new. If I wanted to add a codepen like web component to my posts pages, that'd too be a feature despite it being on an existing page as it's new code.
- **Bugs:** These are the issues that often make me sigh as it often means I screwed up somehow. These are the bugs, the problems in the code that cause something to not work right. An example would be [this issue](https://github.com/kpwags/kpwags.11ty/issues/709). I noticed the other day that most of my week notes weren't properly appearing in my [archives](/archives/) page. I checked again today and all of a sudden it's working as expected. It might be a little more of a nefarious bug, but there could still be something wrong.
- **Spikes**: Spikes are term I first came upon in my current job. They're essentially research tickets or issues. For my side projects, I use them to see if something is possible or doable. An example is [this issue](https://github.com/kpwags/kpwags.11ty/issues/684) for me to see how feasible it would be for me to autogenerate a social graph image for when the post is shared on Bluesky, Mastodon, or other social media. I now just have a single image that shows for every link. I used to manually generate them through a console application, but have since stopped. I created the spike to see how I'd go about building an automatic tool. I know there are ways to do it, I'm just not sure if they're worth any possible costs to do so. The issue gives me a task to "bill" my time to and remind myself to look into it.
- **Dependencies:** These issues I create for when I want to upgrade 3rd party libraries either to just have a more up-to-date version, or if there is a security vulnerability I need to address. I've been trying to limit the external dependencies on my projects, but I haven't removed them.

Now I have more labels on most projects than just these four, but in general, almost every issue I create falls into one or more of these labels. The dependency one can get grouped with any of the other three. For organization, they work pretty well in conjunction with labels that might be a little more project-specific.

## Planning

For my side projects, I'd like to say I go through and plan everything out. Every feature, every page, every everything. In reality this is not the case. More often than not, the issues get created in batches as all too often I'm in a rush to get started. But I do try to spend some time to at least get a lot of the tickets created, even if they don't have all the details written in. It gives me a placeholder to help remind myself what needs to be worked on.

I work with a Kanban board with columns for "Todo", "In Progress" and "Done". I'll often also create a column just to put the pull requests into. I try to keep the issues organized in the todo column with the one I should work on next on top, and only a single in progress issue to keep myself focused. Occasionally I might have multiple issues in the in progress column if it just makes more sense to work on related issues at once rather than separately. The done column is organized with the most recent issue completed on top.

## Doing the Work

For most of my side projects I work off the `main` branch in git. For projects like my personal site with it's redesign, I've created a branch called `v3` which I'm using to merge all the updates into, with the understanding that I will eventually merge `v3` into `main`. Fortunately, I'm really only adding content to my site at the moment, so the merge later shouldn't be horrendous.

For each issue, I create a feature branch off `main` and do the work there. I often name them with the issue number in the branch name like `feature/657-redesign-header`. While I do delete the branches after merging on GitHub, I do tend to keep them around longer locally. The number allows me to easily tie it back to the issue it was for. Adding the slash (`/`) helps as it allows my git client to collapse the branches for each slash. From a UX perspective, that comes in handy.

I'd like to say my commit messages are useful, and they can sometimes be, but some of them aren't always great as I'm sometimes switching between my laptop and desktop mid-feature and use the branch to sync code back and forth. My pull request titles tend to be a bit better. Once I determine the feature to be complete, I create a pull request from that branch into `main` and merge the code. I have in the past even tied in GitHub Actions to run unit tests during the pull request process to make sure I didn't break anything with my code.

## Treating It Professionally

My side projects might just be me having fun and experimenting with what I'm able to build, but I try to treat them like I would a professional project. The issues in GitHub might not be as written as one you'd find at work with all the details necessary to fully test against any acceptance criteria, but I've been trying to make sure that I try to keep things organized and track the work I do put in.

If you do work on side projects, do you track your work as if it were a professional project for a fortune 500 company? Do you just wing it? Let me know.