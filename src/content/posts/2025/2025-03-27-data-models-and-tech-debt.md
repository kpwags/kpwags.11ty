---
title: "Data Models & Tech Debt"
date: '2025-03-27T21:24:56.468Z'
permalink: /posts/2025/03/27/data-models-and-tech-debt/index.html
description: "Tech debt caused by hasty data models can be particularly gnarly."
tags:
  - Development
  - Database
  - Data Models
  - Tech Debt
  - Cautionary Tale
---
This past week at work we ran into a weird bug. It was one of those bugs where everyone’s trying to replicate it with mixed success. Most of the time it works just fine, but every so often it fails with no clear indication as to what’s different about the failure case. It took a while, but we were finally able to identify the cause and it presented us with a slight headache.
<!-- excerpt -->

The cause of the headache was how our data model was created and set up at the very beginning of the project almost 5 years ago. We were doing a much needed rewrite of some 10+ year old software. We had to deal with transferring over and converting hundreds of thousands of existing records and were trying to keep the data model simple and clean, but also do it in a manner that kept it close enough to the existing data model to make the transfer easier. This was probably our first mistake. But even with that, we also had some constraints from the business that limited our ability to venture too far from what currently existed. Knowing now what we do, we probably could’ve successfully pushed back some and gotten the concessions we would’ve asked for, but like so many things in life, hindsight is 20/20.

Tech debt is frequently experienced in the development world. Hopefully, if you’re lucky, it’s minor and can be fixed as you go easily enough when you touch the affected areas. But in other cases it can feel like a snowball rolling down a hill, growing larger by the foot. We can’t always do everything we want as business needs and deadlines have to be taken into account as well, so it accumulates.

I mention my current predicament because when it comes to things like data models and databases, tech debt can be especially gnarly. Quick and dirty code can always be cleaned up and refactored. Problematic data models, the countless stored procedures that reference the specific columns, as well as all the code that relates to them are a lot harder to untangle.

Looking at the bug, I’m actually a little surprised it took us this long to find. The issue, while an edge case, isn’t something I would expect to not have happen for the 4 or so years the project’s been live. It’s certainly possible of course that it happened and was never reported to us to investigate, but it manifested in such a way that made it pretty obvious something went wrong.

We’re still working with the business to find the best way to handle this. There are several solutions, each with their own drawbacks. I’m still musing about it and the lessons learned to hopefully not have it happen again, or limit the scope if it does.

Consider this a cautionary tale. Tech debt is often inevitable in some shape or form. Every little bit you can do now to think about how the code and functionality might grow, could save you a headache later.