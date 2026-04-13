---
title: "Comprehension Debt - the hidden cost of AI generated code"
date: '2026-04-13T13:33:00.000Z'
permalink: /notes/comprehension-debt--the-hidden-cost-of-ai-generated-code/index.html
link: https://addyosmani.com/blog/comprehension-debt/
author: Addy Osmani
tags:
  - Addy Osmani
  - AI
  - Comprehension Debt
---
> Unlike technical debt, which announces itself through mounting friction - slow builds, tangled dependencies, the creeping dread every time you touch that one module - comprehension debt breeds false confidence. The codebase looks clean. The tests are green. The reckoning arrives quietly, usually at the worst possible moment.
> 
> [Margaret-Anne Storey](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/)’s describes a student team that hit this wall in week seven: they could no longer make simple changes **without breaking something unexpected**. The real problem wasn’t messy code. It was that no one on the team could explain why design decisions had been made or how different parts of the system were supposed to work together. The theory of the system had evaporated.

Knowing the code you are introducing to your codebase is so important. As soon as you offload that blindly to AI, the timebomb starts ticking.

> I read one engineer say that the bottleneck has always been a competent developer understanding the project. AI doesn’t change that constraint. It creates the illusion you’ve escaped it.
> 
> And the inversion is sharper than it looks. When code was expensive to produce, senior engineers could review faster than junior engineers could write. **AI flips this: a junior engineer can now generate code faster than a senior engineer can critically audit it.** The rate-limiting factor that kept review meaningful has been removed. **What used to be a quality gate is now a throughput problem.**

The nightmare is when the AIs create such large PRs that make it so easy to miss wrong turns in code.

> There’s also a specific failure mode worth naming. **When an AI changes implementation behavior and updates hundreds of test cases to match the new behavior, the question shifts from “is this code correct?” to “were all those test changes necessary, and do I have enough coverage to catch what I’m not thinking about?”** Tests cannot answer that question. Only comprehension can.

The tests pass...the code must work...right? Right?

> You will pay for comprehension sooner or later. The debt accrues interest rapidly.