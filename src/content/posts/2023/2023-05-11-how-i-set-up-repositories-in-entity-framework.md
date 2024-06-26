---
title: 'How I Set Up Repositories in Entity Framework'
date: '2023-05-11'
permalink: /posts/2023/05/11/how-i-set-up-repositories-in-entity-framework/index.html
tags:
  - Entity Framework
  - .NET
  - C#
  - Development
rss_only: true
---

*This post is for the [Secret RSS Club Readers](https://kpwags.com/posts/2022/08/15/welcome-to-the-rss-club).*
<!-- excerpt -->

Ever since I built _Where Do You Want to Eat 2_ I’ve been building repository classes to interact with Entity Framework and the database in a very similar manner. Since much of my interactions are relatively simple CRUD (Create, Read, Update, & Delete) operations, having a standard method to interact makes a lot of sense.

For just about every database object, I need to be able to perform one of five operations.

1. I need to be able to get a specific object by its ID.
2. I need to be able to return a list of all the objects.
3. I need to be able to add a new object.
4. I need to be able to update an existing object.
5. I need to be able to delete an object.

It seems like an interface would be nice to have to support this. It would help with mocking for unit tests and it would also help ensure that I build out all the CRUD functionality.

So let’s use .NET’s generic types to build out an interface that I can use.

```cs IRepository.cs
public interface IRepository<T>
{
    T GetById(int id);

    IQueryable<T> GetAll();

    Task<int> Add(T entity);

    Task Update(T entity);

    Task Delete(int id);
}
```

This defines a generic repository for type `T` where `T` can be any class. So if I were to define a repository for the `Brand` object from my [previous post about diving into Entity Framework](https://kpwags.com/posts/2023/04/04/digging-into-blazor-entity-framework) `T` would essentially become `Brand`.

So now, when I want to build a repository for my brand model, I create the following interface.

```cs IBrandRepository.cs
public interface IBrandRespository : IRepository<Brand>
{
    IEnumerable<Brand> GetBrandsOfType(Constants.CardType cardType);
}
```

Because `IBrandRepository` inherits from `IRepository<Brand>`, any classes that implement the interface must implement all the methods defined in `IRepository<Brand>` and also the `GetBrandsOfType` method from `IBrandRepository` as well.

For reference, here’s my brand model.

```cs Brand.cs
public class Brand
{
    public int BrandId { get; set; }

    public string Name { get; set; } = string.Empty;

    public Constants.CardType CardType { get; set; }

    public bool IsActive { get; set; } = true;
}
```

And here’s my implementation of its interface.

```cs BrandRepository.cs
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

    public IQueryable<Brand> GetAll()
    {
        var dbContext = _contextFactory.CreateDbContext();

        return dbContext.Brands
            .OrderBy(b => b.Name)
            .Select(b => Brand.FromDto(b));
    }

    public async Task<int> Add(Brand brand)
    {
        var dbContext = await _contextFactory.CreateDbContextAsync();

        var newBrand = new BrandDto
        {
            Name = brand.Name,
            IsActive = brand.IsActive,
            CardTypeId = (int)brand.CardType,
        };

        dbContext.Brands.Add(newBrand);

        await dbContext.SaveChangesAsync();

        return newBrand.BrandId;
    }

    public async Task Update(Brand brand)
    {
        var dbContext = await _contextFactory.CreateDbContextAsync();

        var cardBrand = dbContext.Brands.FirstOrDefault(b => b.BrandId == brand.BrandId);

        if (cardBrand is null)
        {
            throw new ObjectNotFoundException("Unable to find the specified brand");
        }

        cardBrand.Name = brand.Name;
        cardBrand.IsActive = brand.IsActive;
        cardBrand.CardTypeId = (int)brand.CardType;

        dbContext.Brands.Update(cardBrand);

        await dbContext.SaveChangesAsync();
    }

    public async Task Delete(int brandId)
    {
        var dbContext = await _contextFactory.CreateDbContextAsync();

        await dbContext.Brands.Where(b => b.BrandId == brandId).ExecuteDeleteAsync();
    }

    public IEnumerable<Brand> GetBrandsOfType(Constants.CardType cardType)
    {
        var dbContext = _contextFactory.CreateDbContext();

        return dbContext.Brands
            .Where(b => b.CardTypeId == (int)cardType)
            .OrderBy(b => b.Name)
            .Select(b => Brand.FromDto(b))
            .AsEnumerable();
    }
}
```

You can see in the constructor, I use dependency injection to inject the DbContextFactory to use in the repo, so that in every action, I can easily create a new DB context by:

```cs
var dbContext = await _contextFactory.CreateDbContextAsync();
```

From there on, there’s no real difference between using Entity Framework in a Blazor app or a .NET Web API.

The one thing you might also notice is that I don’t have the repository return the DTO (Data Transfer Object) from the repository. Instead I have it return the domain model. My reasoning for that is that I want any extra logic I might need in the model separate from the model that gets saved and retrieved from the database. For the `Brand` domain model, the `FromDto` function is pretty simple.

```cs
public static Brand FromDto(BrandDto dto) => new Brand
{
    BrandId = dto.BrandId,
    Name = dto.Name,
    CardType = (Constants.CardType)dto.CardTypeId,
    IsActive = dto.IsActive,
};
```

In the next post, my plan is to dig into dealing with authentication in Blazor. It was probably the biggest stumbling block I faced so far.