---
title: 'Handy Visual Studio Code Plugin for Jest'
date: '2020-09-24'
permalink: /posts/2020/09/24/handy-visual-studio-code-plugin-for-jest/index.html
tags:
  - Development
  - Unit Testing
---

I ended up starting a new project recently which I'll get into later, but after my experience writing unit tests with [Digital Family Cookbook](https://kpwags.com/2020/05/06/delving-into-unit-testing.html), I decided to write the tests as I code for this new project. I found a nifty little tool that makes things a little easier for me so I figured I'd share.
<!-- excerpt -->

It's a Visual Studio Code plugin called [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner). What this does is allow you to run a single test or run all tests in the open file from the context menu.

{% image "./images/jestrunner.png", "Jest Runner in action in VS Code" %}

Prior to this, I had 2 npm test scripts. One that runs all tests and stops, and a second that puts Jest in watch mode running every time I make changes to files included in tests. This was sometimes annoying when I just wanted one file or one test run as I would have to wait for all the other tests to run as well. Now I can just right click on the test and click 'Run Jest' and boom...the console will open and the test will run.

I'd highly recommend!
