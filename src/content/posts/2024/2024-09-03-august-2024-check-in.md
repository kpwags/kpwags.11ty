---
title: "August 2024 Check-In"
date: '2024-09-03T23:35:13.592Z'
permalink: /posts/2024/09/03/august-2024-check-in/index.html
description: "A look back at August 2024."
tags:
  - Monthly Check-In
  - Hockey
  - Site Updates
  - Wags Media Repository
  - Node.js
  - Blazor
  - React
  - Side Projects
  - Running
  - Fitness
  - House
---

August came and went pretty quickly. I ran a lot, finished redesigning my site, did some house work, and felt like I had a productive month.
<!-- excerpt -->

## Hockey Season Comes to an End

The spring and summer hockey seasons have come to an end so I'm in a slight lull from playing. Both teams I play full time on made it to the playoffs, but were eliminated. We played well and still had fun which is all I really want.

I ended up taking a few pucks off my knee and thigh late in the season so I ended up getting new (to me) leg pads off Sideline Swap, and new pants to hopefully help keep me better protected next season. I was able to try out the leg pads in a practice and thankfully they feel just like my old ones, but with better protection. I was slightly worried I would have to adjust more to new gear, so it's nice that they feel the same.

## Finished Redesign

I ended up finishing [my redesign](https://kpwags.com/posts/2024/08/23/a-wild-redesign-has-appeared/) and am happy with how it turned out. It was on my radar for a while and I'm glad I was able to get it out. Also, my build times have been shrunk since I moved to my local media repository. Instead of build times taking close to a minute from fetching all the data from Notion, the builds take maybe 10 seconds for the first render, and then seconds after. I love how flexible 11ty is. (For the record, the build times were as long as they were, not because of 11ty, but because of reaching out to Notion every build.)

## My Media Repository Done...and Then Not

I finished building my repository, got it containerized so it could run on Docker, logged into my NAS...only to then find that Docker was not compatible with my NAS. ***Oof!*** I got it running on my Linux box for the time being, and while I spend more time on Linux than I do on Windows, it's not ideal as it would be inaccessible if I want to play games on Windows. There are guides on how to get Docker running on my NAS, but I'm not certain how far I want to go to run things in an unsupported manner.

So, I'm starting a new version. I'll keep the Sqlite database I created through .NET, but am building the API in Node.js. It's been a long while since I've really worked with Node, but I've been making good progress so far.

I was originally going to build the frontend with web components and basic HTML/CSS/JavaScript, but I decided that I wanted to get this up and running fast and went with React since it wouldn't be as much of a learning curve as I have not used web components extensively. Yes, I know it's a cop out, and once the initial version is out there, I do intend to remove React and go with more web standards and less JS. I just want something up and running fast, and React allows me to do just that.

## Running...a Lot

Early in the month, there was a week where it was in the high-60s, low-70s. I took advantage of the beautiful weather to get outside and run. Well those runs continued even when the temperatures climbed back into the low-80s. I was feeling good so I just kept going. In the end I ran just shy of 70 miles. My lifting has taken a hit, but I'm not mad about it.

## House Work

Throughout the month I ended up taking care of a bunch of work around the house. When we moved in almost 10 years ago, we took down the wallpaper and painted, but let the trim be. Needless to say, it needed a refresh so I started going through all the main rooms of the house and putting a fresh coat of paint on. We're considering adopting another dog and cat and figure it'll be easier to do the painting now rather than when furry friends start wandering around.

We also have quite hard water. A little over a year ago, I noticed that it didn't seem like our water softener was working properly. After some debugging with my Dad, we still couldn't quite figure it out. My Dad did have a theory that the exit tube was clogged and the water softener couldn't get the suction going to eject the water. Sure enough, when I had the water softener eject the water into buckets, it seemed to work as it was supposed to. I had to dig up part of my front garden, but found the tube, and sure enough, the connection was loose and the one tube had split. I replaced the tubing, and ran another cycle and it worked! I ended up cleaning out the entire tub and replaced all the salt. So hopefully that can be crossed off my to-do list for a while.

## Monthly Round-Up

### 🏃🏼‍♂️ Fitness

- **Running:** 68.33 miles ⬆️
- **Walking:** 2.00 miles ⬆️
- **Biking:** 0 miles ➡️
- **Lifting:** 116,043 ⬇️

### 📚 Reading

- Finished [The Blood Telegram: Nixon, Kissinger, and a Forgotten Genocide](https://bookshop.org/p/books/the-blood-telegram-nixon-kissinger-and-a-forgotten-genocide-gary-j-bass/9789502?ean=9780307744623) by Gary J. Bass
- Finished [The Firm](https://bookshop.org/p/books/the-firm-john-grisham/7309328?ean=9780385319058) by John Grisham
- Finished [The Internet Con: How to Seize the Means of Computation](https://bookshop.org/p/books/the-internet-con-how-to-seize-the-means-of-computation-cory-doctorow/18771891?ean=9781804291245) by Cory Doctorow
- Finished [Gentle Writing Advice: How to Be a Writer Without Destroying Yourself](https://bookshop.org/p/books/gentle-writing-advice-how-to-be-a-writer-without-destroying-yourself-chuck-wendig/18825636?ean=9781440301209) by Chuck Wendig
- Started [Liar in a Crowded Theater: Freedom of Speech in a World of Misinformation](https://bookshop.org/p/books/liar-in-a-crowded-theater-freedom-of-speech-in-a-world-of-misinformation-jeff-kosseff/19780472?ean=9781421447322) by Jeff Kosseff

### ✍🏻 Writing

- Reading Logs
	- [August 5 (#87)](https://kpwags.com/reading-log/87/)
	- [August 12 (#88)](https://kpwags.com/reading-log/88/)
	- [August 19 (#89)](https://kpwags.com/reading-log/89/)
	- [August 26 (#90)](https://kpwags.com/reading-log/90/)
- Week Notes
	- [July 28 - August 3](https://kpwags.com/posts/2024/08/04/week-notes/)
	- [August 4 - 10](https://kpwags.com/posts/2024/08/11/week-notes/)
	- [August 11 - 17](https://kpwags.com/posts/2024/08/18/week-notes/)
	- [August 18 - 24](https://kpwags.com/posts/2024/08/25/week-notes/)
	- [August 25 - 31](https://kpwags.com/posts/2024/09/01/week-notes/)
- Wrote about [switching to Obsidian](https://kpwags.com/posts/2024/08/07/switching-to-obsidian/)
- Wrote about [my site redesign](https://kpwags.com/posts/2024/08/23/a-wild-redesign-has-appeared/)
- Wrote about [building my media repository](https://kpwags.com/posts/2024/08/25/building-my-media-repository/)
- Wrote about [being annoyed by my watch activity reminders](https://kpwags.com/posts/2024/08/28/rate-limiting-apple-watch-notifications/)
- Wrote about [containerizing a Blazor app](https://kpwags.com/posts/2024/08/28/containerizing-an-existing-blazor-project/)

### 🎮 Gaming

- Finished [Ratchet & Clank: A Rift Apart](https://www.playstation.com/en-us/games/ratchet-and-clank-rift-apart/)
- Finished [The Last of Us](https://www.playstation.com/en-us/games/the-last-of-us-remastered/)
- Started [The Last of Us, Part II](https://www.playstation.com/en-us/games/the-last-of-us-part-ii-remastered/)
- Started [NHL 24](https://www.ea.com/games/nhl/nhl-24)
- Started [Madden 25](https://www.ea.com/games/madden-nfl/madden-nfl-25)

### 📺 Watched

- Finished [Turning Point: The Bomb and the Cold War](https://www.imdb.com/title/tt26227818/)
- Continued [Good Eats](https://www.imdb.com/title/tt0344651/)
- Continued [The Stand](https://www.imdb.com/title/tt1831804/)
- Started [Only Murderers in the Building](https://www.imdb.com/title/tt11691774/)

### 🎬 Movies

- [Asteroid City](https://www.imdb.com/title/tt14230388/)
- [Sicario](https://www.imdb.com/title/tt3397884/)
- [Being the Ricardos](https://www.imdb.com/title/tt4995540/)
- [The Accountant](https://www.imdb.com/title/tt2140479/)