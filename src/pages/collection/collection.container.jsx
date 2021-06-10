import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;

// Notes: This is an example of how we can use GraphQL with Apollo to query the database.  Previously, we used Redux in the Collection component to map state to props using a selector. Now we create a new container component, which will query the GraphQL backend and pass the data to the Collection component as props, so very little of the Collection code needs to be changed.
// There is a some complication in that we need to use a variable in the query, but we see how that is possible.
// One convenient thing is the Apollo query component has built in support for loading states, so we can conditionally render our loading Spinner.
