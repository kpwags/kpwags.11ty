---
title: 'Setting Up GitHub Actions on .NET Projects'
date: '2022-02-19'
permalink: /posts/2022/02/19/setting-up-github-actions-on-net-projects/index.html
tags:
  - Development
  - .NET
  - Coding
  - GitHub
  - Git
---

After seeing Git Actions at work at my job, I decided that I wanted to see what I could do for my personal projects with GitHub Actions.
<!-- excerpt -->

At work in order for our PRs to be completed, our code needs to match our ESLint guidelines and our unit tests need to pass. I like those rules so I wanted to apply them to my personal projects on GitHub. I knew GitHub had the ability to do the same thing so I sat down and taught myself how to set them up. A little while later, I was able to get them up and running and am quite happy with the results so I figured I’d share how I did it.

## Some Background

I set this up for my re-write of <a href="https://github.com/kpwags/digital-family-cookbook" target="_blank" rel="noreferrer">Digital Family Cookbook in .NET</a>. I have my backend broken up into 3 projects.

1. The Web API (DigitalFamilyCookbook)
2. A “Core” Class Library (DigitalFamilyCookbook.Core)
3. A “Data” Class Library (Digital Family Cookbook.Data)

I have a separate .NET Unit Test project for the Web API and the core class library. One for the data class library will be added soon. Because of this, I ended up creating two actions, one to run the API unit tests, and a second to run the core library unit tests.

### Step 1: Create the Workflows Folder

In your root directory create a folder named `.github` and inside that folder create a folder named `workflows`.

### Step 2: Create an Action

Create a file called `unittests.yml`

### Step 3: Build the Action

Start by giving the action a name

```yaml
name: DigitalFamilyCookbook Unit Tests
```

This is pretty self-explanatory. We want each action to have a name that is descriptive of what the action does.

Next, we want to define when we want the action to be run.

```yaml
on:
    push:
        branches: [main]
    pull_request:
        branches: [main]
```

This tells GitHub that we want these actions run when we push code to the main branch (I don't really do this, but put it here anyway), or when a pull request is submitted against the main branch.

Finally, we want to set up the action itself.

```yaml
jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v2
            - name: Setup .NET
              uses: actions/setup-dotnet@v1
              with:
                  dotnet-version: 6.0.x
            - name: Restore dependencies
              run: dotnet restore
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
            - name: Build
              run: dotnet build --no-restore
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
            - name: Test
              run: dotnet test --no-build --verbosity normal
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
```

Let's look at how this is structured.

1. We tell GitHub to run this on the latest version of Ubuntu.
2. Next, we define the steps to take to run the action. Each bullet point is basically a step in the process
    1. `uses: actions/checkout@v2` is the official GitHub action that will checkout the code in order to run the actions we define
    2. `name: Setup .NET` is the name of this step which we use the official GitHub action to setup .NET for the action, specifying we want to use .NET 6. This is important as I am taking advantage of some of the new .NET 6 functionality that will break on previous versions.
    3. `name: Restore dependencies` is where we tell the action to install the project's dependencies. you can see the next line defines the actual command. Just like we'd do in the terminal on our own machine. We tell the action to run `dotnet restore` The final part is to specify the directory to run this command in. Since I'm running the tests for the API project, we specify it as `./backend/tests/DigitalFamilyCookbook.Tests` which is the path from the root of the repository to where the `.csproj` defining the unit test project lies.
    4. `name: Build` is where we tell the action to build the project, again just like we'd do in our terminal. Again, we need to specify the working folder.
    5. `name: Test` is where the butter is at. This tells us to run the test command to execute our unit tests. Like the `restore` and `build` steps, we also need to specify the working folder here as well.

### Final Result

```yaml
name: DigitalFamilyCookbook Unit Tests

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v2
            - name: Setup .NET
              uses: actions/setup-dotnet@v1
              with:
                  dotnet-version: 6.0.x
            - name: Restore dependencies
              run: dotnet restore
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
            - name: Build
              run: dotnet build --no-restore
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
            - name: Test
              run: dotnet test --no-build --verbosity normal
              working-directory: ./backend/tests/DigitalFamilyCookbook.Tests
```

That's it. It was not nearly as difficult to setup as I initially thought. Now whenever I open a pull request, it will run the unit tests and make sure they pass before I can complete it and merge it with the main branch. I ended up creating a second action file and run the same steps, only with the `DigitalFamilyCookbook.Core.Tests` project.

## Bonus: Run the React Unit Tests Too!

As an added bonus, I'll add how I set up the action to run Jest for the frontend unit tests.

```yaml
name: Front End Unit Tests

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest

        strategy:
            matrix:
                node-version: [15.x]

        steps:
            - uses: actions/checkout@v2
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v1
              with:
                  node-version: ${{ matrix.node-version }}
            - run: npm install
              working-directory: ./frontend
            - run: npm run test
              working-directory: ./frontend
```

It's very similar to the .NET actions, only in this case we specify the node version instead of .NET, and run the npm commands in the frontend directory.
