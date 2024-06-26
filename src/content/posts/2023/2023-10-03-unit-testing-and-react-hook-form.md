---
title: 'Unit Testing and React Hook Form'
date: '2023-10-03'
permalink: /posts/2023/10/03/unit-testing-and-react-hook-form/index.html
tags:
  - Development
  - React
  - Unit Testing
---

One of my side projects uses [React Hook Form](https://react-hook-form.com/) for my forms and ran into some speed bumps while building tests for the individual components. I figure I can’t be the only one so I figure I’ll share my solution.
<!-- excerpt -->

The issue I was dealing with was that I was trying to use a react hook outside a react component.

```tsx TextInput.test.tsx
test('It renders the control', () => {
    const { register } = useForm();

    render(
        <TextInput
            type="text"
            id="name"
            label="Name"
            error=""
            required
            register={register}
        />
    );

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
});
```

Yeah, that didn't work too well. Wasn't something I immediately thought of when I wrote the test. Vitest immediately yelled at me for it.

The big thing here is that I'm not testing a form as a whole, I'm testing an individual control I'm planning on using throughout the project. If I was testing a whole form, this wouldn't pose much of an issue as I wouldn't need to mock the hook.

After some searching, I realized that I had to put it in a wrapper. I created a helper function file in my tests directory.

```tsx renderWithReactHookForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { render } from '@testing-library/react';
import { ReactNode, ReactElement } from 'react';

const renderWithReactHookForm = (ui: ReactElement, { defaultValues = {} } = {}): any => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        const methods = useForm({ defaultValues });

        return (
            <FormProvider {...methods}>{children}</FormProvider>
        );
    }

    return {
        ...render(ui, { wrapper: Wrapper }),
    };
}

export default renderWithReactHookForm;
```

What this does is it creates a functional component wrapper for what I want to render, in this case my `TextInput` control. The [FormProvider](https://react-hook-form.com/docs/formprovider) allowed me to refactor my `TextInput` control to not have to pass the form helper as a prop.

Because I'm using the `FormProvider` now in both the wrapper and the form, I can grab the form context from the nested input control by using the following line:

```ts
const { register } = useFormContext<any>();
```

So now all I have to do is tweak the unit test slightly.

```tsx TextInput.test.tsx
test('It renders the control', () => {
    renderWithReactHookForm(
        <TextInput
            type="text"
            id="name"
            label="Name"
            error=""
            required
        />
    );

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
});
```

I render the `TextInput` control within the functional component so the react hook works, the control renders, and I can continue my tests.

I run into stuff like this when I'm working, especially with new libraries. I figured I'd share what I found through my searching and experimentation in hopes that it helps you or someone else.