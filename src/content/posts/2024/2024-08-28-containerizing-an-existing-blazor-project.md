---
title: "Containerizing an Existing Blazor Project"
date: '2024-08-28T18:23:37.736Z'
permalink: /posts/2024/08/28/containerizing-an-existing-blazor-project/index.html
description: "I was struggling to figure out how to containerize my Blazor web application, found the solution and thought I'd share my findings."
tags:
  - Development
  - Docker
  - Blazor
  - .NET
  - C#
---

I've been working on a .NET 8 Blazor Web App and needed to create a docker image of it so I can deploy it to my Synology NAS. I ran into several hiccups during the process and figured I'd share what I learned about the process.
<!-- excerpt -->

## A Little Bit About the Project

The project I'm containerizing to is the media repository I've been working on. The project is in .NET 8 and it consists of several projects.

- **WagsMediaRepository.Web** - The Blazor Web App
- **WagsMediaRepository.Application** - The interface definitions for the project
- **WagsMediaRepository.Domain** - The models for the project
- **WagsMediaRepository.Infrastructure** - The repositories and Entity Framework definitions to interface with the database

I mention this first because the multiple projects in the solution was the biggest hiccup I ran into.

## Building My Knowledge

It’s safe to say that coming into this, I knew **just enough*** about Docker to be dangerous. I haven’t really used it all that extensively other than getting some images up and running for both work and personal projects.

I know what Docker is and why it can be useful, but my actual working knowledge is lacking.

## Building Out the Docker File

The hardest part of my process was handling the different libraries my Blazor web app relies on. So many of the tutorials that I went through were simple apps with a single .NET project in them. When I went to try to build the docker image, it would error out saying it couldn’t find the project references.

After some searching and digging, I found that I needed to add some `COPY` instructions to copy the additional libraries.

```docker
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WagsMediaRepository.Web/WagsMediaRepository.Web.csproj", "WagsMediaRepository.Web/"]
COPY ["WagsMediaRepository.Application/WagsMediaRepository.Application.csproj", "WagsMediaRepository.Application/"]
COPY ["WagsMediaRepository.Domain/WagsMediaRepository.Domain.csproj", "WagsMediaRepository.Domain/"]
COPY ["WagsMediaRepository.Infrastructure/WagsMediaRepository.Infrastructure.csproj", "WagsMediaRepository.Infrastructure/"]
RUN dotnet restore "WagsMediaRepository.Web/WagsMediaRepository.Web.csproj"
COPY . .
WORKDIR "/src/WagsMediaRepository.Web"
RUN dotnet build "WagsMediaRepository.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WagsMediaRepository.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WagsMediaRepository.Web.dll"]
```

## Actually Building the Image

The next wall I hit was running the `docker build` command. When I ran it in the `WagsMediaRepository.Web` directory, it failed because it couldn’t find the class libraries.

What I found from searching is that I had to run the docker build command from one directory up (where all the project folders were).

```bash
docker build -t wags-media-repository -f WagsMediaRepository.Web/Dockerfile .
```

I ran it in the parent directory and specified the docker file, and sure enough, it found all the class libraries and the image built.

## Deploying

This part never happened. As it turns out, my NAS doesn’t officially support Docker since it runs on an ARM chip. I’ve found some instructions on how to get Docker up and running anyway, but I’m a little worried about screwing my NAS up. I ended up just having it run as a service on my LinuxMint desktop so all of this was for naught. Either way though, maybe it will still help someone.

Thanks to [Chris Sainty](https://chrissainty.com) & [Josiah Mortenson](https://josiahmortenson.dev/) for their [blog](https://chrissainty.com/containerising-blazor-applications-with-docker-containerising-a-blazor-server-app/) [posts](https://josiahmortenson.dev/blog/2020-06-08-aspnetcore-docker-https) that helped me figure this out.