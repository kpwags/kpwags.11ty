---
title: 'What I Learned: EventCallback in Blazor'
date: '2024-03-08'
permalink: /posts/2024/03/08/what-i-learned-blazor-eventcallback/index.html
tags:
  - What I Learned
  - Blazor
  - .NET
  - Development
---

Of late, I’ve been using .NET 8 and Blazor at both work and on my league management side project. One thing that I often need to do is pass data between components. Passing data from a parent component to a child component isn’t terribly difficult with parameters. Passing data from a child to a parent isn’t quite as straightforward.
<!-- excerpt -->

One way to handle passing data is using `EventCallback`. This allows a child component to expose an event notifying the parent component. Let’s take a look at where and how this can be used.

Let’s say I wanted to add membership levels to my site. (Don’t worry, I’m definitely not going to do that.)

{% image "./images/2024-03-08-diagram.jpg", "A wireframe showing cards to choose your membership level" %}

I could write the HTML to define the membership level cards 3 times, but the smarter way would be to make each card a component.

First, let’s assume we have an enum called `MembershipLevel`.

<div class="code-block-filename">Constants.cs</div>

```csharp
public enum MembershipLevel
{
  Normal,
  Plus,
  Pro,
}
```

Let’s build the component.

<div class="code-block-filename">MembershipCard.razor</div>

```csharp
<div class="card">
  <h2>@Name</h2>
  <div class="reaction">@Emoji</div>
  <button type="button" @onclick="ChooseMembershipLevel">Choose</button>
</div>

@code {
  [Parameter]
  public string Name { get; set; } = string.Empty;

  [Parameter]
  public string Emoji { get; set; } = string.Empty;

  [Parameter]
  public MembershipLevel Level { get; set; }

  [Parameter]
  public EventCallback<MembershipLevel> OnSelection { get; set; }

  public async Task ChooseMembershipLevel()
  {
    await OnSelection.InvokeAsync(Level);
  }
}
```

As you can see, each card takes 4 parameters. The name of the level, the emoji to display, the `MembershipLevel` enum, and the `EventCallback` for when the choose button is clicked.

When you define the `EventCallback`, you can either call it with a type (`EventCallback<T>`) to have it send data or without (`EventCallback`) to have it act like a `void` function. In our membership card case, we want to send the membership level chosen so we can have the parent component act on that choice.

You can only pass a single object back to the parent component, but it can be any object such as an `int`, `string`, or even a tuple. I’d recommend against relying too much on tuples for this though as they can get rather unwieldy quick. If you need multiple values, I’d suggest putting them into a class or a struct.

The parent component would look like this:

<div class="code-block-filename">Membership.razor</div>

```csharp
@page "/membership"

<h1>Choose Membership</h1>

<MembershipCard
  Name="Normal"
  Emoji="🙂"
  Level="@MembershipLevel.Normal"
  OnSelection="ChooseMembership"
/>

<MembershipCard
  Name="Plus"
  Emoji="😀"
  Level="@MembershipLevel.Plus"
  OnSelection="ChooseMembership"
/>

<MembershipCard
  Name="Pro"
  Emoji="🤩"
  Level="@MembershipLevel.Pro"
  OnSelection="ChooseMembership"
/>

@code {
  private void ChooseMembership(MembershipLevel level)
  {
    // do something now that you know their choice
  }
}
```

As you can see with each component, we have the `OnSelection` event callback tied to the `ChooseMembership` function on the parent component. When a user clicks one of the buttons, the enum gets passed back to the `ChooseMembership` function and we can then do something, most likely send them to the next part in the process.

I created a [GitHub Gist](https://gist.github.com/kpwags/6ce6178a8da37c45a9fe20b3e4a09d71) for you to see all the code.