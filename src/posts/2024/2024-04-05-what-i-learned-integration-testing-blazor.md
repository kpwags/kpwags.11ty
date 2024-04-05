---
title: 'What I Learned: Integration Testing Blazor Apps with bUnit'
date: '2024-04-05T13:25:43Z'
permalink: /posts/2024/04/05/what-i-learned-integration-testing-blazor/index.html
tags:
  - What I Learned
  - Testing
  - Blazor
  - Integration Testing
  - .NET
  - C#
  - Development
---

I wrote last month about [unit testing in Blazor with bUnit](https://kpwags.com/posts/2024/03/15/what-i-learned-unit-testing-blazor-bunit/). What I didn’t think of at the time was whether bUnit and the same methodology could be used for integration tests as well. Turns out, it can.
<!-- excerpt -->

## A Quick Introduction to Integration Testing

For those who might not be aware, integration tests are where you go about testing the system as a whole rather than the individual pieces. Unit tests are good to make sure that the method you’re testing works as expected, whereas integration tests are good for testing how the different methods work together. 

{% image "./images/testing-pyramid.jpg", "A triangle with end to end test at the top, integration tests in the middle, and unit tests on the bottom" %}

This diagram is good to describe a good testing structure for developers. Unit tests are generally the most common as they run faster. Projects have fewer Integration tests as can take longer because they will generally interact with actual services rather than mocks or test doubles like unit tests. End to end (E2E) tests are rare and fewer as they will often take much longer to run as they test the entire system.

## Integration Testing with bUnit

One of the difference when compared to unit tests is that integration tests should try to use as much of the full services as possible. This means that they will need to access the dependencies your Blazor app uses. This means that they need to be injected into the tests. You can certainly add them to each test class, but there’s also my preferred way which is to create your own `TestContext` class that inherits bUnit’s `TestContext` class.

```csharp
using Bunit;

namespace BlazorApp.Tests;

public class BlazorAppTestContext : TestContext
{
	Services.AddScoped<IRepository, Repository>();
	Services.AddScoped<IAuthService, AuthService>();
}
```

Then for your tests, you just need to have them inherit the `BlazorAppTestContext` class rather than the `TestContext` class.

```csharp
public class ManageUserTests : BlazorAppTestContext
{
	[Fact]
	public void ManageUsers_PageLoad_UsersAreListed()
	{
		var manageUsersPage = RenderComponent<ManageUsers>();
		
		var users = manageUsersPage.FindAll("table.users tr");
		
		Assert.Equal(10, users.Count);
	}
	
	[Fact]
	public void ManageUsers_UserClicksResetPassword_UserIsSentPasswordReset()
	{
		var manageUsersPage = RenderComponent<ManageUsers>();
		
		var users = manageUsersPage.Find("button.reset-password[data-user='1']");
		
		var alert = manageUsersPage.WaitForElement("div.alert.success");
		
		alert.InnerHtml.MarkupMatches("Reset password email sent");
	}
}
```

In the above test, we can imagine a manage users grid that uses the `Repository` dependency to list the users, and then the `AuthService` dependency to reset the password. In an integration test, the repository could use the same dependencies that your actual app uses which can make integration testing easier to know that your tests are working as close to how the actual app runs.

This is overly simplified for demonstration purposes, but it’s nice to know the [bUnit](https://bunit.dev/index.html) library can work well across the different test types and use cases.