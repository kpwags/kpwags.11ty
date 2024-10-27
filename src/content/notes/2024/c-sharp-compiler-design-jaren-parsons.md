---
title: "C# Compiler and Language Design at Microsoft with Jared Parsons"
date: '2024-10-26T21:55:04.241Z'
link: https://softwareengineeringdaily.com/2024/03/26/c-compiler-and-language-design-at-microsoft-with-jared-parsons/
author: 'Software Engineering Daily'
permalink: /notes/c-sharp-compiler-design-jaren-parsons/index.html
tags:
  - .NET
  - C#
  - Compatibility
  - Development
  - Podcasts
---

> In terms of the language, which is where I'm more centered up, breaking changes is a very big deal. One of the things I drive home for the compiler team that's very much on my mottos is the number one feature of C# is compatibility. It's like, we very much want the experience of you are not afraid to move to new version of .NET. You're not afraid to buy a new version of Visual Studio, because you know your code is going to keep compiling. We will not break you. We will make sure that unless you have done something absolutely extreme, it's just going to work. That is indeed our number one feature.

As a .NET developer, I greatly appreciate how much work the C# language team puts in to making sure your apps just keep working when you update .NET. The app I work on at work started out as a .NET Core 3.1 Web API. We have since updated it to .NET 6, and now .NET 8. Both updates were smooth with minimal, if any issues.

It really is kind of amazing that we were able to take advantage of all the performance benefits of .NET 6 and then .NET 8 without having to do a lot of work.