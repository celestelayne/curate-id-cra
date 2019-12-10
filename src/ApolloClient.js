import ApolloClient from 'apollo-boost'
import { CART_ITEMS_QUERY } from './queries'
import typeDefs from './typeDefs'
import * as Sentry from '@sentry/browser'
import Chance from 'chance'

import envConfig from './env'

const chance = new Chance()

const { REACT_APP_FOUNDATION_BASE_URL } = envConfig

const foundationUrl = REACT_APP_FOUNDATION_BASE_URL + '/graphql'

const createClient = cache => {
  console.log('>', REACT_APP_FOUNDATION_BASE_URL)
  try {
    cache.readQuery({ query: CART_ITEMS_QUERY })
  } catch (e) {
    cache.writeData({
      data: {
        cart: []
      }
    })
  }
  return new ApolloClient({
    uri: foundationUrl,
    typeDefs,
    cache,
    resolvers: {
      Query: {
        cart: (_, __, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          return data.cart
        },
        cartItemsCount: (_, __, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const count = data.cart.reduce((acc, item) => acc + item.quantity, 0)
          return { id: 0, count, __typename: 'Count' }
        },
        cartItemsTotalSum: (_, __, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const sum = data.cart.reduce((acc, item) => acc + item.quantity * item.usTotalCost, 0)
          return { id: 0, sum, __typename: 'Sum' }
        }
      },
      Mutation: {
        addToCart: (_, { id, params }, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const itemIndex = data.cart.findIndex(value => value.id === id)
          if (itemIndex === -1) {
            cache.writeData({
              data: {
                ...data,
                cart: [...data.cart, { id, ...params, __typename: 'CartItem' }]
              }
            })
          } else {
            const cartToSet = [...data.cart]
            cartToSet[itemIndex].quantity = cartToSet[itemIndex].quantity + 1
            cartToSet[itemIndex].productTotalCost = cartToSet[itemIndex].quantity * cartToSet[itemIndex].usTotalCost
            cache.writeData({
              data: {
                ...data,
                cart: [...cartToSet]
              }
            })
          }
          return id
        },
        removeFromCart: (_, { id }, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const itemIndex = data.cart.findIndex(value => value.id === id)
          if (itemIndex !== -1) {
            const cartToSet = [...data.cart]
            cartToSet.splice(itemIndex, 1)
            cache.writeData({
              data: {
                ...data,
                cart: [...cartToSet]
              }
            })
            return id
          }
        },
        updateQuantity: (_, { id, params }, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const itemIndex = data.cart.findIndex(value => value.id === id)
          if (itemIndex !== -1) {
            const cartToSet = [...data.cart]
            cartToSet[itemIndex] = {
              ...cartToSet[itemIndex],
              quantity: params.quantity,
              productTotalCost: params.quantity * cartToSet[itemIndex].usTotalCost
            }
            cache.writeData({
              data: {
                ...data,
                cart: [...cartToSet]
              }
            })
            return id
          }
        },
        editCartItem: (_, { id, params }, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          const itemIndex = data.cart.findIndex(value => value.id === id)
          if (itemIndex !== -1) {
            const cartToSet = [...data.cart]
            cartToSet[itemIndex] = { ...cartToSet[itemIndex], ...params }
            cache.writeData({
              data: {
                ...data,
                cart: [...cartToSet]
              }
            })
            return id
          }
        },
        emptyCart: (_, __, { cache }) => {
          const data = cache.readQuery({ query: CART_ITEMS_QUERY })
          cache.writeData({
            data: {
              ...data,
              cart: []
            }
          })
          return 0 // have to return something from mutation
        }
      }
    },
    request: operation => {
      const transactionId = chance.hash({ length: 15 })
      Sentry.configureScope(scope => {
        scope.setTag('transaction_id', transactionId)
      })
      operation.setContext({
        headers: {
          authorization: `JWT ${localStorage.getItem('knotel_token')}`,
          'X-Transaction-ID': transactionId
        }
      })
    }
  })
}

export default createClient
