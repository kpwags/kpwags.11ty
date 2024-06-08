---
title: 'What I Learned: Blazor Auth with Server Side Pre-Rendering'
date: '2024-03-22'
permalink: /posts/2024/03/22/what-i-learned-blazor-auth-server-prerendering/index.html
tags:
  - What I Learned
  - Blazor
  - .NET
  - Development
---

As I’ve mentioned, I’ve been working a lot with Blazor at work and one of the issues I ran into was supporting authentication and user sessions while still supporting server side pre-rendering on certain pages.
<!-- excerpt -->

When handling the user session, I would be putting the session key into session storage using Microsoft’s protected session store library. This would require using JavaScript which isn’t available during initialization on pre-rendered pages and components.

After batting my head around this for a while, I stumbled upon a [Stack Overflow post](https://stackoverflow.com/questions/74135273/how-to-handle-authentication-in-blazor-application-with-prerendering-enabled) that gave me my solution, albeit, not the greatest one, but one that so far seems to be working well enough.

Let’s look back at my [old post about custom auth in Blazor](https://kpwags.com/posts/2023/07/31/blazor-custom-authentication/). More specifically the `GetAuthenticationStateAsync` method.

<div class="code-block-filename">CustomAuthenticationStateProvider.cs</div>

```csharp
public override async Task<AuthenticationState> GetAuthenticationStateAsync()
{
	var identity = new ClaimsIdentity();
	
	var userId = await _sessionStorageService.GetItemAsync<int>("userId");
	
	if (userId > 0)
	{
		var user = await _userManager.FindByIdAsync(userId.ToString());
		
		if (user is not null)
		{
			identity = new ClaimsIdentity(new[]
			{
				new Claim("UserAccountId", user.Id.ToString()),
				new Claim(ClaimTypes.Email, user.Email ?? ""),
				new Claim(ClaimTypes.Name, user.Name)
			}, "CardOrgAuth");
		}
		else
		{
			// can't find the user, kill the session
			await _sessionStorageService.RemoveItemAsync("userId");
		}
	}
	
	return await Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
}
```

The issue I ran into was on the line where I would pull the user ID from session storage.

```csharp
var userId = await _sessionStorageService.GetItemAsync<int>("userId");
```

This would require Blazor executing JavaScript which isn’t available, so the page would crash. The solution or workaround for this, while not elegant, is to wrap the check in a try-catch statement.

<div class="code-block-filename">CustomAuthenticationStateProvider.cs</div>

```csharp
public override async Task<AuthenticationState> GetAuthenticationStateAsync()
{
	var identity = new ClaimsIdentity();

	try
	{
		var userId = await _sessionStorageService.GetItemAsync<int>("userId");

		if (userId > 0)
		{
			var user = await _userManager.FindByIdAsync(userId.ToString());

			if (user is not null)
			{
				identity = new ClaimsIdentity(new[]
				{
					new Claim("UserAccountId", user.Id.ToString()),
					new Claim(ClaimTypes.Email, user.Email ?? ""),
					new Claim(ClaimTypes.Name, user.Name)
				}, "CardOrgAuth");
			}
			else
			{
				// can't find the user, kill the session
				await _sessionStorageService.RemoveItemAsync("userId");
			}
		}
	}
	catch { }

	return await Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
}
```

The next step is to go into the layout and add the following code.

<div class="code-block-filename">MainLayout.razor</div>

```razor
@inject AuthenticationStateProvider AuthStateProvider

<html>
	...
</html>

@code {
	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
    	await ((CustomAuthenticationStateProvider)AuthStateProvider).GetAuthenticationStateAsync();
	}
}
```

In the `OnAfterRenderAsync` lifecycle method, JavaScript can be utilized, so the user session can be fetched and the pages, even those with pre-rendering turned on will load correctly.

It might not be the most elegant solution or even one that is preferred, but it has been working for me so far.