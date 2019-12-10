import gql from 'graphql-tag'

const typeDefs = gql`
  type CartItem {
    id: ID!
    projectId: ID!
    name: String
    vendor: String
    color: String
    usTotalCost: Float
    quantity: Int
    inWarehouse: Boolean
    isUpgrade: Boolean
    type: String
    productTotalCost: Float
    Photos: [ProductPhoto]
  }
  type ProductPhoto {
    id: ID
    url: String
    imgixUrl: String
    fileName: String
    fileSize: String
    fileType: String
    width: Int
    height: Int
    airTableId: String
    type: String
    craetedAt: GraphQLDateTime
    updateadAt: GraphQLDateTime
  }
`

export default typeDefs
