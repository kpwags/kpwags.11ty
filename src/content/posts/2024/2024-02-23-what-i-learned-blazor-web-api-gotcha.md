---
title: 'What I Learned: HTTP GET Requests in Blazor with a .NET Web API & MediatR Gotcha'
date: '2024-02-23'
permalink: /posts/2024/02/23/what-i-learned-blazor-web-api-gotcha/index.html
tags:
  - What I Learned
  - Blazor
  - .NET
  - Development
  - C#
---

The side project idea that has gained the most traction with me is the league management web application. I've spent the better part of weekend and then Monday & Wednesday getting the Blazor web app communicating with the Web API I'm also building for it.
<!-- excerpt -->

The one issue I was dealing with was getting an HTTP 415 status code when I tried to perform GET requests to the API. I was trying to figure out what I was doing wrong because I was controlling both sides of things. I wrote the API calls, and the API. Certainly I should be able to figure this out.

For those unaware, the [415 status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) means that the API is refusing the request because the payload is in the wrong format. This was confusing to me, because the API requests I was making didn't have a payload. I was just requesting a list of values to populate a dropdown with.

The API Controller looked good. I was specifying that the request was a GET request.

```csharp
[HttpGet("getsports")]
public async Task<ActionResult<IReadOnlyCollection<SportApiModel>>> GetSports(GetSports.Request request, CancellationToken cancellationToken)
{
    var sports = await mediator.Send(request, cancellationToken);

    return Ok(sports);
}
```

I remembered I saw this when writing JavaScript and calling APIs. I went into the wrapper I wrote around the native `window.fetch` function. Sure enough, I found what fixed the error when making an API call from JavaScript.

```js
headers['Content-Type'] = 'application/json';
```

That's right, I need to add the content type to the header, it all makes sense now. Opening Postman, I was able to replicate the error, and confirm that adding the content type to the header fixed the problem. Surely adding the content type to the header from Blazor would be just as easy and solve the problem just as quickly.

If only...

I tried multiple methods of setting the headers, and nothing fixed the problem. No matter how I sent the API call, it returned a 415. Then, for whatever reason, I happened to consider the way I had the controller action configured.

For most of the .NET APIs I build, I often use the [mediator pattern](https://en.wikipedia.org/wiki/Mediator_pattern) and will use the popular [MediatR library](https://github.com/jbogard/MediatR).

Let's take a quick look at the GetSports class and you might be able to see where the gotcha I worked myself into came from.

```csharp
public class GetSports
{
    public class Request : IRequest<IReadOnlyCollection<SportApiModel>> { }

    public class Handler(ISportRepository sportRepository) : IRequestHandler<Request, IReadOnlyCollection<SportApiModel>>
    {
        public async Task<IReadOnlyCollection<SportApiModel>> Handle(Request request, CancellationToken cancellationToken)
        {
            var sports = await sportRepository.GetSportsAsync();

            return sports.Select(SportApiModel.FromDomainModel).ToList();
        }
    }
}
```

With MediatR, I have the request, which in this case is empty. I'm not passing in any parameters, I simply want to get all the available sports.

The Handler class is where I perform the actual work. I have the sports repository return a list of sports from the database and then return it to the controller. This is a pretty simple request and action.

The gotcha I ran into is that I was specifying that the HTTP Get request would contain a GetSports.Request object. But the controller wasn't receiving an object, it wasn't receiving anything as I wasn't passing a payload at all.

I made a simple change to the controller, and everything started working as I'd expect.

```csharp
[HttpGet("getsports")]
public async Task<ActionResult<IReadOnlyCollection<SportApiModel>>> GetSports(CancellationToken cancellationToken)
{
    var sports = await mediator.Send(new GetSports.Request(), cancellationToken);

    return Ok(sports);
}
```

By removing the GetSports.Request from the parameters and just passing it in to MediatR, the controller was able to figure out that there wasn't anything special about the request and that it could process it.

This was all self-inflicted. I made the mistake of including the request object as part of the controller method. But I figured I'd share it to hopefully help someone else not make the same mistake I did. Because in the end, I did indeed learn something, which I guess is the important part.