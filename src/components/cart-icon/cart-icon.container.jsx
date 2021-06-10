import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const CartIconContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => <CartIcon toggleCartHidden={toggleCartHidden} />}
  </Mutation>
);

export default CartIconContainer;

// In the CartIconContainer, we are replacing our use of Redux for toggling the cartHidden boolean. We make a query against the local cache for the mutation we defined in our resolvers file, and pass that function to CartIcon as the toggleCartHidden prop (which previously came from redux via mapDispatchToProps)
