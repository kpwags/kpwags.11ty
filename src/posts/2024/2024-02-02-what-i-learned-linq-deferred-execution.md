---
title: 'What I Learned: LINQ Deferred Query Execution'
date: '2024-02-02'
permalink: /posts/2024/02/02/what-i-learned-linq-deferred-execution/index.html
tags:
  - What I Learned
  - C#
  - LINQ
  - .NET
  - Development
---

I’ve been reading [Parallel Programming and Concurrency with C# 10 and .NET 6](https://bookshop.org/p/books/parallel-programming-and-concurrency-with-c-10-and-net-6-a-modern-approach-to-building-faster-more-responsive-and-asynchronous-net-applications-alvin-/18757208?ean=9781803243672) by Alvin Ashcraft. So far I’ve been learning a lot about how .NET handles threads, parallel programming and concurrency as the title would indicate. But in the meantime, I’ve learned something about LINQ that I probably should’ve realized or learned earlier.
<!-- excerpt -->

In chapter 8, Alvin introduces Parallel LINQ or PLINQ. In his introduction, he mentioned that like LINQ, PLINQ also supported deferred query execution, a concept I had for whatever reason not heard of.

For those who aren’t familiar with C#, LINQ is a library within C# for among other things, querying against objects like lists and arrays.

Let’s show an example.

Suppose we have a class for people

```csharp
public class Person
{
	public string Name { get; set; }
	public string Rank { get; set; }
}
```

Now let’s create a list of people.

```csharp
var people = new List<Person>()
{
	new Person { Name = "Jean Luc Picard", Species = "Human" },
	new Person { Name = "William Riker", Species = "Human" },
	new Person { Name = "Data", Species = "Android" },
	new Person { Name = "Geordi LaForge", Species = "Human" },
	new Person { Name = "Worf", Species = "Klingon" },
	new Person { Name = "Deanna Troi", Species = "Betazoid" },
	new Person { Name = "Beverly Crusher", Species = "Human" },
	new Person { Name = "Guinan", Species = "El-Aurian" },
	new Person { Name = "Alexander Rozhenko", Species = "Klingon" },
}
```

A quick example of LINQ would be:

```csharp
var humans = people.Where(p => p.Species == "Human");
```

This code would go through the list of people and select those with the species of “Human”.

This particular example is very similar to JavaScript’s `filter()` function. The rough JS equivalent would be:

```javascript
const humans = people.filter((p) => p.Species === "Human");
```

When we talk about deferred execution, what we mean is that the search or filter is not immediately executed. In the above example with selecting the human species command crew of the *USS Enterprise*, the query was not actually executed. It only will get executed when it’s enumerated or acted upon.

```csharp
// this causes the query to be executed
var humans = people.Where(p => p.Species == "Human").ToList();

// this query will not execute, and instead, be deferred
var klingons = people.Where(p => p.Species == "Klingon");

// this will cause the query to be executed
foreach (var klingon in klingons)
{
	Console.WriteLine(klingon);
}
```

In the first case, the query is acted upon by converting it to a list object. In the second, it would be executed when it’s enumerated to log the person to the screen.

Some of the benefits of deferred query execution are better performance, as you won’t have to execute the query on large datasets all at once. It can also allow you to better chain queries together, allowing more complex queries and operations. And since the query is always re-evaluated on enumeration, you can update the collection as you are iterating over it.

It’s something I have been doing for a long time in C#, but hadn’t really known it. Now I’m a little bit smarter about it and figured I’d share.