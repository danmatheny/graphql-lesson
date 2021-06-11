import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// const CartIconContainer = () => (
//   <Mutation mutation={TOGGLE_CART_HIDDEN}>
//     {(toggleCartHidden) => (
//       <Query query={GET_ITEM_COUNT}>
//         {({ data: { itemCount } }) => (
//           <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
//         )}
//       </Query>
//     )}
//   </Mutation>
// );
// export default CartIconContainer;

// Alternate version using higher order components to get a syntax that looks more like when we used connect
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);

// In the CartIconContainer, we are replacing our use of Redux for toggling the cartHidden boolean. We make a query against the local cache for the mutation we defined in our resolvers file, and pass that function to CartIcon as the toggleCartHidden prop (which previously came from redux via mapDispatchToProps)
