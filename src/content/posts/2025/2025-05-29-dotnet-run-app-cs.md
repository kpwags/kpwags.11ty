---
title: "dotnet run app.cs"
date: '2025-05-29T22:52:38.056Z'
permalink: /posts/2025/05/29/dotnet-run-app-cs/index.html
description: "In .NET 10 due out later this year, Microsoft has announced the ability to run code right from the .NET CLI."
tags:
  - .NET
  - C#
  - Development
---
So this is kind of cool. In .NET 10 due out later this year, [Microsoft has announced the ability to run code right from the .NET CLI](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app/) rather than having to scaffold an entire project.
<!-- excerpt -->

Over the last several .NET versions, they've been making it easier and easier to get started with building apps. In .NET 6, they announced [top-level statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements) which allowed developers to bypass having to specify the class and `Main` statements. You still needed the app within a C# project, but it removed a lot of the boiler plate code. In .NET 10, it looks like they're taking it a bit further.

This probably puts it a little more on par with Node.js where you could just run `node index.js` to run a node script. Now you can run a single C# file in much the same way.

```bash
$> dotnet run app.cs
```

The link provides more details as well about including 3rd party packages and more. Should be a pretty cool addition to the .NET ecosystem.

<div class="view-link"><a href="https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app/">Read More</a></div>
