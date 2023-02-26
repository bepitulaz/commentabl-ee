import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

const client = new ApolloClient({
  uri: 'http://localhost:8911/graphql',
  cache: new InMemoryCache(),
})

const targetElement = document.getElementById('commentabl')
const root = ReactDOM.createRoot(targetElement)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App targetElement={targetElement} />
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
