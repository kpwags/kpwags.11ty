---
title: "React Still Feels Insane And No One Is Talking About It"
date: '2025-08-01T13:31:18.094Z'
link: https://mbrizic.com/blog/react-is-insane/	
author: Mario Brizić
permalink: /notes/react-still-feels-insane-and-no-one-is-talking-about-it/index.html
tags:
  - React
  - Web Development
  - Mario Brizic
---
> Let's start from the state. If you have a top-down tree of components, it's logical you'd want to pass the state top-down too. But in practice, with components very numerous and small, this is very messy, as you spend a lot of time and code just wiring the various pieces of data to get them where you need them.
> 
> This was solved by "sideloading" state into components using React hooks. I haven't heard anyone complain about this, but are you guys serious? You're saying that any component can use any piece of app state? And even worse, any component can emit a state change, that can then update in any other component.
> 
> How did this ever pass a code review? You are basically using a global variable, just with more elaborate state mutation rules. They're not even rules, but merely a ceremony, because nothing is really preventing you from mutating state from anywhere. People really think if you give something a smart name like a reducer it suddenly becomes Good Architecture™?