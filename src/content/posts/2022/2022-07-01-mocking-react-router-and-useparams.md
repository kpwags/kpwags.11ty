---
title: 'Mocking React Router and useParams'
date: '2022-07-01'
permalink: /posts/2022/07/01/mocking-react-router-and-useparams/index.html
tags:
  - Development
  - Unit Tests
  - React
---

One of the things I needed to do recently was write unit tests for one of the pages of Digital Family Cookbook where I pull a value from a query parameter in the URL. I ended up having some trouble with it so I figured I'd share what I did to get it working.
<!-- excerpt -->

First, let's look at the component. In the component, I'm looking to get the recipe's ID from the URL and then query the API to get the recipe data. The URL is formatted like `/recipes/view/:id` where `:id` indicates the recipe's ID. An actual URL would be `/recipes/view/25`.

```typescript
import { useParams } from 'react-router';

const { id } = useParams();

const fetchRecipe = async () => {
    if (!id) {
        setErrorMessage('Error loading recipe');
        setPageState(PageState.Error);
        return;
    }

    const [data, error] = await Api.Get<Recipe>(`recipes/get?id=${id}`);

    if (error) {
        setErrorMessage(error);
        setPageState(PageState.Error);
        return;
    }

    setRecipe(data);
    setPageState(PageState.Ready);
};
```

In the code, I use the `useParams()` hook to get the ID and I use it in the `fetchRecipe()` function to query the API.

This worked well, but I also needed to write unit tests for this which means that I need to be able to get the ID when there isn't a URL to pull from. Enter some Jest magic.

```typescript
import Router from 'react-router';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
}));

describe('<ViewRecipe />', () => {
    test('It renders the recipe', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

        renderWithRouter(
            <MockAppProvider user={MockUserAccount}>
                <ViewRecipe />
            </MockAppProvider>,
        );

        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

        expect(screen.queryByText(/Test Recipe 01/)).toBeInTheDocument();
    });
});
```

At the top we setup the mock for `react-router`. We tell it to use the actual module, but then replace the `useParams()` hook with a mock function since we need to adjust what it returns.

In the test, we then tell jest to spy on the router component and watch for `useParams()` to be called. The spy will then pay attention to if and when it is called, and if it is, return the mocked value of `{ id: '1' }`.

Now when the `ViewRecipe` component is rendered the `useParams()` hook will return an ID of 1 for the test. The cool part about this is that we can set the spy in every test to return a different value for the test. I use [Mock Service Worker](https://kpwags.com/posts/2021/02/03/unit-testing-with-msw) to mock my API calls, so the different ID values can trigger different data returns.

So there you go, a nice easy way to write tests when your components rely on React Router and the `useParams()` hook.