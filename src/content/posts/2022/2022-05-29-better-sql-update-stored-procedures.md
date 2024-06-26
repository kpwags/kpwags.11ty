---
title: 'Better SQL Update Stored Procedures'
date: '2022-05-29'
permalink: /posts/2022/05/29/better-sql-update-stored-procedures/index.html
tags:
  - Development
  - SQL
  - Database
---

I'm still surprised it took me so long to figure this out. When I have been creating a SQL update stored procedure, I often ended up creating multiple ones if I was concerned about only updating a subset of the fields of a table. I've finally found a better way to do it.
<!-- excerpt -->

Suppose you have a recipe table with the following columns.

{% image "./images/recipe-table.jpg", "A table representing a recipe laying out the following columns: RecipeId as INT, Name as VARCHAR, Description as VARCHAR, Source as VARCHAR, Time as INT, Ingredients as VARCHAR, Direction as VARCHAR" %}

I used to write the update stored procedure like this

```sql
CREATE PROCEDURE [dto].[UpdateRecipe]
    @RecipeId INT,
    @Name VARCHAR(255),
    @Description VARCHAR(3000),
    @Source VARCHAR(255),
    @Time INT,
    @Ingredients VARCHAR(MAX),
    @Directions VARCHAR(MAX)
AS
BEGIN
    UPDATE [dto].[Recipe] SET
            [Name] = @Name,
            [Description] = @Description,
            [Source] = @Source,
            [Time] = @Time,
            [Ingredients] = @Ingredients,
            [Directions] = @Directions
    WHERE
            [RecipeId] = @RecipeId
END
GO
```

What made this difficult was that you had to pass in each field and can't call the stored procedure missing any parameters. Sure you could give some default values, but then your parameters' default values might overwrite values you really wanted to keep.

Now, I found a better way!

```sql
CREATE PROCEDURE [dto].[UpdateRecipe]
    @RecipeId INT,
    @Name VARCHAR(255) = NULL,
    @Description VARCHAR(3000) = NULL,
    @Source VARCHAR(255) = NULL,
    @Time INT = NULL,
    @Ingredients VARCHAR(MAX) = NULL,
    @Directions VARCHAR(MAX) = NULL
AS
BEGIN
    UPDATE [dto].[Recipe] SET
            [Name] = ISNULL(@Name, [Recipe].[Name]),
            [Description] = ISNULL(@Description, [Recipe].[Description]),
            [Source] = ISNULL(@Source, [Recipe].[Source]),
            [Time] = ISNULL(@Time, [Recipe].[Time]),
            [Ingredients] = ISNULL(@Ingredients, [Recipe].[Ingredients]),
            [Directions] = ISNULL(@Directions, [Recipe].[Directions])
    WHERE
            [RecipeId] = @RecipeId
END
GO
```

By having each parameter default to *null*, we can then make use of the `ISNULL(value, value_if_null)` function. For those unfamiliar, the `ISNULL` function takes 2 arguments. The first argument is the value you want to use. The function will check to see if it is *null*. If it is not null, it will return that value. If it is NULL, then it will return the second argument as the value.

What that means for the procedure is that we can now pass in any subset of parameters we need to, save for `RecipeId` (the primary key) and it will update the table leaving the values not passed to the stored procedures untouched.

The downside is that this only works with Microsoft SQL Server, but since that's what I primarily use, it works out for me. For those using MySQL, you can still use the `ISNULL` function, but it only takes 1 argument and will return 1 (true) or 0 (false) if the value is *null*. You can add that to an IF statement, but it's not quite as clean.

The more you write code, the more you learn!