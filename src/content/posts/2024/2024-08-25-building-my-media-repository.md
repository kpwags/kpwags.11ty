---
title: "Building My Media Repository"
date: '2024-08-25T15:45:50.604Z'
permalink: /posts/2024/08/25/building-my-media-repository/index.html
description: "I built a new side project for myself to handle supporting the media I consume and the data I use to populate this site."
tags:
  - Wags Media Repository
  - C#
  - .NET
  - Side Projects
  - Entity Framework
  - Blazor
---

Over the course of the last several months, I’ve been building a new web app to store content for my site rather than Notion. I’ve been wanting to own my data and this allows me to keep control of my gain better control. I’ve mentioned this before, but figured I’d go through some of the technical details behind it so far.
<!-- excerpt -->

## Technology Choices

### Blazor

I’ve been using Blazor a lot at my job and have been using it for side projects so it made sense to stick with it for this. So far, it’s been easy for me to pick up and build out. Granted part of this is my familiarity with .NET, but the other part is how familiar this is with my React background.

I originally started to build it with just the standard controls that were built into Blazor and .NET. Part way through, I’ve started integrating the [Radzen](https://blazor.radzen.com/) component library for some of the controls due to ease and better usability. I might very well tie more of that into the app, but for the moment, I am limiting what I use Radzen for as I want to get this out, up and running before I see what all it can do for me. for me to pick up and build out.

### Entity Framework

Microsoft built Entity Framework to be a full-fledged ORM for databases for .NET. For simple applications like my media repository, it’s the perfect tool. I was able to define the database in code and deploy it to the Sqlite file from the console.

There’s been debate about Entity Framework performance on larger, more complex projects, but for my needs, it’s a fantastic tool.

### Sqlite

When I first started laying things out, I was going back and forth as to whether I wanted to use a database like MySQL, Microsoft SQL, or PostgreSQL, or something more simple like Sqlite.

I ultimately chose Sqlite because I felt like it would be the easiest to keep backed up. The downside of owning your data is that you have to maintain it and back it up. (Note that that can be a mixed blessing as well because you know that it is actually being backed up. I assume Notion has data recovery setup, but I can’t say with 100% certainty it does.)

I also figured my database structure was simple and the use case simple enough that a full fledged DB would be overkill. Sqlite seemed a good choice and so far, I’m happy with my decision.

## Importing Data

The one challenge I’m going to have to handle is importing the data from Notion into my new repository. I can export the data easily enough, but then I’d have to import it as well as handle the different foreign key constraints. Doable, but could be tricky.

Instead, I added a console application to take advantage of the code I wrote for the web app as well as the code I’ve already written to integrate Notion’s API for my reading logs. I was able to take the code that pulls from my Notion Link Database and adapted it to pull from my media databases as well.

I’ll also fully admit that the import tool feels kind of janky. It’s definitely not production ready code, but it does the job I need it to do.

## Exporting Data to 11ty

The final part of this is to make sure that I can generate the JSON files 11ty needs to generate the content. For this I added an API controller to the Blazor project and built a console app that fires off a few HTTP requests to grab the data and then save it to disk in a JSON file.

## Issues with Deployment

Originally I was going to build a Docker image for this and have it run on my Synology NAS. I unfortunately didn’t realize that my NAS doesn’t support Docker, officially anyway. I did find some instructions on how to install it anyway, but I’m hesitant. Instead, I have it hosted on my desktop. The only downside with that is that I dual boot my desktop for gaming. When I’m in Windows for games, my media repository would be unavailable as it’s on my LinuxMint partition. The good news is that I’m on Linux far more than Windows, but it is something I’m concerned with.