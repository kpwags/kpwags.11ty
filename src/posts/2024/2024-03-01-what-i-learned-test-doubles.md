---
title: 'What I Learned: Test Doubles'
date: '2024-03-01'
permalink: /posts/2024/03/01/what-i-learned-test-doubles/index.html
tags:
  - What I Learned
  - Testing
  - Unit Tests
  - Development
---

I recently read an article by Steve Dunn, [Prefer test-doubles over mocking frameworks](https://dunnhq.com/posts/2024/prefer-test-doubles-over-mocking/) and it got me reconsidering some of my unit testing strategies.
<!-- excerpt -->

## Mocking

With .NET unit tests, most of the time I would end up writing mocks for the test's dependencies. Here's an example using the Moq libary. This is for my [Digital Family Cookbook project](https://github.com/kpwags/digital-family-cookbook) and the test can be found [here](https://github.com/kpwags/digital-family-cookbook/blob/main/backend/tests/DigitalFamilyCookbook.Tests/Handlers/Queries/Meats/GetAllMeatsTests.cs)

```csharp
[Fact]
public async Task ItSuccessfullyReturnsAllMeats()
{
	var meats = MockMeat.GenerateMeatList(6);

	var meatRepository = new Mock<IMeatRepository>();
	meatRepository
		.Setup(m => m.GetAll())
		.Returns(meats);

	var handler = new GetAllMeats.Handler(meatRepository.Object);

	var result = await handler.Handle(new GetAllMeats.Query(), new CancellationToken());

	Assert.Equal(6, result.Value?.Count);
}
```

This is a test to make sure the Get All Meats handler properly returns the correct number of meats.

The mock repository object is defined as follows.

```csharp
var meatRepository = new Mock<IMeatRepository>();
meatRepository
	.Setup(m => m.GetAll())
	.Returns(meats);
```

It basically sets up the repository to return the random meat list I created in the test setup.

This is fine, and for a simple test, it can probably be considered "good enough". But for more complicated methods, dealing with mocks can get troublesome fast.

Let's change it to use test doubles instead. Let’s take a quick look at the `IMeatRepository` interface

```csharp
public interface IMeatRepository
{
	Meat Get(int meatId);

	IEnumerable<Meat> GetAll();

	Task<Meat> Add(Meat meat);

	Task<Meat> Update(Meat meat);

	Task Delete(int meatId);

	IEnumerable<Meat> GetForRecipe(int recipeId);
}
```

It’s a relatively simple interface. Just some CRUD (Create, Read, Update, Delete) methods. Let’s create a new implementation to use as a test double for it.

The first thing we want to do is create a list of meats to use as the “database”. I’ll create 5 meats, that should be enough to test with.

```csharp
public class TestingMeatRepository : IMeatRepository
{
	private readonly List<Meat> _meats = new()
	{
		new Meat { MeatId = 1, Name = "Beef" },
		new Meat { MeatId = 2, Name = "Chicken" },
		new Meat { MeatId = 3, Name = "Pork" },
		new Meat { MeatId = 4, Name = "Fish" },
		new Meat { MeatId = 5, Name = "Vegetarian" },
	};
}
```

Now let’s add the methods.

```csharp
public class TestingMeatRepository : IMeatRepository
{
	private readonly List<Meat> _meats = new()
	{
		new Meat { MeatId = 1, Name = "Beef" },
		new Meat { MeatId = 2, Name = "Chicken" },
		new Meat { MeatId = 3, Name = "Pork" },
		new Meat { MeatId = 4, Name = "Fish" },
		new Meat { MeatId = 5, Name = "Vegetarian" },
	};

	public Meat Get(int meatId)
	{
		var meat = _meats.FirstOrDefault(m => m.MeatId == meatId);

		if (meat is null)
		{
			throw new Exception("Meat not found");
		}

		return meat;
	}

	public IEnumerable<Meat> GetAll()
	{
		return _meats;
	}

	public async Task<Meat> Add(Meat meat)
	{
		if (_meats.Select(m => m.Name).Contains(meat.Name))
		{
			throw new Exception("Meat already exists");
		}

		return await Task.FromResult(new Meat
		{
			MeatId = 7,
			Name = meat.Name,
		});
	}

	public async Task<Meat> Update(Meat meat)
	{
		if (_meats.Any(m => m.Name.ToLower() == meat.Name.ToLower() && m.MeatId != meat.MeatId))
		{
			throw new Exception("Meat already exists");
		}

		return await Task.FromResult(meat);
	}

	public Task Delete(int meatId)
	{
		if (!_meats.Select(m => m.MeatId).Contains(meatId))
		{
			throw new Exception("Meat not found");
		}

		return Task.CompletedTask;
	}

	public IEnumerable<Meat> GetForRecipe(int recipeId)
	{
		return _meats.Where(m => m.MeatId == 3);
	}
}
```

As you can see, I've added all the methods and this can act as a double for the database for the tests.

So now let's revisit the test.

```csharp
[Fact]
public async Task ItSuccessfullyReturnsAllMeats()
{
	var meats = MockMeat.GenerateMeatList(6);

	var meatRepository = new TestingMeatRepository();

	var handler = new GetAllMeats.Handler(meatRepository);

	var result = await handler.Handle(new GetAllMeats.Query(), new CancellationToken());

	Assert.Equal(5, result.Value?.Count);
}
```

Instead of having to mock the repository for each test, and adjust as requirements might change, we can now just use this test double instead.

This test repository can be used for multiple tests and it would be more stable for the tests when needed.