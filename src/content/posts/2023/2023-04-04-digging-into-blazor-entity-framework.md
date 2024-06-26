---
title: 'Digging Into Blazor - Integrating with Entity Framework'
date: '2023-04-04'
permalink: /posts/2023/04/04/digging-into-blazor-entity-framework/index.html
tags:
  - .NET
  - C#
  - Blazor
  - Entity Framework
  - Web Development
  - Development
---

Now that I was getting my feet wet, it was time for me to start laying out the framework for my first real Blazor project. Step one was to get the database setup.
<!-- excerpt -->

This is the second post in a multi-part series. If you haven't read part one, you can [read about my first impressions](https://kpwags.com/posts/2023/03/19/digging-into-blazor-first-impressions).

<section class="blog-series">
    <h4>Series: Digging into Blazor</h4>
    <ul class="posts">
        <li class="post"><a href="/posts/2023/03/19/digging-into-blazor-first-impressions">First Impressions</a></li>
        <li class="post"><span class="current">Integrating with Entity Framework</span></li>
        <li class="post"><a href="/posts/2023/07/31/blazor-custom-authentication">Setting Up Custom Authentication</a></li>
        <li class="post"><a href="/posts/2023/09/29/digging-into-blazor-forms">Forms</a></li>
    </ul>
</section>

I had already decided to use Entity Framework to interact with my SQL server. I have used Entity Framework plenty in the past so I was familiar with the basics. If you haven't used Entity Framework, I would highly recommend reading about it and going through some tutorials. Microsoft provides some [great documentation](https://learn.microsoft.com/en-us/ef/core/).

The first thing I did was look into how to use [Entity Framework with Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/blazor-server-ef-core?view=aspnetcore-7.0).

> In Blazor Server apps, scoped service registrations can be problematic because the instance is shared across components within the user's circuit.

Well that's different.

I quickly realized that things were a little different, but following their setup, I worked to make sure that each interaction would operate in its own context. Reading more I found out that Microsoft recommended I use a factory to help. I added the DB Factory to my `Program.cs` file. The nice part is that it's very similar to how I configure it in my other projects.

```csharp
// Program.cs

builder.Services.AddDbContextFactory<ApplicationDbContext>(opt =>
    opt.UseSqlServer(configuration.GetConnectionString("Main")));
```

Setting up my models worked the same way as [Digital Family Cookbook](https://github.com/kpwags/digital-family-cookbook).

Let's create my first database table and model. Each of my baseball cards are going to need a brand (think Topps, Donruss, or Upper Deck).

```csharp
// BrandDto.cs

namespace CardOrganizer.Domain.Dtos;

public class BrandDto
{
    public int BrandId { get; set; }

    public string Name { get; set; } = string.Empty;

    public int CardTypeId { get; set; }

    public bool IsActive { get; set; } = true;

    public List<BaseballCardDto> BaseballCards { get; set; } = new List<BaseballCardDto>();
}
```

Now let's actually create the app's database context.

```csharp
// ApplicationDbContext.cs

namespace CardOrganizer.Infrastructure.Database;

public class Role : IdentityRole<int> {}

public class ApplicationDbContext : IdentityDbContext<UserAccountDto, IdentityRole<int>, int>
{
    public DbSet<BrandDto> Brands { get; set; }

    public DbSet<BaseballCardDto> BaseballCards { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

	protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasDefaultSchema("application");

		#region "Brand"
        builder.Entity<BrandDto>()
            .ToTable("Brand", schema: "card");

        builder.Entity<BrandDto>()
            .HasKey(b => b.BrandId)
            .HasName("PK_Card_Brand");

        builder.Entity<BrandDto>()
            .Property(b => b.CardTypeId)
            .IsRequired();

        builder.Entity<BrandDto>()
            .Property(b => b.Name)
            .HasMaxLength(150)
            .IsRequired();
        #endregion "Brand"
	}
}
```

You can ignore the `Role` and `Identity` declarations as I'll get into those in the next post, but it was familiar to me to use the [Fluent API](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/fluent/types-and-properties) to build the model that Entity Framework will use to build the tables in the database.

To build the database, I used the standard EF terminal commands

```bash
$ dotnet ef migrations add AddBrandModels
```

And then once that succeeded:

```bash
$ dotnet ef database update
```

Now that the database was built, I can interact with the database using the `IDbContextFactory` I added to my `Program.cs` file above.

```csharp
// BrandRepository.cs

namespace CardOrganizer.Infrastructure.Repositories;

public class BrandRepository : IBrandRespository
{
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

    public BrandRepository(IDbContextFactory<ApplicationDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public Brand GetById(int brandId)
    {
        var dbContext = _contextFactory.CreateDbContext();

        var brand = dbContext.Brands.FirstOrDefault(b => b.BrandId == brandId);

        if (brand is null)
        {
            throw new ObjectNotFoundException("Unable to find the specified brand");
        }

        return Brand.FromDto(brand);
    }
}
```

You can see in the constructor, I use dependency injection to inject the DbContextFactory to use in the repo, so that in any method I need access to the DB, I can easily create a new DB context by:

```csharp
var dbContext = await _contextFactory.CreateDbContextAsync();
```

From there on, there's no real difference between using Entity Framework in a Blazor app or a .NET Web API.

The one thing you might also notice is that I don't have the repository return the DTO (Data Transfer Object) from the repository. Instead I have it return the domain model. My reasoning for that is that I want any extra logic I might need in the model separate from the model that gets saved and retrieved from the database. For the `Brand` domain model, the `FromDto` function is pretty simple.

```csharp
public static Brand FromDto(BrandDto dto) => new Brand
{
    BrandId = dto.BrandId,
    Name = dto.Name,
    CardType = (Constants.CardType)dto.CardTypeId,
    IsActive = dto.IsActive,
};
```

In the next post, my plan is to dig into dealing with authentication in Blazor. It was probably the biggest stumbling block I faced so far.