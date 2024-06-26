---
title: 'Digging Into Blazor - Forms'
date: '2023-09-29T17:00:00.000Z'
permalink: /posts/2023/09/29/digging-into-blazor-forms/index.html
tags:
  - Blazor
  - .NET
  - C#
  - Development
---

One of the regular things you have to do when building interactive websites and applications is to build forms to allow users to enter data. In this post, I’m going to show how to build a simple form in Blazor.
<!-- excerpt -->

This is the 4th entry in my digging into Blazor posts.

<section class="blog-series">
    <h4>Series: Digging into Blazor</h4>
    <ul class="posts">
        <li class="post"><a href="/posts/2023/03/19/digging-into-blazor-first-impressions">First Impressions</a></li>
        <li class="post"><a href="/posts/2023/04/04/digging-into-blazor-entity-framework">Integrating with Entity Framework</a></li>
        <li class="post"><a href="/posts/2023/07/31/blazor-custom-authentication">Setting Up Custom Authentication</a></li>
        <li class="post"><span class="current">Forms</span></li>
    </ul>
</section>

To keep things simple, I'm going to show the "Add Brand" form. If you've read the other posts, you will know I'm building a little web app to organize my sports cards. One of the key pieces of data I want to record is the brand. Back in the day there were all kinds of brands, *Topps*, *Donruss*, *Upper Deck*, etc. For each brand, I want to save the name, and what type of card it makes. For my purposes, the types currently are Baseball & Football.

Let's dig in.

## Building the Model

The first thing I wanted to do was build the model.

```csharp AddBrandViewModel.cs
using System.ComponentModel.DataAnnotations;

namespace CardOrganizer.ViewModels;

public class AddBrandViewModel
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(150, ErrorMessage = "Must be less than 150 characters")]
    public string Name { get; set; } = string.Empty;

    [Range(1, 2, ErrorMessage = "Type is required")]
    [Required(ErrorMessage = "Type is required")]
    public int CardTypeId { get; set; }
}
```

As you can see, there are two properties in the model. The name, and the card type.

### Data Annotations

For both properties, I have data annotations to help with validation. Both are required so I use the `[Required]` annotation.

For the brand name, I have it as a `NVARCHAR(150)` in the database, so I want to limit the input to 150 characters to avoid truncation. This can be done using the `[StringLength]` annotation. We don't want the user to wonder why the value isn't what they entered.

For the card type, there are only two options, "Baseball" and "Football". For the model's purposes, they're tied to their IDs. '1' for baseball, '2' for football. To make sure that the value is valid, I use the `[Range]` annotation to indicate what the valid range for the value is. In this case, '1' or '2'.

*Note:* I'll be using a `<select>` control on the page, so the chances of it ever being out of range is slight, but better safe than to have to deal with weird data.

## Building the Form

Now for the fun part! Building the actual form on the page. Let's just quickly set up the frame for the page.

```razor Add.razor
@page "/brands/add"

@using CardOrganizer.ViewModels
@using CardOrganizer.Domain

@inject IBrandRepository BrandRepository
@inject NavigationManager NavigationManager

<PageTitle>Add New Brand | Card Organizer</PageTitle>

<main class="block small">
    <div class="bg-white rounded-lg border-2 border-primary p-8">
        <h1 class="text-3xl">Add Brand</h1>

    </div>
</main>

@code {

}
```

This is the basic structure of the page. I specify that the page will be located at the url `https://domain.com/brands/add`, I add my usings, and then inject both my brand repository and the navigation manager (more on both of these later). I give the page a title and then specify the start of the HTML.

Let's start to add in the inner workings. Let's start by adding in the `AddBrandViewModel` and some of the other helper variables I'll be using on the page.

```razor Add.razor
@code {
    private readonly AddBrandViewModel _model = new();
    private bool _isProcessing;
    private string _pageError = string.Empty;
}
```

The `AddBrandViewModel` is the model we will be using to create the brand and bind it to the form. The `_isProcessing` and `_pageError` variables will be used to disable the form while it is processing, and to store/display any processing errors.

The next thing we want to do is to start adding the form into the HTML.

```razor Add.razor
<EditForm Model="@_model" OnSubmit="@AddBrand">
    <DataAnnotationsValidator/>

    @if (!string.IsNullOrWhiteSpace(_pageError))
    {
        <div class="alert error mt-8 mb-0">
            @_pageError
        </div>
    }

    <fieldset disabled="@_isProcessing" aria-busy="@_isProcessing">

    </fieldset>
</EditForm>

@code {
    ...

    private async void AddBrand(EditContext editContext)
    {

    }
}
```

Blazor has a handy [EditForm](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform) component that we can use. We want to pass in our model and what method we want to call when the form submits.

We then add the `<DataAnnotationsValidator/>` to allow us to handle validating the form based on the DataAttributes we added to the model.

Remember above when I talked about the `_pageError` variable? This is what I mean. I have it in an if statement so that if there is an error, it gets displayed to the user.

I'm using a `<fieldset>` to wrap the form in. This is handy because I can disable all controls in the fieldset by setting the `disabled` attribute. This is what I use the `_isProcessing` variable for. This will help prevent duplicate submissions with accidental double clicks.

In the code section, I also added an empty function, `AddBrand(EditContext editContext)` to support the form.

## Building the Form Controls

Next, let's add the form controls.

```razor Add.razor
<fieldset disabled="@_isProcessing" aria-busy="@_isProcessing">
    <div class="my-8">
        <label for="name" class="mb-8">
            <div class="pb-2 font-semibold">Name</div>
            <InputText type="text" id="name" DisplayName="Name" @bind-Value="@_model.Name" maxlength="150" />
            <ValidationMessage For="@(() => _model.Name)"></ValidationMessage>
        </label>
    </div>

    <div class="my-8">
        <label for="cardTypeId" class="mb-8">
            <div class="pb-2 font-semibold">Type</div>
            <InputSelect type="text" id="cardTypeId" DisplayName="Type" @bind-Value="@_model.CardTypeId">
                <option value="1">Baseball</option>
                <option value="2">Football</option>
            </InputSelect>
            <ValidationMessage For="@(() => _model.CardTypeId)"></ValidationMessage>
        </label>
    </div>

    <div class="mt-8">
        <button type="submit">Add Brand</button>
        <a class="btn-secondary ml-2" href="/brands">Cancel</a>
    </div>
</fieldset>
```

For the name field, I use the `<InputText>` component. This will render a standard text input (`<input type="text" />`) field. Using the `@bind-value` attribute I tell it to bind to `_model.Name`.

For the card type field, I use the `<InputSelect>` control to render an HTML dropdown. I again use the `@bind-value` attribute to bind it to `_model.CardTypeId`. I then provide the two options for football and baseball.

Underneath each of the controls, I provide the `<ValidationMessage>` component to display any validation errors for the field.

The final piece is the submit button that will call the `AddBrand` function that we defined in the `<EditForm>` component.

## Processing the Form Submission

Finally, let's add the form processing to actually save the form contents to the database.

```razor Add.razor
@code {
    ...

    private async void AddBrand(EditContext editContext)
    {
        _isProcessing = true;
        _pageError = string.Empty;

        if (!editContext.Validate())
        {
            _isProcessing = false;
            return;
        }

        try
        {
            await BrandRespository.Add(new Brand
            {
                Name = _model.Name,
                CardType = (Constants.CardType)_model.CardTypeId,
            });

            NavigationManager.NavigateTo("/brands", true);

            _isProcessing = false;
        }
        catch (Exception e)
        {
            _pageError = e.Message;
            _isProcessing = false;
            StateHasChanged();
        }
    }
}
```

The first thing I want to do is set the processing flag to true and reset the error state in case there was an error on the previous submission attempt.

The next thing I want to do is validate the form. I can use the context to validate the model against the data attributes I provide in the model. If the values entered are invalid, the errors will be displayed under the form controls in the `<ValidationMessage>` component, the processing flag will be turned off, and the user can correct their mistakes.

If the form is valid, the code will go about using the BrandRepository to add the brand and then navigate to the brands index page. If there are any errors, the catch statement will halt the processing and display the error to the user.

## Final Result

```razor Add.razor
@page "/brands/add"

@using CardOrganizer.ViewModels
@using CardOrganizer.Domain

@inject IBrandRespository BrandRespository
@inject NavigationManager NavigationManager

<PageTitle>Add New Brand | Card Organizer</PageTitle>

<main class="block small">
    <div class="bg-white rounded-lg border-2 border-primary p-8">
        <h1 class="text-3xl">Add Brand</h1>
        <EditForm Model="@_model" OnSubmit="@AddBrand">
            <DataAnnotationsValidator/>

            @if (!string.IsNullOrWhiteSpace(_pageError))
            {
                <div class="alert error mt-8 mb-0">
                    @_pageError
                </div>
            }

            <fieldset disabled="@_isProcessing" aria-busy="@_isProcessing">
                <div class="my-8">
                    <label for="name" class="mb-8">
                        <div class="pb-2 font-semibold">Name</div>
                        <InputText type="text" id="name" DisplayName="Name" @bind-Value="@_model.Name" maxlength="150" />
                        <ValidationMessage For="@(() => _model.Name)"></ValidationMessage>
                    </label>
                </div>

                <div class="my-8">
                    <label for="cardTypeId" class="mb-8">
                        <div class="pb-2 font-semibold">Type</div>
                        <InputSelect type="text" id="cardTypeId" DisplayName="Type" @bind-Value="@_model.CardTypeId">
                            <option value="1">Baseball</option>
                            <option value="2">Football</option>
                        </InputSelect>
                        <ValidationMessage For="@(() => _model.CardTypeId)"></ValidationMessage>
                    </label>
                </div>

                <div class="mt-8">
                    <button type="submit">Add Brand</button>
                    <a class="btn-secondary ml-2" href="/brands">Cancel</a>
                </div>
            </fieldset>
        </EditForm>
    </div>
</main>

@code {
    private readonly AddBrandViewModel _model = new();
    private bool _isProcessing;
    private string _pageError = string.Empty;

    private async void AddBrand(EditContext editContext)
    {
        _isProcessing = true;
        _pageError = string.Empty;

        if (!editContext.Validate())
        {
            _isProcessing = false;
            return;
        }

        try
        {
            await BrandRespository.Add(new Brand
            {
                Name = _model.Name,
                CardType = (Constants.CardType)_model.CardTypeId,
            });

            NavigationManager.NavigateTo("/brands", true);

            _isProcessing = false;
        }
        catch (Exception e)
        {
            _pageError = e.Message;
            _isProcessing = false;
            StateHasChanged();
        }
    }
}
```

---

Hopefully this helps you understand the basics of forms in Blazor. You can [read more about them on Microsoft's site](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms-and-input-components?view=aspnetcore-7.0) and you can view the entire code for this project (it's still a work in progress) on [GitHub](https://github.com/kpwags/card-organizer). If you have any questions or comments, by all means reach out.