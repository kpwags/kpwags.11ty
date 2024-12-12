---
title: "Skipping Tests (Temporarily) in xUnit"
date: '2024-12-11T20:09:33.607Z'
permalink: /posts/2024/12/11/skipping-tests-in-xunit/index.html
description: "Need to temporarily disable a test in xUnit? You can and it's not difficult."
tags:
  - Development
  - Testing
  - Unit Tests
  - .NET
  - C#
  - XUnit
---
While it is almost always better to fix a failing test, there are occasionally times when you know the code is working, but you need time to correct the test. Thankfully xUnit provides a pretty simple way to tell it to skip a specific test.
<!-- excerpt -->

```csharp
[Fact]
public async Task Service_WorksCorrectly()
{
  …
}
```

Just add `Skip` and then a reason as to why you’re skipping it.

```csharp
[Fact(Skip = “Need to figure how to mock PDF”)]
public async Task Service_WorksCorrectly()
{
  …
}
```

I ran into this while figuring out how to best handle mocking a file system operation. I wanted to get the code up into dev so work could continue on the next part of the process. The issue wasn’t so much the functional code as it was the test code.

I would highly recommend not leaving these hanging around as you want the tests to run, but if you’re in a pinch, it can be done. If you have todo tracking in your IDE, you can also add a todo comment to remind yourself to come back to it.