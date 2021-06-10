import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
// import { gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

// Estabilish connection to the GraphQL server
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

// Apollo will cache query responses, so does not ned to make additional queries if nothing has changed.
const cache = new InMemoryCache();

// Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs,
});

// Test request
// client
//   .query({
//     query: gql`
//       {
//         getCollectionsByTitle(title: "jackets") {
//           id
//           title
//           items {
//             name
//             price
//           }
//         }
//       }
//     `,
//   })
//   .then((res) => console.log(res));

client.writeData({
  data: {
    cartHidden: true,
  },
});
// In addition to letting us query a GraphQL backend, Apollo estabilishes a 'Local Cache', which allows us to do state managment, and we can query and mutate against the local cache, much like we would against a backend.

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
