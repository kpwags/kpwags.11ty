---
title: 'What I Learned: React Strict Mode'
date: '2024-02-16'
permalink: /posts/2024/02/16/what-i-learned-react-strict-mode/index.html
tags:
  - What I Learned
  - React
  - JavaScript
  - Development
---

This past week I started a new React project at work and was dealing with a weird issue with one of my components. It turns out the issue was caused by [Strict Mode](https://react.dev/reference/react/StrictMode) on React.
<!-- excerpt -->

One of the components I built looked like it was rendering twice. In my debugging of the app, I stumbled upon Strict Mode and realized that was what was causing the double rendering...kind of. What it really did was help me identify a bug in my code when I was rendering a piece of the component.

One of the things Strict Mode does is cause all child components within the `<StrictMode>` tag to render twice. If the components are structured and built properly, this won't be an issue. But for me, where I had what is called an impure function, this second render caused me issues.

Turning off Strict Mode immediately fixed the symptom of the issue I was having, but it didn't fix the underlying cause. For that I found where I wasn't properly checking to see if the one form item had loaded properly. Once I put in the additional check (that should have been there from the get-go), it worked properly.

While a tad bit annoying at first, I definitely appreciate it being there as it saved me time and effort later by showing me the bug now. It saved me what would have been a hassle later. Hopefully it can save you some headaches too.

Vite's React template includes Strict Mode being turned on by default. I'd suggest adding it in if you started with a different template or have removed it since.

You can add it for your entire application:

```jsx
import { StrictMode } from 'react';

const App = () => (
	<StrictMode>
		<Header />
		<main>{children}</main>
		<Footer />
	</StrictMode>
);
```

Or only a single component, like the header:

```jsx
import { StrictMode } from 'react';

const App = () => (
	<>
		<StrictMode>
			<Header />
		</StrictMode>
		<main>{children}</main>
		<Footer />
	</>
);
```

It should also be noted that the double rendering and re-running effects, and other features of Strict Mode only occur in the development environment and are not part of the production builds.