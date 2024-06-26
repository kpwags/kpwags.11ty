---
title: 'Updating My Likes Page with Feedbin'
date: '2022-07-31'
permalink: /posts/2022/07/31/updating-my-likes-page-with-feedbin/index.html
tags:
  - Development
  - TypeScript
  - Next.js
  - RSS
---

I've been tweaking my site here and there and the one thing I recently did was change how I populate my '[likes](/likes)' page. Previously I had been doing it manually, but recently after having listened to the founder of [Feedbin](https://feedbin.com) on the [Changelog Podcast](https://changelog.com/podcast/499), I decided to try something different. I wanted to use a nice feature Feedbin has to make the page better.
<!-- excerpt -->

I'm a subscriber to [Feedbin](https://feedbin.com) and the one feature it provides is the ability to view the items you've starred as a feed in and of itself. That means that for any article on any of my feeds, when I star it, it gets added to its own RSS feed that is public. I decided that I was going to use that to populate my [likes page](/likes).

The first thing I needed to do was to create a TypeScript model for it.

```typescript
interface FeedbinItem {
    title: string
    link: string
    domain: string
}
```

It's a pretty simple model, I want the title, the URL, and the domain.

The next thing I needed to do was to find a good way to parse the XML returned from Feedbin. Since I'm using Node, the DOM Parser the browser uses is a no go as the Node backend doesn't support it. Fortunately I found [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) which does a fantastic job of converting an XML string into a JSON object that would allow me to easily go through the data returned.

```typescript
import { FeedbinItem } from '@models/FeedbinItem';
import { XMLParser } from 'fast-xml-parser';

export const getFeedbinItems = async (): Promise<FeedbinItem[]> => {
    const items: FeedbinItem[] = [];

    const res = await fetch('https://feedbin.com/starred/starred-items.xml');

    if (!res.ok) {
        // handle error logic
        return [];
    }

    const response = await res.text();

    const parser = new XMLParser();
    const data = parser.parse(response);

    data.rss.channel.item.forEach((i: any) => {
        const domain = (new URL(i.link));

        items.push({
            title: i.title,
            link: i.link,
            domain: domain.hostname,
        });
    });

    return items;
};
```

The first thing I do in the code is to declare the array of items to return. I then make a fetch call to Feedbin to retrieve my starred items.

```typescript
const res = await fetch('https://feedbin.com/starred/starred-items.xml');
```

Assuming the call was successful, I create the parser and have it parse the XML into a JSON object.

```typescript
const parser = new XMLParser();
const data = parser.parse(response);
```

After that, it's simply parsing the returned items and adding them to the items array.

```typescript
data.rss.channel.item.forEach((i: any) => {
    const domain = (new URL(i.link));

    items.push({
        title: i.title,
        link: i.link,
        domain: domain.hostname,
    });
});
```

The only slight complication is me getting the domain or hostname from the article's link to add that to the model. For that, I simply create a new `URL` object and pass the link in and then grab the hostname.

The next step was to pull the data into the page in Next.js. Originally I was just using a `.ts` file with an array of my likes. Since it was static data, I just used Next.js' `getStaticProps` to get the data from the `.ts` file and load it into the component. Since I need this to now be dynamic, I switched to the `getServerSideProps` so that the call is made on the server, rendered on the server, and sent down to the client after.

I wrapped the fetch code above into its own file to make the `likes.tsx` component a little cleaner.

```typescript
import { getFeedbinItems } from '@lib/feedbin';
import { FeedbinItem } from '@models/FeedbinItem';

export const getServerSideProps: GetStaticProps = async () => {
    const data = await getFeedbinItems();

    return {
        props: {
            // only return most recent 25
            likedItems: data.slice(0, 25),
        },
    };
};

type LikeProps = {
    likedItems: FeedbinItem[];
};

const Likes = ({ likedItems }: LikeProps): JSX.Element => {
    // the render code
}
```

It's pretty simple. When the page is to be rendered, it loads the starred items from my custom RSS feed, and passes the items into the React component.

So there you have it. It's a pretty simple thing to setup, and it provides me a way to keep my likes page a little more up-to-date without having to manually add items. Of course it means that the items I star have to be part of an RSS feed, but that's why everyone should have a blog of their own WITH an RSS feed.

*Edited 8/3/2022 - Typo/Grammar Edit*