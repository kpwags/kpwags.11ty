---
title: 'Integrating Notion into my Site'
date: '2023-09-08T13:00:00.000Z'
permalink: /posts/2023/09/08/integrating-notion-into-my-site/index.html
tags:
  - Notion
  - Development
  - Node.js
  - TypeScript
  - JavaScript
---

Over the course of the last few weeks I’ve been revising how several of my pages get their data. Instead of having to manually edit a JSON file that’s in my code base, I’ve been pulling from Notion’s API. The benefit of this is that it’ll be easier to update the pages. I figure I’ll show how I did it in hopes of helping others.
<!-- excerpt -->

Since it's a relatively simple page, let's work with my movies page. To sum it up, it's a page that list the movies I've watched sorted by date watched descending, grouped by year.

{% image "./images/movie_page_screenshot.jpg", "A screenshot of my movies page showing a list of the most recent movies I've watched" %}

Each movie has seven properties that I care about for the page.

1. Title
2. Status (To Watch, Awaiting Review, & Watched)
3. Date Watched
4. Cover URL
5. IMDb Link
6. Rating (Numeric 1-5)
7. Thoughts

Fortunately for me, Notion has an [npm package](https://www.npmjs.com/package/@notionhq/client) to make it easy.

```bash
npm i @notionhq/client
or
yarn add @notionhq/client
```

This provides a nice library to make the calls easy. The issue I did find though was that it doesn't give me types for the various properties I can work through.

## Building the Types

To make my job a little easier, I got some calls working and looked at the JSON returned from Notion's API and built some types. Now these types are not complete. They do have more properties attached to them. I just defined the minimum I needed for my purpose. If and when you make your calls, it would be useful to add the additional properties as you see fit.

```typescript NotionShared.ts
export interface NotionTitle {
	id: string;
	title: { plain_text: string; }[];
}

export interface NotionLink {
	id: string;
	url: string | null;
}

export interface NotionDate {
	id: string;
	date: { start: string | null } | null;
}

export interface NotionNumber {
	id: string;
	number: number | null;
}

export interface NotionPlainText {
	id: string;
	rich_text: { plain_text: string | null }[];
}
```

These types are used for me defining the response that I expect back from Notion.

```typescript NotionMovie.ts
import {
    NotionLink,
    NotionPlainText,
    NotionTitle,
    NotionNumber,
    NotionDate,
} from './NotionShared';

export interface NotionMovie {
    id: string;
    properties: {
        Name: NotionTitle;
        CoverUrl: NotionLink;
        Thoughts: NotionPlainText;
        ImdbLink: NotionLink;
        Rating: NotionNumber;
        DateWatched: NotionDate;
    };
}

export interface NotionMovieApiResponse {
    nextCursor: string | null;
    results: NotionMovie[];
}
```

As you can see, I define a movie being returned by Notion to have an ID, and then a set of properties each having one of the shared types I created in the `NotionShared.ts` file.

I also created the type `NotionMovieApiResponse` which defines the actual response I get back from the Notion API call. It contains two properties. The cursor (`nextCursor`) that I would need to pass in if there are more records so Notion knows where to start the return for pagination. The other property is an array of the actual movie object.

## Querying the Notion API

Now for the fun part, making the call to Notion and returning the data I need for the page.

I have a file called `notion.ts` that contains all my calls to Notion. In there I have an import to bring in the `Client` object from the `@notionhq/client` package.

I created a function called `fetchMoviesFromNotion` that takes the cursor as an optional parameter. Remember above when I talked about the `nextCursor` property that I need to pass in to handle pagination or multiple calls? That's what this is.

The return for this function is a `NotionMovieApiResponse` object.

```typescript notion.ts
import { Client } from '@notionhq/client';

const fetchMoviesFromNotion = async (cursor?: string): Promise<NotionMovieApiResponse> => {

	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});

	const response = await notion.databases.query({
		database_id: process.env.MOVIE_DB_ID,
		start_cursor: cursor,
		filter: {
			property: 'Status',
			select: {
				equals: 'Watched',
			},
		},
		sorts: [
			{ property: 'DateWatched', direction: 'descending' },
		],
	});

	let nextCursor: string | null = null;

    if (response.has_more) {
        nextCursor = response.next_cursor;
    }

    const movies = response.results as unknown as NotionMovie[];

    return {
        nextCursor,
        results: movies,
    };
};
```

Taking a look at this, you can see that the first thing I do is create the Notion client by passing in my Notion API key.

The next step is for me to create the query.

Now just to provide some clarity, I have a property on each movie called "Status" that I don't bother with on my site. I have 4 statuses for movies.

- To Watch
- Awaiting Review
- Watched
- Couldn't Finish

Whenever I come upon a movie I want to watch, I add it to my Notion database with the status "To Watch". If I start the movie and really just don't like it, to the point of being unable to finish it, I throw it into the "Couldn't Finish" status to let me know that I didn't like it. "Awaiting Review" is where the movie sits after I watch it and stew a bit as to what my thoughts were. "Watched" is when I've put in my rating and thoughts. These are the movies that I want returned to the site.

To query a Notion database, I call the `notion.databases.query()` function. This takes at minimum a database ID.

In my use case, I also pass in the cursor as the `start_cursor`. If it's not provided, Notion will start from the beginning.

The next argument is `filter`. This can either be an array of filters, or a single filter. In my use case, it's a single filter. I tell it the property I want to filter on, in this case, the "Status" property. The next argument within the filter, `select`, I tell it I want all database rows where the status equals "Watched".

The final argument is `sorts`. Rather than sorting manually after bringing everything back, I let Notion do that for me. This is an array so you can sort by multiple properties if you choose. For me, I just want to sort it by the `DateWatched` property in a descending order so the most recent are at the start of the results.

The results from Notion's call are then assigned to the `response` variable. For me to handle the function's return.

```typescript Notion.ts
let nextCursor: string | null = null;

if (response.has_more) {
	nextCursor = response.next_cursor;
}

const movies = response.results as unknown as NotionMovie[];

return {
	nextCursor,
	results: movies,
};
```

The first thing I do is default the `nextCursor` to `null`. I then check to see if Notion is telling me there are more rows left in my query. If there are, I assign the cursor from the response; if not, I leave it as `null`.

The next line I'm not super proud of. Basically to make TypeScript happy, I assign the results from Notion as type `unknown` and then immediately assign them the type `NotionMovie[]`. There might be better ways, but this works well enough.

I then send the data back for processing.

## Putting it All Together

The main function that handles bringing back the movies is called `getMovies()`. It returns a list of movies defined as:

```typescript Movie.ts
interface Movie {
    id: string;
    title: string;
    cover: string;
    link: string;
    dateWatched: string;
    rating: number;
    thoughts: string | null;
    yearWatched: number;
}
```

```typescript Notion.ts
export const getMovies = async (): Promise<Movie[]> => {
    const movies: Movie[] = [];

    let nextCursor;

    do {
        const response = await fetchMoviesFromNotion(nextCursor) as NotionMovieApiResponse;

        nextCursor = response.nextCursor;

        response.results.forEach((m) => {
            movies.push(mapResultToMovie(m));
        });
    } while (nextCursor);

    return movies;
};
```

The first thing I do in the function is declare the movie array that I will be returning to the page. Throughout the function I'll be adding records to it. I also declare the next cursor, but leave it undefined.

I use a `do-while` loop to retrieve all the records from Notion. I always will be making at least one call to Notion so I want to make sure it always makes that call. Subsequent calls will be determined by whether the cursor returned is either null or if it contains a value.

I have every call to Notion's API re-assign the cursor returned from Notion assigned to the `nextCursor` variable and then go through the results, parsing the results to a movie object, and then added to the array.

This is the `mapResultToMovie()` function to help keep the `getMovies()` code a little cleaner:

```typescript Notion.ts
const mapResultToMovie = (result: NotionMovie): Movie => ({
    id: result.id,
    title: result.properties.Name.title[0].plain_text,
    cover: result.properties.CoverUrl.url,
    rating: result.properties.Rating.number,
    thoughts: result.properties.Thoughts.rich_text[0]?.plain_text ?? null,
    link: result.properties.ImdbLink.url,
    dateWatched: result.properties.DateWatched.date ? dayjs(result.properties.DateWatched.date.start).format('MMMM D, YYYY') : null,
    yearWatched: result.properties.DateWatched.date ? dayjs(result.properties.DateWatched.date.start).year() : null,
});
```

This function maps the values returned from Notion to the object I defined to hold the movies. If you look up at the Notion types I defined above, you can see how the various different properties' values are found. For the `dateWatched` and `yearWatched` properties, I use the handy [dayjs](https://day.js.org/) library to format the date and get the year.

From there, I return the movies array to the page and display the movies grouped by year.

---

You can view the source to my site on it's [GitHub Page](https://github.com/kpwags/kpwags.com)