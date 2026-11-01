---
title: "Reading User Input in a Node.js Console Application"
subtitle: ""
description: "As someone who has primarily developed console application in .NET, I only learned how to do this relatively recently, figured I'd share."
date: '2026-09-01T13:41:00.000Z'
permalink: /posts/2026/reading-user-input-in-a-nodejs-console-application/index.html
rss_only: false
pinned: false
spoilers: false
tags:
  - Node.js
  - Console Applications
  - Development
---
This might seem like something that is pretty obvious, but as someone who has primarily developed console application in .NET, I only learned how to do this relatively recently.
<!-- excerpt -->

I recently rewrote my site content generator into Node.js to keep it better tied to my personal site rather than its own repository. One one thing I had never done with Node was to read user-entered data. I had written plenty of scripts to do various tasks, as well as an API server for my media repository. I had never needed to ask the user for input. With the scaffolder as I'm now calling it, I do need to get user input like title, description, and tags. Nothing super crazy, but still, it was something I never did. Well, now I know how to record user input and figured I'd share a quick how-to.

For this quick demo, we'll capture the title and description of a simple post.

Let's start with the barebones of my scaffolder.

```js
import readline from 'readline';

async function scaffold() {
  // the logic will go here
}

scaffold();
```

The few notes here is that you'll need the `readline` library, and will need an asynchronous method, in my case called 'scaffold()'.

The next thing we'll want to do is create the readline interface. and a helper method.

```js
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readUserInput = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

async function scaffold() {
  // the logic will go here
}

scaffold();
```

This creates the readline interface to indicate we want to use the standard input and output of the console. I then created a helper method called `readUserInput()` to simplify the process. It takes a single argument to prompt the user indicating what they are entering.

So now let's provide the actual logic to the `scaffold()` method.

```js
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readUserInput = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

async function scaffold() {
  const title = await readUserInput('Please Enter a Title: ');
  const description = await readUserInput('Please Enter a Description: ');
  
  console.log('=====================')
  console.log(`The title of your post is ${title}`);
  console.log(`The description of your post is ${description}`);
}

scaffold();
```

Looks good, we call `readUserInput()` twice, once to get the title, then a second time to get the description. The user is then presented with the confirmation their input was captured.

Oh...but if you were to copy this into a `.js` file and run it, you'll notice that the application hangs and you'll have to `ctrl+c` to escape out of it. Whoops. You'll have to make sure you close the readline interface. Let's fix that with a `try-catch-finally`.

```js
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readUserInput = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
};

async function scaffold() {
  try {
    const title = await readUserInput('Please Enter a Title: ');
    const description = await readUserInput('Please Enter a Description: ');
    
    console.log('=====================')
    console.log(`The title of your post is ${title}`);
    console.log(`The description of your post is ${description}`);
  } catch (e) {
    console.error(e.message);
  } finally {
    rl.close();
  }
}

scaffold();
```

In this case, I put the entire application into a `try` statement. It will run through the prompts and when complete, enter the `finally` block and call `rl.close()` to close the interface.

So now if you run the Node script, it will exit back to the terminal prompt. It wasn't too bad to figure out and work through, but hopefully this might help someone who might just be delving into Node.

## Added Bonus

As part of my scaffolder, I also created a few helper methods that I'll share.

This one is for when you're expecting an integer as the value entered. It uses the `readUserInput()` method to get the value, but then parses it as an integer. If the value is not a number, it throws an error that can be handled in a `try-catch`, and if it is a number, it will return the value as a number. You'll know that if you get a value back, it's numeric. The only caveat with this is that it will handle decimals incorrectly. If a user enters `2.3` for example, it will not error, but instead return `2`.

```js
const readUserInputInteger = async (prompt) => {
  const response = await readUserInput(prompt);

  const value = parseInt(response);

  if (Number.isNaN(value))
  {
    throw new Error('Invalid Input');
  }

  return value;
};
```

This next one is to help with a default value. It again uses the `readUserInput()` method. The difference is the method accepts a default value as the 2nd argument to the method. If the user doesn't enter anything in the prompt, it will simply return the default value to be assigned. This can be handy if you want to provide a default without having to have the user enter it. An example from my use is for the URL slug. By default, it just takes the title of the post and removes the special characters, tranforms it to lower case, and replaces the spaces with dashes. I still prompt myself for the URL slug if I want to change it, but it shows what will be used if I don't enter a value. If I enter a new value, it will use what I entered, otherwise it will use the automatically generated one.

```js
const readUserInputDefault = async (prompt, defaultValue) => {
  let response = await readUserInput(` ${prompt} (${defaultValue}): `);

  if (response.trim() === '') {
    response = defaultValue;
  }

  return response;
};
```

The final one is for my posts' tags. I can enter in whatever tags I want, and it will split them on the `,` character, trim them, and return a string array. It too uses the same `readUserInput()` method as its base.

```js
const readUserInputTags = async (prompt) => {
  const response = await readUserInput(` ${prompt} (Separate By Commas): `);

  if (response.trim() === '') {
    return '';
  }

  return response
    .split(',')
    .map((i) => i.trim());
};
```

I'm planning on writing more about the scaffolder update in a post soon, but thought I'd share this.

One last thing to note. This is more a little application for me to make my life a little easier when I want to get the front matter of a post scaffolded into their markdown file. I don't have a ton of hardening in place. I have some small checks in place, but I'm the only one using it so I'm going in with the assumption I'm not going to enter garbage input or get the app to crash. If you're going to use this in production, I'd ***highly*** recommend putting in more checks to ensure valid user input.