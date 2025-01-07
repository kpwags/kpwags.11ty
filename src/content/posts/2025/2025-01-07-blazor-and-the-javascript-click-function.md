---
title: "Blazor and the JavaScript .click() Function"
date: '2025-01-07T01:30:37.124Z'
permalink: /posts/2025/01/07/blazor-and-the-javascript-click-function/index.html
description: "I ran into a bit of an odd situation with Blazor and JavaScript with calling the .click() function and thought I might save you some time."
tags:
  - Blazor
  - JavaScript
  - Web Development
---
My job had me build a customize file upload control for the project I’m working on. I thought I had it working. It worked on Chrome. It worked on Firefox. It worked on Android. Then it was tested on an iPhone.
<!-- excerpt -->

The design for this essentially had custom button and file list that uses a hidden file input to handle the upload.

```razor
<label for="file-picker">
  File Upload
  <div class="flex gap-x-6 flex-col md:flex-row gap-y-6">
    <button
      class="btn-ghost"
      type="button"
      id="launch-file-picker"
      @onclick="OpenFilePicker"
    >
      Upload File
    </button>
  </div>
  
  <InputFile
    id="file-picker"
    class="hidden"
    accept=".pdf"
  />
</label>

<script>
  function openFilePicker() {
    document.getElementById('file-picker').click();
  }
</script>

@code {
  private async Task OpenFilePicker()
  {
    await JsRuntime.InvokeVoidAsync("openFilePicker");
  }
}
```

This worked well, or so I thought. See if you can pick up on why Safari was throwing a fit.

I run a Windows machine for work, but I was able to create a quick Blazor app on my personal MacBook Pro loaded on the iPhone simulator to reproduce it. This thankfully allowed me to start digging in. Sure enough, it didn’t work on Safari. After some debugging, it made sense why it wasn’t working.

One thing browsers try to do is protect us from nefarious actors. As a developer, you can call the `.click()` function on an element to trigger the element as if the user clicked it with their mouse. The major caveat to this is that the action as to have been initiated by the user. You can’t just do it say on the `window.load` event. Bad actors would be able to exploit this to terrible effect otherwise.

What I was able to figure out was that the Blazor `@onclick` event isn’t picked up by Safari as a user-initiated event. Safari saw my use of that as something that violated its security protections and blocked the function from being called.

Fortunately, I was able to tweak the component and get it to work across all browsers.

```razor
<label for="file-picker">
  File Upload
  <div class="flex gap-x-6 flex-col md:flex-row gap-y-6">
    <button
      class="btn-ghost"
      type="button"
      id="launch-file-picker"
    >
      Upload File
    </button>
  </div>
  
  <InputFile
    id="file-picker"
    class="hidden"
    accept=".pdf"
  />
</label>

<script>
  function initializeControl() {
    document.getElementById('launch-file-picker').addEventListener('click', function () {
      document.getElementById('file-picker').click();
    });
  }
</script>

@code {
  protected override async Task OnAfterRenderAsync(bool firstRender)
  {
    if (firstRender)
    {
      await JsRuntime.InvokeVoidAsync("initializeControl");
    }
  }
}
```

The change I had to implement was to have JavaScript control the click handler on the button. Instead of Blazor just calling the JS function, I have Blazor call a function initialize the click handler on the HTML element. I use the `OnAfterRenderAsync` lifecycle method to attach the event handler on the first time the page is rendered.

Now when the button is clicked, the JavaScript event triggers the `.click()` function call satisfying all browsers’ security checks.

It took me several hours to figure this out, so hopefully this might help someone else to figure it out faster.