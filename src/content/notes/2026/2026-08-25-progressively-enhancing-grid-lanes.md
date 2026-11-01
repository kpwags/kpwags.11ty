---
title: "Progressively Enhancing Grid Lanes"
date: '2026-08-25T19:48:00.000Z'
permalink: /notes/progressively-enhancing-grid-lanes/index.html
link: https://www.matuzo.at/blog/2026/grid-lanes-progressive-enhancement
author: Manuel Matuzovic
tags:
  - CSS
  - Web Development
  - Development
  - Accessibility
  - Grid Lanes
  - Manuel Matuzovic
---
> The more I think about it, the less sympathy I have for Grid Lanes. You create a DOM order that you think makes sense, then you mess it up with CSS. Then, if you're aware of the problem, you fix it again with CSS. Finally, you have a patched-up layout that may have created other issues you can't address.
> 
> I'm looking forward to Chrome's, Firefox's, and Safari's next moves. Until then, to sum it up, my slightly adjusted recommendations are:
> 
> - Always test your Grid Lanes with the keyboard or a screen reader across different screen sizes.
> - If you find a mismatch between the DOM and the visual order, increase the `flow-tolerance` value. You may have to use a high value or even `infinite`.
> - As soon as it's available and supports Grid Lanes, try using `reading-flow` instead.
> - If that doesn't work, consider using a regular grid.

Some good thoughts and examples here to help with accessibility should you choose to use CSS Grid Lanes.