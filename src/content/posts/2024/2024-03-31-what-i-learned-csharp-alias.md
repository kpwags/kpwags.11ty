---
title: 'What I Learned: C# Aliases'
date: '2024-03-31T14:46:44Z'
permalink: /posts/2024/03/31/what-i-learned-csharp-alias/index.html
tags:
  - What I Learned
  - C#
  - .NET
---

One of the neat features .NET 8 & C# 12 brought is the ability to[ alias types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-12.0/using-alias-types).
<!-- excerpt -->

I had heard about this briefly in the road leading up to .NET 8’s release back in November but had quickly forgotten about it. Recently I found my first use for them.

The use I found for them was basically to make a tuple a little easier to use.

```csharp
var (latitude, longitude) = await GetGeolocationAsync();

private async Task<(decimal latitude, decimal longitude)> GetGeolocationAsync()
{
	...
}
```

becomes

```csharp
using Geolocation = (decimal latitude, decimal longitude);

var geolocation = await GetGeolocationAsync();

private async Task<Geolocation> GetGeolocationAsync()
{
	...
}
```

For objects and types used throughout your application, it makes more sense to create actual classes for these types. But for tuples used within a class, it just provides a quick and easy way to define them without having to type all them out.