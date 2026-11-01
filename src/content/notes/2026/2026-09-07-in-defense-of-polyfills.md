---
title: "In Defense of Polyfills"
date: '2026-09-07T16:52:00.000Z'
permalink: /notes/in-defense-of-polyfills/index.html
link: https://lea.verou.me/blog/2026/polyfills/
author: Lea Verou
tags:
  - Web Development
  - Development
  - Web Browsers
  - CSS
  - JavaScript
  - Polyfills
  - Lea Verou
---
> **Standardized APIs have intrinsic value, independently of browser implementations.**
> 
> We think of polyfills as a toggle: use a polyfill, leave it in there, and later when all browsers implement the feature natively, it gets removed.
> 
> This misses out on one of the biggest benefits of polyfills: **decoupling API design from implementation.**

Completely agree. It's nice when you can easily enhance functionality while not tying yourself to a specific implementation too tightly. Time moves on, implementations become standard across the different browsers, and you can go in and get rid of code. It's a great feeling.

It can also help handle things if a library ceases being maintained, or a vulnerability of some form is found in the polyfill library, or anything else. The easier things are to swap out implementations in general, the better.