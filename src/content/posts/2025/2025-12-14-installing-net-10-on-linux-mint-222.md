---
title: "Installing .NET 10 on Linux Mint 22.2"
date: '2025-12-14T18:12:33.557Z'
permalink: /posts/2025/12/14/installing-net-10-on-linux-mint-222/index.html
description: "I had some adventures getting .NET 10 installed and working on Linux Mint and thought I'd share the solution that worked for me."
tags:
  - .NET
  - Linux
  - Linux Mint
---
I had some adventures getting .NET 10 installed and working on Linux Mint and thought I'd share the solution that worked for me.
<!-- excerpt -->

## Some Background

I was easily able to install the .NET 9 SDK through APT. I think this is why I later had problems with .NET 10. When I would run the `dotnet --list-sdks` command which lists the .NET SDKs available on your system, it would only display `9.0.112` which I believe is the version installed.

Linux Mint and its repositories don't have .NET 10 so in order to use it, I would have to resort to other methods. The one most recommended was the [scripted install](https://learn.microsoft.com/en-us/dotnet/core/install/linux-scripted-manual#scripted-install). I followed the instructions and it installed without errors, but when I listed the SDKs, .NET 9 remained the only version available. I was a little frustrated.

The one thing I did note was when it displayed the SDK version, despite the install script installing .NET 10 to `~/.dotnet`, the .NET 9 SDK version listed `/usr/lib/dotnet/sdk` as the install location.

## The Fix

Digging into the [install script documentation](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script), I found that you could specify the install directory. So I decided to try to tell the install script to install to the same directory .NET 9 listed. Because I was installing outside my home directory, I did have to use `sudo` to elevate my permissions.

```bash
> sudo ./dotnet-install.sh --channel LTS --install-dir /usr/lib/dotnet/
```

Turns out this did the trick. I'm not sure if it's the "correct" way, but my system now recognizes .NET 10 as a valid SDK and I can get back to development.