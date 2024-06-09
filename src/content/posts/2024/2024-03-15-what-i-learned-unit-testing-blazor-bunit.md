---
title: 'What I Learned: Unit Testing Blazor with bUnit'
date: '2024-03-15'
permalink: /posts/2024/03/15/what-i-learned-unit-testing-blazor-bunit/index.html
tags:
  - What I Learned
  - Development
  - Blazor
  - .NET
  - Unit Testing
---

At work, my current project has me using Blazor. Unfortunately that means that my tooling for unit testing the frontend and the UI no longer work for this project. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) doesn’t work all that well with a Blazor frontend. And by that I mean it just doesn’t work. Enter [bUnit](https://bunit.dev/).
<!-- excerpt -->

bUnit is a library and a set of tools to allow you to test the UI portion of your Blazor. It integrates nicely with xUnit which makes it ideal for my uses as xUnit is my go to for .NET testing. (It integrates with NUnit and MSTest too!)

Frontends need to be unit tested just as much as the backend code, so it’s a good idea to make sure that they’re included in your test suites.

Let’s go through an example. Let’s say you have a component that allows you to output several words in different languages. This component has a header to indicate the current language, an output div for the outputted words, and two buttons to output “hello” and “goodbye” in the specified language.

The component might be written something like this:

```csharp
<section class="language-box">
  <h1>@Language</h1>
  <div class="output">@_output</div>
  <div class="actions">
    <button
      type="button"
      data-testid="hello-button"
      @onclick="@(() => OutputWord(WordDesired.Hello))
    >
      Say Hello
    </button>
    <button
      type="button"
      data-testid="goodbye-button"
      @onclick="@(() => OutputWord(WordDesired.Goodbye))
    >
      Say Goodbye
    </button>
  </div>
</section>

@code {
  private string _output = string.Empty;

  [Parameter] public string Language { get; set; } = string.Empty;
  
  enum WordDesired {
    Hello,
    Goodbye
  }
  
  private void OutputWord(WordDesired word)
  {
    switch (word)
    {
      case WordDesired.Hello:
        _output = GetHello();
        break;
      case WordDesired.Goodbye:
        _output = GetGoodbye();
        break;
    }
  }
  
  private string GetHello()
  {
    switch (Language)
    {
      case "French":
        return "Bonjour";
      case "German":
        return "Hallo";
      case "Spanish":
        return "Hola";
      default:
        return "Hello";
    }
  }
  
  private string GetGoodbye()
  {
    switch (Language)
    {
      case "French":
        return "Au revoir";
      case "German":
        return "Auf Wiedersehen";
      case "Spanish":
        return "Adios";
      default:
        return "Goodbye";
    }
  }
}
```

Now we need to test it. We should make sure it outputs the correct words depending on what language we want. Let’s write the test file. If you’ve ever used xUnit, it should be relatively familiar.

```csharp
public class LanguageBoxTests : TestContext
{
  [Fact]
  public void LanguageBox_GermanHello_OutputsHallo
  {
    // render the component, passing "German" as the language parameter
    var languageBox = RenderComponent<LanguageBox>(parameters => parameters
      .Add(p => p.Language, "German)
    );
    
    // find the "Say Hello" button and click it
    languageBox.Find("button[data-testid='hello-button']).Click();
    
    // find div containing the output
    var outputDiv = languageBox.Find("div.output");
    
    // check to make sure the markup matches what we expect
    outputDiv.MarkupMatches("<div class=\"output\">Hallo</div>");
  }
}
```

What this test does is render the component in memory as if we put the following into a Blazor component

```csharp
<LanguageBox Language="German" />
```

We assigned it to the `languageBox` variable. This will allow us to use the `.Find()` method to find elements within the component by using CSS selectors. It’s the equivalent of JavaScript’s `querySelector` function.

Above, the first time we use `.Find("button[data-testid='hello-button'])`, we are telling the test to find the button that has the attribute `data-testid` with the value “hello-button”. Appending the `.Click()` method means we want to then have the test click the button.

The second time we use `.Find()` we are telling it to find the div that contains the output. We then use the `MarkupMatches` method to verify that the markup is what we’d expect. We expect the “Say Hello” button to output “Hallo”. The one catch with this is that when you check the markup, it will also include the full HTML tag as well. If the div had a lot of classes or attributes on it, it’d be a lot to check. It would also mean we’d have to update this test if we changed any of the styling or the like. It could get annoying real fast.

One trick I’ve learned which can be useful is to use the `MarkupMatches()` on the element’s inner HTML. So we could change the final line of the test to be:

```csharp
outputDiv.InnerHtml.MarkupMatches("Hallo");
```

With this, we don’t care how we’ve styled its container, we just make sure that the translation is correctly outputted to the page.

I’m still digging into more of the inner workings of bUnit, but so far I’ve found it to be a great tool to add tests to Blazor. If you’re a developer using Blazor, I’d recommend you checking it out and reading the [documentation](https://bunit.dev/docs/getting-started/index.html) to see how you can add tests to your code.