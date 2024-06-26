---
title: "Integrating with Notion's API Using .NET"
date: '2023-08-09'
permalink: /posts/2023/08/09/integrating-with-notions-api-using-net/index.html
tags:
  - .NET
  - C#
  - Notion
  - Development
---

Over the last year, I’ve been posting my weekly reading log. This is my list of articles and various things on the Internet I’ve read that I found particularly interesting or helpful. The way I’ve started to manage them is through a Notion database.
<!-- excerpt -->

To help smooth the process of converting that Notion database to a markdown file to use on my site, I built a little C# console app to pull the data and build the page. I figured I’d share my insights in hopes to help anyone else that wants to work with Notion’s API in .NET.

For the last several issues, I’ve been populating a Notion database with the different links I want to share on the next reading log. Originally I was just going through the list, copying and pasting the links and info manually into the markdown file that becomes the post on my site. After the double week issue where I had 40+ links, it was starting to get tedious. But then I thought of how I’d been pulling the data on other pages in my site, like my Bookshelf, Games & Movies pages. I decided that I’d try my hand at building the markdown using the API as well. I’m a .NET developer and I figured a .NET Console Application would do the job nicely.

- Title (Title)
- Author (Text)
- Url (URL)
- Category (Select)
- Published (Checkbox)
- Issue (Number)

I started out by creating a new .NET console app.

```bash
> dotnet new console --name ReadingLogGenerator
> cd ReadingLogGenerator
```

I found a library, [Notion SDK for .Net](https://github.com/notion-dotnet/notion-sdk-net) that looked to take out a bunch of the grunt work.

```bash
> dotnet add package Notion.Net
```

I built my `appsettings.json` file to contain both my Notion API key and the database ID for my reading log. I also added an option for where the generated markdown file should be saved to. Basically I don’t want to have to rebuild the application if the configuration changes.

```json
{
  "Notion": {
    "NotionApiKey": "SECRET API KEY",
    "ReadingLogDbId": "DATABASE ID"
  },
  "Directories": {
    "Output": "~/Desktop"
  }
}
```

The next step was for me to create a model for the articles.

```csharp Article.cs
public class Article
{
    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string Url { get; set; } = string.Empty;

    public ReadingLogCategory Category { get; set; } = ReadingLogCategory.Everything;
}
```

One of the things I do for my reading log is break the articles into categories. I figure it might help anyone looking at them be able to focus on the categories they like, while ignoring any they might not be interested in. I created a constants file to hold this, and any other constants that might be added later.

```csharp Constants.cs
public enum ReadingLogCategory
{
    DevelopmentDesign = 1,
    Technology = 2,
    Science = 3,
    Gaming = 4,
    Business = 5,
    Sports = 6,
    Podcasts = 7,
    Everything = 8,
    InDepth = 9,
}
```

So now that I have the model, now it’s time for me to build the nuts and bolts. What I’m looking to have it do is to pull all entries for the issue I specify.

.NET console applications always start in the `Program.cs` file. I’ll start by reading the `appsettings.json` file and loading that into configuration classes.

```csharp Program.cs
namespace ReadingLogGenerator;

internal class Program
{
    private static DirectoriesConfiguration? _directoriesConfiguration;
    private static NotionConfiguration? _notifonConfiguration;
    private static List<Article> _articles = new();

    private static readonly StringBuilder MarkdownBuilder = new ();

    static async Task Main()
    {
        IConfiguration config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .AddEnvironmentVariables()
            .Build();

        _directoriesConfiguration = config.GetRequiredSection("Directories").Get<DirectoriesConfiguration>();
        _notifonConfiguration = config.GetRequiredSection("Notion").Get<NotionConfiguration>();

        if (_directoriesConfiguration is null || _notifonConfiguration is null)
        {
            Console.WriteLine("Unable to read settings");
            return;
        }
    }
}
```

Just for clarity, here are the configuration classes. Basically what I do is I bind the config sections to an instance of the configuration classes.

```csharp DirectoriesConfiguration.cs
namespace ReadingLogGenerator.Configuration;

public class DirectoriesConfiguration
{
    public string Output { get; set; } = string.Empty;
}
```

```csharp NotionConfiguration.cs
namespace ReadingLogGenerator.Configuration;

public class NotionConfiguration
{
    public string NotionApiKey { get; set; } = string.Empty;

    public string ReadingLogDbId { get; set; } = string.Empty;
}
```

As you can see, they match up with the values in the `appsettings.json` file.

Now that the configuration is loaded, the next thing I want to do is prompt the user (myself) to enter the reading log number or the issue number. To do that, I just use the `Console.ReadLine()` method.

```csharp Program.cs
Console.Write("Please Enter Reading Log Number: ");

var logNumberString = Console.ReadLine();

if (!int.TryParse(logNumberString, out int logNumber) || logNumber == 0)
{
    Console.WriteLine("Invalid input");
    return;
}
```

Here, I’m prompting the user to enter the reading log number and then assigning the value to the `logNumberString` variable. I however want that to be in a numeric format, so I use the `int.TryParse()` method to assign it to the variable `logNumber`. If it fails, I alert the user to the error and exit.

I decided that in order to keep `Program.cs` a little cleaner, I was going to put all the Notion logic in it’s own service class.

I created a class called `NotionService`. This class has a constructor that takes the configuration object I created in `Program.cs` and instantiates it like this:

```csharp NotionService.cs
namespace ReadingLogGenerator.Services;

public class NotionService
{
    private readonly NotionConfiguration _notionConfiguration;
    private readonly NotionClient _notionClient;

    public NotionService(NotionConfiguration config)
    {
        _notionConfiguration = config;
        _notionClient = NotionClientFactory.Create(new ClientOptions
        {
            AuthToken = _notionConfiguration.NotionApiKey,
        });
    }
}
```

I create the class and then create the client the primary function will use to query Notion’s API. Notice that I build the client passing in the `AuthToken` from my `NotionConfiguration` object.

Now the one limitation to Notion’s API is that it only returns 50 records at a time. For my reading log, that’s not normally going to be an issue, but I still want to handle it.

This is going to feel like I’m jumping ahead a little bit, because I am, but API calls to notion will return three properties we’ll need to use.

- **Results**: `List<Page>` - this is a list of the pages that match our query
- **HasMore**: `bool` - this indicates whether there are any more results in the query. If this returns true, we’ll need to query the API again.
- **NextCursor**: `string?` - this is a nullable string. If there are more records we have to query, we’ll use this to tell Notion where to start returning results from.

Now that that is out of the way, the primary function I mentioned above is called `GetReadingLogArticles`. It takes the log number or issue number as its parameter and spits out a list of articles.

```csharp NotionService.cs
public async Task<List<Article>> GetReadingLogArticles(int logNumber)
{
    var articles = new List<Article>();

    bool hasMore;
    string? cursor = null;

    return articles;
}
```

The first thing I want to add to the function is default values for both `hasMore` and `cursor`. What this does is setup my loop to continuously fetch records from Notion until Notion tells me there are no more records to fetch.

To keep things cleaner, I created a function specifically to query Notion’s API.

```csharp NotionService.cs
private async Task<PaginatedList<Page>> FetchFromNotion(int logNumber, string? cursor)
{
    var readingLogFilter = new NumberFilter("Issue", equal: logNumber);
    var queryParams = new DatabasesQueryParameters
    {
        Filter = readingLogFilter,
        StartCursor = cursor
    };

    var pages = await _notionClient.Databases.QueryAsync(_notionConfiguration.ReadingLogDbId, queryParams);

    return pages;
}
```

This method takes two parameters, the first is the log or issue number, the second is the cursor as defined above in the `GetReadingLogArticles()` method. By default, the cursor is `null` so the Notion API will start from the beginning.

I then used the library to build a filter, the query params, and use them to then request the data from Notion.

For building the filter, what I’m doing is creating a filter that compares numbers. I’m telling it that I want it to look at the Issue field, and filter it to only return rows where Issue is equal to the log number.

I then take that filter and build a `DatabaseQueryParameters` object with the filter I just built. This is where I assign the cursor.

The final step is to actually query the Notion API. The database query takes 2 arguments. The first is the Database ID (that I have stored in the configuration object), and the second argument are the query parameters I built above. This tells Notion that I want all the records from the database that match the filter, in my case all rows with an issue number matching the log number.

I then return it to the `GetReadingLogArticles()` method.

```csharp NotionService.cs
public async Task<List<Article>> GetReadingLogArticles(int logNumber)
{
    var articles = new List<Article>();

    bool hasMore;
    string? cursor = null;

    do
    {
        var result = await FetchFromNotion(logNumber, cursor);

        // add the results to the list of articles to return
        articles.AddRange(MapNotionResultsToArticles(result.Results));

        hasMore = result.HasMore;
        cursor = result.NextCursor;
    } while (hasMore);

    return articles;
}
```

As you can see, I’m using a `do-while` loop to handle this. I always want it to query Notion at least once. And after it adds the retrieved articles to the output list, it will assign the `HasMore` and `NextCursor` return values to the values I defaulted above the loop. Chances are there won’t be any more results, but if there are, it will make another call to Notion, add the records, and re-assign the variables until `HasMore` comes back as `false`.

The final part you see there is the `MapNotionResultsToArticles()` method I built.

```csharp NotionService.cs
private List<Article> MapNotionResultsToArticles(List<Page> results)
{
    var articles = new List<Article>();

    foreach (var page in results)
    {
        var title = page.Properties.FirstOrDefault(p => p.Key.ToLower() == "title");
        var author = page.Properties.FirstOrDefault(p => p.Key.ToLower() == "author");
        var url = page.Properties.FirstOrDefault(p => p.Key.ToLower() == "url");
        var category = page.Properties.FirstOrDefault(p => p.Key.ToLower() == "category");

        var titleValue = title.Value as TitlePropertyValue;
        var authorValue = author.Value as RichTextPropertyValue;
        var urlValue = url.Value as UrlPropertyValue;
        var categoryValue = category.Value as SelectPropertyValue;

        articles.Add(new Article
        {
            Title = titleValue?.Title?.FirstOrDefault()?.PlainText ?? "",
            Author = authorValue?.RichText?.FirstOrDefault()?.PlainText ?? "",
            Url = urlValue?.Url ?? "",
            Category = GetCategoryFromNotionCategory(categoryValue?.Select.Name.ToLower() ?? ""),
        });
    }

    return articles;
}

private ReadingLogCategory GetCategoryFromNotionCategory(string category) => category switch
{
    "software development & design" => ReadingLogCategory.DevelopmentDesign,
    "technology & the internet" => ReadingLogCategory.Technology,
    "science" => ReadingLogCategory.Science,
    "gaming" => ReadingLogCategory.Gaming,
    "business & finance" => ReadingLogCategory.Business,
    "sports" => ReadingLogCategory.Sports,
    "podcasts" => ReadingLogCategory.Podcasts,
    "in depth" => ReadingLogCategory.InDepth,
    _ => ReadingLogCategory.Everything,
};
```

There’s a fair amount to unpack here so let’s go. The method takes a single argument of a list of pages returned from Notion and I want it to go through those results and map each result to an instance of my class `Article`.

The first thing I have it do is for each page in the results, I grab the four properties I want (Title, Author, URL, & Category) by using LINQ to query the properties by their key.

```csharp
var title = page.Properties.FirstOrDefault(p => p.Key.ToLower() == "title");
```

What this does is it goes through the page’s properties and grabs the first one where the key matches the property I’m looking for, in this case, “Title”. To prevent any cast confusion, I convert the key to lower case for comparison.

The next part is a little long in the teeth so to speak. The different properties have different types so each one has a specific format. Thankfully the `Notion.Net` library has classes for each one.

Basically what I want to do is create objects for each one and cast each one to their appropriate class.

```csharp
var titleValue = title.Value as TitlePropertyValue;
var authorValue = author.Value as RichTextPropertyValue;
var urlValue = url.Value as UrlPropertyValue;
var categoryValue = category.Value as SelectPropertyValue;
```

From there, I can build the Article object with the values from the objects. I do put some null-condition operators in place to protect against the unlikely chance that I forget a value in a row.

```csharp
articles.Add(new Article
{
    Title = titleValue?.Title?.FirstOrDefault()?.PlainText ?? "",
    Author = authorValue?.RichText?.FirstOrDefault()?.PlainText ?? "",
    Url = urlValue?.Url ?? "",
    Category = GetCategoryFromNotionCategory(categoryValue?.Select.Name.ToLower() ?? ""),
});
```

That function call `GetCategoryFromNotionCategory()` is my way of converting the string I get from Notion, and assigning the appropriate enum value.

This code builds the `Article` object and then adds it to the list to be returned at the end of the function.

This list of articles is then sent back to the `GetReadingLogArticles()` method to be added to the master list to return back to `Program.cs`. If there are more results, we’ll query Notion again, if not we’ll continue on.

Let’s go back to `Program.cs` and finish up.

```csharp Program.cs
var notionService = new NotionService(_notifonConfiguration);

_articles = await notionService.GetReadingLogArticles(logNumber);

var markdown = GetMarkdownString(logNumber);
```

We now have the full list of articles that are part of this reading log. Our queries to Notion’s API are over and done with. Now we need to output the results.

I’m not going to lie, this last part is a little clunky and there might be better ways to do it, but this currently works well enough for me. I created a method called `GetMarkdownString()` which takes the log or issue number and builds the markdown string that I’ll need for my site.

```csharp Program.cs
private static string GetMarkdownString(int logNumber)
{
    MarkdownBuilder.AppendLine("---");
    MarkdownBuilder.AppendLine($"title: 'Reading Log - {DateTime.Now.ToString("MMMM d, yyyy")} (#{logNumber})'");
    MarkdownBuilder.AppendLine($"date: '{DateTime.Now.ToString("yyyy-MM-dd")}'");
    MarkdownBuilder.AppendLine("tags: ['Reading Log']");
    MarkdownBuilder.AppendLine("commentIssueNumber: GITHUB_COMMENTS_ISSUE_NUM");
    MarkdownBuilder.AppendLine("---");

    MarkdownBuilder.AppendLine("");
    MarkdownBuilder.AppendLine("Introduction Text");
    MarkdownBuilder.AppendLine("");

    if (_articles.Any(a => a.Category == ReadingLogCategory.InDepth))
    {
        MarkdownBuilder.AppendLine("## In Depth");
        MarkdownBuilder.AppendLine("");

        AddLinks(_articles.Where(a => a.Category == ReadingLogCategory.InDepth));
    }

    MarkdownBuilder.AppendLine("## Link Blast");
    MarkdownBuilder.AppendLine("");

    AddSection(ReadingLogCategory.DevelopmentDesign, "👨🏼‍💻Software Development & Design");
    AddSection(ReadingLogCategory.Technology, "🖥 Technology & the Internet");
    AddSection(ReadingLogCategory.Science, "🔬 Science");
    AddSection(ReadingLogCategory.Gaming, "🎮 Gaming");
    AddSection(ReadingLogCategory.Business, "📈 Business & Finance");
    AddSection(ReadingLogCategory.Sports, "⚾️ Sports");

    if (_articles.Any(a => a.Category == ReadingLogCategory.Podcasts))
    {
        MarkdownBuilder.AppendLine("### 🎧 Podcasts");
        MarkdownBuilder.AppendLine("");

        foreach (var article in _articles.Where(a => a.Category == ReadingLogCategory.Podcasts))
        {
            MarkdownBuilder.AppendLine($"[{article.Author}: {article.Title}]({article.Url})");
            MarkdownBuilder.AppendLine("");
        }

        MarkdownBuilder.AppendLine("---");
        MarkdownBuilder.AppendLine("");
    }

    AddSection(ReadingLogCategory.Everything, "🎒 Everything Else");

    MarkdownBuilder.AppendLine("🎵 A Song to Leave You With");
    MarkdownBuilder.AppendLine("");
    MarkdownBuilder.AppendLine("#### Artist - Song");
    MarkdownBuilder.AppendLine("");

    return MarkdownBuilder.ToString();
}

private static void AddSection(ReadingLogCategory category, string title)
{
    if (_articles.Any(a => a.Category == category))
    {
        MarkdownBuilder.AppendLine($"### {title}");
        MarkdownBuilder.AppendLine("");

        AddLinks(_articles.Where(a => a.Category == category));

        MarkdownBuilder.AppendLine("---");
        MarkdownBuilder.AppendLine("");
    }
}

private static void AddLinks(IEnumerable<Article> articles)
{
    foreach (var article in articles)
    {
        MarkdownBuilder.AppendLine($"[{article.Title}]({article.Url}) - *{article.Author}*");
        MarkdownBuilder.AppendLine("");
    }
}
```

To start, this builds out the front matter my site uses to lay out the header, and other information. I’ve built this with the assumption I’m going to run it on the date I’m posting so the current date will fit in for the front matter.

I then go through all the categories and add the links for each category. The “In Depth” and “Podcasts” are formatted slightly differently so I don’t send them through the normal methods, but for each article I output the markdown in its appropriate format.

At this point, the markdown is built, all that’s left is to output it to the `mdx` file I use for my site.

```csharp Program.cs
var markdown = GetMarkdownString(logNumber);

var path = Path.Join(_directoriesConfiguration.Output, $"{logNumber}.mdx");

await using var sw = new StreamWriter(path, true);

await sw.WriteAsync(markdown);
```

This is the final step, I open up a `StreamWriter` and write the markdown stream to the file in the directory specified in the `appsettings.json` file. At this point in my process, all I have to do is add the song of the week, and generate the issue number for the post’s comments. I could probably automate that at some point too, but for the moment, it’s easy enough to enter that part. The hard part of generating all the links is already done.

I hope this helps someone figure out how to tie one of their .NET apps into Notion’s API.

___
I’ll end with this little anecdote. When I started writing this post, I had not taken into account the idea that I could have more than 50 articles in any given reading log. But then I remembered that one of my double issues had an article count in the 40s. Because of this, I put a pause on the writing of this post to go and fix the app to support the do-while loop to ensure that if the article ever crosses the 50 article return, I’d make an additional call to get the rest of them. I figure it won’t happen often, but I could totally imagine me having 51 articles for an issue and missing that one row was missing.

Some have said that writing helps you learn what you’re writing about. I suppose this adds to that thought.

You can view the full project on [GitHub](https://github.com/kpwags/reading-log-generator).