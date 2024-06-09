---
title: 'What I Learned: C# Primary Constructors'
date: '2024-01-05'
permalink: /posts/2024/01/05/what-i-learned-c-primary-constructors/index.html
tags:
  - What I Learned
  - C#
  - .NET
  - Development
---

When writing C# code, I often use dependency injection to inject the various services and repositories I need in the class I’m working on. Sometimes that would end up making the top of the classes rather “busy”. C# 12 has introduced a new way to make constructors and I love it.
<!-- excerpt -->

In C# 11 and earlier, I would create a class and its dependencies as follows:

```csharp
public class Handler
{
	private readonly IAuthService _authService;
	private readonly IHttpContextAccessor _httpContextAccessor;

	public Handler(IAuthService authService, IHttpContextAccessor httpContextAccessor)
	{
		_authService = authService;
		_httpContextAccessor = httpContextAccessor;
	}

	// the rest of the code
	...
}
```

I would have to individually create each of the dependencies as private variables at the top and assign them in the constructor. Normally I only deal with a small number of injected dependencies, but there are a few classes where there might be four or five which can cause the top of the class to feel cluttered.

It’s not a big deal of course, but if the code can be simplified...

C# 12 has introduced primary constructors and the above code can be simplified to:

```csharp
public class Handler(IAuthService authService, IHttpContextAccessor httpContextAccessor)
{
	// the rest of the code
	...
}
```

Everywhere in the class I would have used to use `_authService` and `_httpContextAccessor`, I now just use `authService` and `httpContextAccessor`. The dependency injection continues to work.

Both methods work, if you prefer the previous way, you can use that. But for me, the new method looks cleaner and I’m a fan.

---

*Side Note:* This is the first of what I hope will become a weekly series titled “What I Learned”. Essentially every week I plan to share something I learned over the last week or so. It could be something related to software development like today, or could be related to history, or any number of topics. So keep your eye out.