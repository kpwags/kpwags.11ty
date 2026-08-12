---
title: "AI Made Writing Code Easier. It Made Being an Engineer Harder"
date: '2026-08-11T19:55:00.000Z'
permalink: /notes/ai-made-writing-code-easier-it-made-being-an-engineer-harder/index.html
link: https://www.ivanturkovic.com/2026/02/25/ai-made-writing-code-easier-engineering-harder/
author: Ivan Turković
tags:
  - AI
  - LLM
  - Software Engineering
  - Development
  - Cognitive Debt
  - Ivan Turković
---
> Here is something that gets lost in all the excitement about AI productivity: most software engineers became engineers because they love writing code.
> 
> Not managing code. Not reviewing code. Not supervising systems that produce code. Writing it. The act of thinking through a problem, designing a solution, and expressing it precisely in a language that makes a machine do exactly what you intended. That is what drew most of us to this profession. It is a creative act, a form of craftsmanship, and for many engineers, the most satisfying part of their day.

This times 1,000. In a team setting, code review is always part of the job, but something gets lost when thatS all your job becomes.

> One engineer captured this shift perfectly in a widely shared essay, describing how AI transformed the engineering role from builder to reviewer. Every day felt like being a judge on an assembly line that never stops. You just keep stamping those pull requests. The production volume went up. The sense of craftsmanship went down.
> 
> This is not a minor adjustment. It is a fundamental shift in professional identity. Engineers who built their careers around deep technical skill are being asked to redefine what they do and who they are, essentially overnight, without any transition period, training, or acknowledgment that something significant was lost in the process.
> 
> Having led engineering teams for over two decades, I have seen technology shifts before. New frameworks, new languages, new methodologies. Engineers adapt. They always have. But this is different because it is not asking engineers to learn a new way of doing what they do. It is asking them to stop doing the thing that made them engineers in the first place and become something else entirely.

I want to create things, I want to build features and fix bugs. I want to see the code as my canvas. The code over my life has included multiple languages, the tooling has changed, but the general concepts haven't. Now all of a sudden, the primary job that I've done is being offloaded to an LLM. Time will tell what the final result becomes.

> There is an irony at the center of the AI-assisted engineering workflow that nobody wants to talk about: reviewing AI-generated code is often harder than writing the code yourself.
> 
> When you write code, you carry the context of every decision in your head. You know why you chose this data structure, why you handled this edge case, why you structured the module this way. The code is an expression of your thinking, and reviewing it later is straightforward because the reasoning is already stored in your memory.
> 
> When AI writes code, you inherit the output without the reasoning. You see the code, but you do not see the decisions. You do not know what tradeoffs were made, what assumptions were baked in, what edge cases were considered or ignored. You are reviewing someone else’s work, except that someone is not a colleague you can ask questions. It is a statistical model that produces plausible-looking code without any understanding of your system’s specific constraints.

Again, this will only add [cognitive debt](https://simonwillison.net/2026/Feb/15/cognitive-debt/) to your application. Tech debt you at least often have the knowlege of why you built things the way you did. When no one wrote the code, you lose that knowledge and the "why".

> First, do not abandon your fundamentals. The pressure to become an “AI-first” engineer is real, but the engineers who will be most valuable in five years are the ones who deeply understand the systems they work on. AI is a tool. Understanding architecture, debugging complex systems, reasoning about performance and security: these skills are not becoming less important. They are becoming more important because someone needs to be the adult in the room when AI-generated code breaks in production at 2 AM.