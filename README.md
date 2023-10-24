# Meme Generator

Hi there! This is a sample typescript React app utilising the [Imgflip API](https://imgflip.com/api) to fetch meme templates and generate memes.

Once a meme template is selected, the editor page generates as many input boxes as the selected template supports and enables the user to freely position the captions. The custom positioning can be used as a preview as well. If the option is deselected, the meme will be generated with the pre-defined caption positions on the server (includes default positions, rotation, styling, etc).

It uses the following techniques and libraries:

- Code splitting with React lazy and Suspense
- React query v5 for data fetching integrating with Suspense
- Error boundary (react-error-boundary) with fallback and reset
- Lazy loading images on the home page (react-intersection-observer)
- Custom hooks to extract logic from a component
- Dynamic refs and ref forwarding
- React Context with memoization
- React router v6.16
- Material UI / styled component using the styled() utility with custom props
- Custom caption positioning with react-moveable
