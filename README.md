## Issue with suspend in react-three-fiber and flexlayout-react

This is a minimal example of an issue with suspend in react-three-fiber and flexlayout-react.

### Steps to reproduce

1. Clone this repo
2. Run `yarn install`
3. Run `yarn start`
4. Open the browser at http://localhost:3000

You should see a flexlayout with a single tab containing a react-three-fiber canvas briefly flash up before the screen
goes white and an error is logged to the console.

To workaround the issue, open index.jsx and add a Suspense element around Canvas (in the App component).

To show that this issue doesn't exist when not using flexlayout-react, open index.jsx and use the commented out
App component.