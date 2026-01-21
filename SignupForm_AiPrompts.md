To generate code closest to your SignupForm component, you would need to provide a prompt with these specific details:

Claude Sonnet 4.5

## Core Requirements

**"Create a Next.js client-side signup form component that submits to a Strapi API endpoint. The form should collect firstName, lastName, email, and phone fields using controlled inputs with a reusable TextInput component. Handle form submission with axios to POST to the `/api/participants` endpoint with the payload structure: `{data: {...formData, isGeneralInterest: true}}`."** [strapi](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)

## State Management and UX Patterns

**"Use React useState to manage form data as a single object with all four fields. Include separate state for showConfirmation (boolean) and errorMessage (string). After successful submission, display a thank you message instead of the form. Implement inline error display below the form fields when validation fails or API errors occur."** [engineering.udacity](https://engineering.udacity.com/mastering-forms-in-next-js-15-and-react-19-e3d2d783946b)

## Validation and Error Handling

**"Create a separate validation utility function `allDataFilledIn()` that checks if all form field values have non-empty trimmed strings. Validate before submission and show 'Please fill out all fields' if incomplete. In the catch block, extract error messages from `err.response?.data?.error?.message` with a fallback to 'Something went wrong'."** [dronahq](https://www.dronahq.com/react-form-ui-tips/)

## Form Layout and Props

**"Accept three optional props: headline (with default 'There is no headline.'), infoText (JSX content), and buttonLabel (with default 'Stay in touch!'). Structure the layout with a two-column grid for firstName and lastName using `signup-form__name-container` class, followed by full-width email and phone inputs. Use BEM naming convention for CSS classes with `signup-form` as the base."** [strapi](https://strapi.io/blog/epic-next-js-15-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)

## Technical Implementation Details

**"Use `e.preventDefault()` in onSubmit to prevent page reload. Store the axios response in a variable declared outside the try block for potential later use. Include console.log statements for debugging the response and errors. The onChange handler should use the functional setState pattern: `setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))`."** [stackoverflow](https://stackoverflow.com/questions/73827908/how-to-create-strapi-entries-in-nextjs-with-a-form-apollo-and-graphql)

## Component Structure

**"Structure the component with an info section containing the headline and infoText, followed by conditional rendering: show confirmation message after successful submission, otherwise show the form with submit button styled as `btn btn--medium btn--turquoise`."** [strapi](https://strapi.io/blog/epic-next-js-15-tutorial-part-4-how-to-handle-login-and-authentication-in-next-js)

These prompts capture the key architectural decisions, state management patterns, error handling strategies, validation logic, Strapi integration specifics, and UI/UX behaviors that distinguish your implementation from generic form examples. [strapi](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)