import gql from 'graphql-tag'

export const ALL_PRODUCTS_QUERY = gql`
  query($filter: ProductFilter) {
    # allProductsWithPhotos(filter: $filter) {
    allProducts(filter: $filter) {
      id
      brTotal
      catalog
      dimensions
      furnitureTag
      inWarehouse
      name
      # photoUrl - deprecated in favor of nested Photos query
      # rawPhotoUrl - deprecated in favor of nested Photos query
      knotelSku
      item
      Photos {
        id
        url
        imgixUrl
      }
      Vendors {
        id
        name
      }
      status
      type
      usTotalCost
      ukTotal
    }
  }
`

export const SINGLE_PRODUCT_QUERY = gql`
  query($productId: ID!) {
    Product(id: $productId) {
      id
      catalog
      category
      description
      dimensionsImperialWxDxH
      dimensionsMetricCmWxDxH
      finish
      furnitureTag
      inWarehouse
      leadTime
      name
      link
      color
      notes
      # rawPhotoUrl - deprecated in favor of nested Photos query
      Photos {
        id
        url
        imgixUrl
      }
      Vendors {
        id
        name
      }
      SimilarProducts {
        id
        name
        inWarehouse
        usTotalCost
        ukTotal
        brTotal
        type
        Photos{
          id
          url
          imgixUrl
        }
      }
      status
      type
      upcSkuItemNumber
      usTotalCost
      code
      knotelSku
      item
      upcSkuItem
    }
  }
`
