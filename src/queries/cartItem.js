import gql from 'graphql-tag'

export const CART_ITEMS_QUERY = gql`
  query {
    cart @client {
      id
      projectId
      name
      vendor
      color
      usTotalCost
      quantity
      inWarehouse
      isUpgrade
      type
      productTotalCost
      Photos {
        id
        url
        imgixUrl
      }
    }
  }
`

export const CART_ITEMS_COUNT = gql`
  query {
    cartItemsCount @client {
      count
    }
  }
`

export const CART_ITEMS_TOTAL_SUM = gql`
  query {
    cartItemsTotalSum @client {
      sum
    }
  }
`
