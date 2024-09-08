---
title: "Week Notes for September 1 - 7"
date: '2024-09-08T18:29:56.49Z'
permalink: /posts/2024/09/08/week-notes/index.html
description: "My week notes for the week of September 1 through September 7."
tags:
  - Week Notes
  - Running
  - Fitness
  - Wags Media Repository
  - C#
  - Node.js
  - Hockey
  - Weather
---

My week notes for the week of September 1 through September 7.
<!-- excerpt -->

## Continued Work on Media Repository Rewrite

I spent a fair amount of time working on my media repository rewrite. I was making good progress but stumbled when starting to work with nested queries. I found my way around it, but it makes me miss C#’s way of handling it.

```csharp
var getGenres = _repository.getGenres();
var getServices = _repository.getServices();

await Task.WhenAll(getGenres, getServices);

var genres = getGenres.Result;
var services = getServices.Result;

// the rest of the processing...
```

Instead, I have to work through callbacks in Node.js with the sqlite3 library.

```js
repository.GetGenres((error, genres) => {
	if (error) {
		console.error(error);
		return;
	}

	repository.GetServices((error2, services) => {
		if (error2) {
			console.error(error2);
			return;
		}

		// the rest of the processing...
	});
});
```

I really only have to deal with at most 4 levels deep but I wish there was a better way. If I’m missing something, please reach out.

Either way, I’m making good progress and I’ve already tested it on my NAS. I ran into a few hiccups, but nothing that looks like a deal breaker.

## Running

The weather has been nice so I’ve been taking advantage of it and getting out, often over lunch for some runs. It’s nice to get some fitness in while breaking up the work day. I find that my mood for the afternoon often tends to be much better when I can get a workout in. I’ve run around 90 miles over the last month and while my legs are feeling it, it feels good. I really should get back to lifting some though.

## Back on the Ice...Kind of

This past week I’ve taken part in some hockey practices and scrimmages. I rented an hour of ice on Wednesday for my team to get some practice and drills in. One of my teammates coaches his kids’ teams and another is familiar with coaching so I asked them to come up with some drills to help out and it was fun and hopefully will help this upcoming season.

Friday I was asked to play in net for a scrimmage between 2 teams in the division I play on and was able to get more practice in with my new leg pads as well as try out my new pants. The leg pads as it turns out, slide much better on the ice which will take more getting used to. I didn’t see it at the practice 2 weeks ago, but I definitely felt it Friday night.

## Gorgeous Weather

This past week has had some gorgeous weather and along with the runs, I’ve taken advantage of it by sitting out on the porch in the evenings and afternoons. It’s nice to get some fresh air.