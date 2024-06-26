---
title: 'Digging Into Blazor - Setting Up Custom Authentication'
date: '2023-07-31'
permalink: /posts/2023/07/31/blazor-custom-authentication/index.html
tags:
  - Blazor
  - .NET
  - C#
  - Development
---

One of the things I wanted to integrate with this project was user accounts. I am not sure that I really need it since I’m not really intending to release my card collection app as a full fledged website for the masses. But I still wanted to add it in if for no other reason than to learn.
<!-- excerpt -->

This is the third installment of my Digging into Blazor series.

<section class="blog-series">
    <h4>Series: Digging into Blazor</h4>
    <ul class="posts">
        <li class="post"><a href="/posts/2023/03/19/digging-into-blazor-first-impressions">First Impressions</a></li>
        <li class="post"><a href="/posts/2023/04/04/digging-into-blazor-entity-framework">Integrating with Entity Framework</a></li>
        <li class="post"><span class="current">Setting Up Custom Authentication</span></li>
        <li class="post"><a href="/posts/2023/09/29/digging-into-blazor-forms">Forms</a></li>
    </ul>
</section>

The first thing I realized is that the architecture of Blazor doesn’t handle user authentication in quite the same way that ASP.NET web applications do.

Blazor uses [SignalR](https://learn.microsoft.com/en-us/aspnet/signalr/overview/getting-started/introduction-to-signalr) extensively, and it uses it for authentication and session management as well.

I figured I’d go through what I had to do to get it working in hopes that it will help someone else.

---

To start, I’m using the [Blazored SessionStorage](https://github.com/Blazored/SessionStorage) library so install that.

```bash
> dotnet add package Blazored.SessionStorage
```

Like many of my projects, I use Microsoft’s Identity libraries to handle users. No sense in rolling your own. And fortunately, Microsoft’s package works with Blazor as well.

To set this up, I need to add Microsoft Identity. This is how it’s done in other apps as well. In `Program.cs` file, (or `Startup.cs` in older project templates).

```csharp Program.cs
builder.Services.AddIdentity<UserAccountDto, IdentityRole<int>>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
```

By declaring `IdentityRole` with `<int>`, I’m telling EntityFramework (EF) to build the Role table using an integer as the ID column type.

The UserAccount table is much the same, but since I need to add values to it, I have it defined in its own class. Again, having it inherit the `IdentityUser` type with `<int>` will have EF use an integer for the ID column type.

```csharp UserAccountDto.cs
using Microsoft.AspNetCore.Identity;

namespace CardOrganizer.Domain.Dtos;

public class UserAccountDto : IdentityUser<int>
{
    [PersonalData] public string Name { get; set; } = string.Empty;
}
```

This in itself doesn’t vary much from other project types so the familiarity helped.

The next thing I needed to do was add the Blazored SessionStorage library. It’s able to be done by adding it to the `Program.cs` file.

```csharp Program.cs
builder.Services.AddBlazoredSessionStorage();
```

## Building our Custom Auth Provider

The next step was to build a custom authentication provider. Let’s call it `CustomAuthenticationStateProvider`.

It will need to implement the abstract class `AuthenticationStateProvider`.

```csharp CustomAuthenticationStateProvider.cs
public class CustomAuthenticationStateProvider : AuthenticationStateProvider
{

}
```

I’m going to need access to both Blazor’s session storage and our `UserManager`, so I’ll add them through dependency injection.

```csharp CustomAuthenticationStateProvider.cs
public class CustomAuthenticationStateProvider : AuthenticationStateProvider
{
	private readonly UserManager<UserAccountDto> _userManager;
	private readonly ISessionStorageService _sessionStorageService;

	public CustomAuthenticationStateProvider(
		UserManager<UserAccountDto> userManager,
		ISessionStorageService sessionStorageService
	)
	{
            _userManager = userManager;
            _sessionStorageService = sessionStorageService;
	}
}
```

The first thing I needed to do was to override the `GetAuthenticationStateAync` method. This is the key method needed for method returns the current authentication state. This method is responsible for returning the authentication state to whatever is asking for it.

```csharp CustomAuthenticationStateProvider.cs
public override async Task<AuthenticationState> GetAuthenticationStateAsync()
{
    var identity = new ClaimsIdentity();;

    var userId = await _sessionStorageService
		.GetItemAsync<int>("userId");

    if (userId > 0)
    {
        var user = await _userManager
			.FindByIdAsync(userId.ToString());

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

The first thing this function does is pull the user ID from the session storage. We then use the ID to find the user from the database. If the user is found, we build the identity with the user information. And return it as the authentication state.

If the user isn’t found or there is no user ID in the session state then a blank identity is returned.

## Applying Authentication States

Now that that’s been implemented, we can use the `<AuthorizeView>` elements in our components.

To start, I needed to modify my `App.razor` file to allow for handling the authentication state.

```razor App.razor
<CascadingAuthenticationState>
    <Router AppAssembly="@typeof(App).Assembly">
        <Found Context="routeData">
            <AuthorizeRouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
            <FocusOnNavigate RouteData="@routeData" Selector="h1" />
        </Found>
        <NotFound>...</NotFound>
    </Router>
</CascadingAuthenticationState>

```

I had to encompass the entire page with the `<CascadingAuthenticationState>` tag and I had to change the `<RouteView>` tag in with the `<AuthorizeRouteView>` tag. This will allow for the AuthenticationState to cascade down into my components.

Here’s a good example of it in use in an actual component. In the site’s nav bar, I have links to login and to register when there is no user logged in, and the user’s name and a logout button when there is an active session.

```razor NavBar.razor
@inject AuthenticationStateProvider AuthStateProvider
@inject NavigationManager NavigationManager

...

<AuthorizeView>
        <Authorized>
            <li class="inline-block mx-4"><a href="#" class="text-white">@context?.User?.Identity?.Name</a></li>
            <li class="inline-block mx-4">
                <button type="button" class="btn-link" @onclick="async () => await HandleLogout()">Logout</button>
            </li>
        </Authorized>
        <NotAuthorized>
            <li class="inline-block mx-4"><a href="/login" class="text-white">Login</a></li>
            <li class="inline-block mx-4"><a href="/register" class="text-white">Register</a></li>
        </NotAuthorized>
</AuthorizeView>

...

@code {
    [CascadingParameter] private Task<AuthenticationState>? AuthenticationState { get; set; }

    private async Task HandleLogout()
    {
        await ((CustomAuthenticationStateProvider)AuthStateProvider).EndUserSession();
    }
}
```

Within the `<AuthorizeView>` tags, we have two tags. Anything within the `<Authorized>` tags will appear when the user is logged in, anything within the `<NotAuthorized>` tags will appear when the user is not logged in.

The other key is defining the Cascading Parameter in the `@code` section of the component.

```csharp
[CascadingParameter] private Task<AuthenticationState>? AuthenticationState { get; set; }
```

This is needed so the `AuthorizeView` knows the current authentication state of the user.

## Implementing Logging In and Logging Out

The final step I needed to do was to allow the user to log in and then log out.

### Processing on the Form

The Custom Authentication State Provider I built above doesn’t actually verify the user’s credentials are complete. It just handles maintaining the session. What I needed to do was validate the user’s email and password elsewhere first.

I created a service to handle this.

```csharp AccountService.cs
public async Task<UserAccount> LoginUser(string email, string password)
{
    var user = await _userManager.FindByEmailAsync(email);

    if (user is null)
    {
        throw new Exception("Invalid username or password.");
    }

    var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

    if (result.Succeeded)
    {
        return UserAccount.FromDto(user);
    }

    throw new Exception("Invalid username or password.");
}
```

This function takes an email and a password and uses the `UserManager` and `SignInManager` to find the user, and then verify that the password is the correct password. If the email and password match, then the `UserAccount` object is returned. If the user is not found or the password is incorrect, an exception is thrown.

Let’s take a look at my login page.

```csharp Login.razor
@code {
	...
    try
    {
        var user = await AccountService.LoginUser(_model.Email, _model.Password);

    	await ((CustomAuthenticationStateProvider)AuthStateProvider).StartUserSession(user);

    	_isLoading = false;

        NavigationManager.NavigateTo(
            string.IsNullOrWhiteSpace(RedirectUrl)
                ? "/"
                : RedirectUrl, true
        );
    }
    catch (Exception e)
    {
        _pageError = e.Message;
        _isLoading = false;
        StateHasChanged();
    }
}
```

The first thing I do is pass the email and password to the `LoginUser` function. If the email or password is incorrect, the exception is thrown and the error message is displayed to the user. If the email and password are correct, it passes the `UserAccount` object to the `AuthenticateUser` function and redirects the user to the page they came from or to the homepage.

You might have noticed the `EndUserSession()` function call in the nav bar, and the `StartUserSession` call in the code above. These are the last two pieces in the `CustomAuthenticationStateProvider` class.

```csharp CustomAuthenticationStateProvider.cs
public async Task StartUserSession(UserAccount user)
{
    await _sessionStorageService.SetItemAsync("userId", user.UserAccountId);

    var identity = new ClaimsIdentity(new[]
    {
        new Claim("UserAccountId", user.UserAccountId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Name, user.Name)
    });

    var userAccount = new ClaimsPrincipal(identity);

    NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(userAccount)));
}

public async Task EndUserSession()
{
    await _sessionStorageService.RemoveItemAsync("userId");

    var identity = new ClaimsIdentity();

    NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity))));
}
```

Starting with the `StartUserSession`, this function first puts the user’s ID in the session, then it takes the `UserAccount` object and builds the `ClaimsPrincipal` to be returned, notifying the site that the authentication state has changed.

The `EndUserSession` function does the opposite. It removes the user’s ID from the session, returns a blank principal, and notifies the site the authentication state has changed.

---

That’s basically it. It’s a little more complicated than what I’m used to, but it’s also not horribly difficult to work with.

You can view the code base for my card organizer on [GitHub](https://github.com/kpwags/card-organizer). It’s still a work in progress, but this is currently in place and working.