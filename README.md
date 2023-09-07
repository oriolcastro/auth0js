# Auth0 React Router library

A wrapper for auth0-spa-js to use in React Router data APIs

This library uses Zustand to store the auth state instead of the Context API used in the official [auth0-react](https://github.com/auth0/auth0-react) library. By having the state outside the React tree we allow you to have access to it in the loader/action functions of React Router.
