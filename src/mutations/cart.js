import gql from 'graphql-tag'

export const ADD_TO_CART_MUTATION = gql`
  mutation addToCart(
    $id: ID!
    $projectId: ID!
    $name: String
    $vendor: String
    $color: String
    $usTotalCost: Float
    $quantity: Int
    $inWarehouse: Boolean
    $type: String
    $productTotalCost: Float
    $isUpgrade: Boolean
    $Photos: ProductPhoto
  ) {
    addToCart(
      id: $id
      params: {
        projectId: $projectId
        name: $name
        vendor: $vendor
        color: $color
        usTotalCost: $usTotalCost
        quantity: $quantity
        inWarehouse: $inWarehouse
        Photos: $Photos
        type: $type
        isUpgrade: $isUpgrade
        productTotalCost: $productTotalCost
      }
    ) @client {
      id
    }
  }
`

export const EDIT_CART_ITEM_MUTATION = gql`
  mutation editCartItem(
    $id: ID!
    $name: String
    $vendor: String
    $color: String
    $usTotalCost: Float
    $quantity: Int
    $type: String
    $productTotalCost: Float
    $isUpgrade: Boolean
  ) {
    editCartItem(
      id: $id
      params: {
        name: $name
        vendor: $vendor
        color: $color
        usTotalCost: $usTotalCost
        quantity: $quantity
        type: $type
        productTotalCost: $productTotalCost
        isUpgrade: $isUpgrade
      }
    ) @client {
      id
    }
  }
`

export const UPDATE_QUANTITY_MUTATION = gql`
  mutation updateQuantity($id: ID!, $quantity: Int) {
    updateQuantity(id: $id, params: { quantity: $quantity }) @client {
      id
    }
  }
`

export const EMPTY_CART_MUTATION = gql`
  mutation {
    emptyCart @client {
      id
    }
  }
`

export const SET_TOTAL_COST_MUTATION = gql`
  mutation setTotalCost($id: ID!, $totalCost: Float) {
    setTotalCost(id: $id, params: { totalCost: $totalCost }) @client {
      totalCost
    }
  }
`

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) @client {
      id
    }
  }
`
