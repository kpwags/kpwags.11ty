---
title: "Some Quick Thoughts on Feature Flags"
date: '2025-12-10T00:34:58.559Z'
permalink: /posts/2025/12/10/some-quick-thoughts-on-feature-flags/index.html
description: "I've recently started using feature flags at work and have some quick, initial thoughts."
rss_only: true
tags:
  - Feature Flags
  - Development
  - Software Architecture
---
I recently started using feature flags at work and I have some quick initial thoughts.
<!-- excerpt -->

Feature flags are essentially virtual switches that allow you to turn features on and off in your software. You can configure them to be universal or to even be more granular and only target a specific group of users. There's a lot more detail here, but it they can allow you to deploy code and keep features hidden behind a flag until you're ready or until you're confident the code is stable.

The general idea at work is that we have two general types of feature flags. Long-term and short-term flags.

## Short-Term Flags

The short-term ones are meant for features that are in development but you don't want to have them turned on in production right away. That way they can be tested and then turned on as we feel confident the code is ready. Once deployed and all looks good, we can go in and remove the feature flag code and the feature flag itself.

These are great. There have been times where larger features can interfere with other smaller bugs and features getting out due to merge conflicts or any number of other reasons. Having a flag can allow you to unblock processes without necessarily having to worry that the new feature you're working on being seen by the world. They can also allow you to quickly turn off features if a bad bug pops up or something unexpected occurs.

## Long-Term Flags

Long-term flags are ones that remain in place for an extended period of time, perhaps for the life of the software.

I have a little more concern with these and maybe part of it is just me not understanding something and it could certainly be something with the way we're implementing them.

At work, we're using a 3rd party library, [FeatBit](https://www.featbit.co) to handle our flags. My experience with them so far has been good. The flags have been easy to setup, configure, and tie into the code. Given that we've been dealing with a wave of [enshittification](https://en.wikipedia.org/wiki/Enshittification) of late, my concern with the long-term flags is that what happens if FeatBit jacks up their prices? Or what if their service takes a nose dive and becomes unreliable? We'd have to quickly go through every project that uses them, and pull them out.

For short-term flags, we'd already be prepared to do this, so I wouldn't think it'd be that big of a deal. For the long-term flags, we'd have to go in and either pull out the flag, migrate the flag to a different service, or something.

I guess from my perspective, I feel like long-term flags should be baked into apps through some kind of site configuration whether stored in a database, environment variable, or app config. That way, you're not dependent upon any external service to enable and disable the feature. It's still a feature flag of sorts, just built differently.

## Closing Thoughts

It's certainly possible that I'm overthinking things. I'm still new to using feature flags so there could be something I'm just not yet getting when it comes to longer-term flags. Definitely something to explore and research.

*Note: as with everything on my site, my thoughts are my own and do not represent the views of the company I work for.*