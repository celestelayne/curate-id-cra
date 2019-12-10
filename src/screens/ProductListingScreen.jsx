import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Badge, Flex, Container as BaseContainer, Banner, Text, Absolute } from '@knotel/cinderblock'
import LazyLoad from 'react-lazyload'
import { Query, Mutation } from 'react-apollo'
import { withLDConsumer } from 'launchdarkly-react-client-sdk'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import uuidv4 from 'uuid/v4'

import initialState from '../reducers/initialState'
import * as cartActions from '../actions/actions'
import ToastService from '../services/toast'
import AdditionalItem from '../components/AdditionalItem/AdditionalItem'
import ProductFilter from '../components/ProductFilter'
import SearchInput from '../components/SearchInput'
import FilterTabs from '../components/FilterTabs'
import PlaceCard from '../components/PlaceCard/PlaceCard'
import BudgetBar from '../components/BudgetBar'
import Meta from '../components/Meta'
import { trackProductListingView } from '../tracking'

import { ADD_TO_CART_MUTATION } from '../mutations'
import { ALL_PRODUCTS_QUERY, CART_ITEMS_QUERY, CART_ITEMS_COUNT, CART_ITEMS_TOTAL_SUM } from '../queries'
import { checkFiltersEmptyStatement, prepareFilters } from '../util'

const ProductCard = React.lazy(() => import('../components/ProductCard/ProductCard'))

const SearchBar = styled(SearchInput)`
  width: calc(66.666% - ${props => props.theme.space[3]}px);
  input {
    width: 100%;
  }
`

const ToolBar = styled(Flex)`
  justify-content: space-between;
`

const Container = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${props => props.theme.mediaQueries['md']} {
    flex-direction: row;
  }
`

const LeftSide = styled(Flex)`
  flex-direction: column;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  ${props => props.theme.mediaQueries['md']} {
    margin-right: ${props => props.theme.space[4]}px;
    max-width: 300px;
    min-width: 150px;
  }
`

const RightSide = styled(Flex)`
  ${props => props.theme.mediaQueries['md']} {
    width: 70%;
  }
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  flex: 4;
`

const Products = styled(Flex)`
  flex-wrap: wrap;
`

class ProductListingScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      searchQuery: '',
      productCount: 0,
      filters: {
        catalog: {
          venture: true,
          growth: true,
          enterprise: true
        },
        category: {
          workstations: false,
          seating: false,
          tables: false,
          mobile: false,
          storage: false
        },
        markets: {
          US: true,
          EU: false,
          BR: false
        }
      }
    }
  }

  loadLazy () {
    const placeCards = []
    for (let i = 0; i < 12; i++) {
      placeCards.push(<PlaceCard key={i} />)
    }
    return placeCards
  }

  filterProducts = filters => {
    this.setState({ filters })
  }

  componentDidMount () {
    trackProductListingView()
  }

  handleSearch = event => {
    const searchQuery = event.target.value
    this.setState({ searchQuery })
  }

  handleAdditionalItem = (item, addToCart) => {
    const projectId = this.props.project && this.props.project.id
    item.id = uuidv4()
    item.type = 'Off-Platform Items'
    item.usTotalCost *= 100 // convert from dollars to cents
    item.productTotalCost = item.usTotalCost * item.quantity
    addToCart({
      variables: {
        projectId,
        Photos: null,
        inWarehouse: '',
        isUpgrade: false,
        ...item
      }
    })
    ToastService.showMessage('Product added', `You have successfully added ${item.name}.`)
  }

  render () {
    const { searchQuery } = this.state
    const { filters: allFilters, cartActions } = this.props

    let filters = {}
    const baseFilters = prepareFilters(
      (searchQuery && searchQuery.length > 0) || checkFiltersEmptyStatement(allFilters)
        ? initialState.filters
        : allFilters
    )

    Object.keys(baseFilters).forEach(key => {
      filters = { ...filters, ...baseFilters[key] }
    })

    return (
      <>
        <Meta title="Products" />
        <BudgetBar project={this.props.project} />
        <Container>
          <LeftSide>
            <ProductFilter />
          </LeftSide>
          <RightSide>
            <ToolBar mt={4}>
              <SearchBar onChange={this.handleSearch} />
              <Mutation
                refetchQueries={[
                  { query: CART_ITEMS_QUERY },
                  { query: CART_ITEMS_COUNT },
                  { query: CART_ITEMS_TOTAL_SUM }
                ]}
                mutation={ADD_TO_CART_MUTATION}
              >
                {addToCart => (
                  <AdditionalItem
                    ml="auto"
                    label="Add off-platform item"
                    onAdd={item => this.handleAdditionalItem(item, addToCart)}
                  />
                )}
              </Mutation>
            </ToolBar>
            <FilterTabs
              filters={allFilters}
              clearFilters={cartActions.emptyFilters}
              removeFilter={cartActions.removeFilter}
            />
            <Products mt={4}>
              <Query variables={filters} query={ALL_PRODUCTS_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) return this.loadLazy()
                  if (error) {
                    return (
                      <Banner
                        textAlign="left"
                        mb={2}
                        p={3}
                        width={1}
                        header="Error"
                        color="error"
                        text={error.message}
                        bg="lightRed"
                      />
                    )
                  }

                  const allProducts = data.allProducts
                    .filter(p => {
                      if (p.status === 'Discontinued') {
                        return false
                      } // do not display if discontinued
                      const containSearchQuery = p.name
                        ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
                        : true

                      // Temp: Frontend Filtering/Mapping
                      let catalogMap = ''
                      switch (p.catalog) {
                        case '$ - Venture':
                          catalogMap = 'venture'
                          break
                        case '$$ - Growth':
                          catalogMap = 'growth'
                          break
                        case '$$$ - Enterprise':
                          catalogMap = 'enterprise'
                          break
                        default:
                          catalogMap = 'all'
                      }
                      p.catalogMap = catalogMap

                      // List all Truthy Filters, TODO: Parse out Dimensions
                      const trueFilters = Object.keys(filters).filter(f => filters[f])

                      // FE Filtering on Catalog
                      const catalogFilter = trueFilters.includes(p.catalogMap) || p.catalogMap === 'all'

                      // FE Filtering on Category
                      const furniturePrefix = p.furnitureTag ? p.furnitureTag.split('.')[0] : ''
                      switch (furniturePrefix) {
                        case 'SE':
                          p.category = 'seating'
                          break
                        case 'TA':
                          p.category = 'tables'
                          break
                        case 'WS':
                        case 'WO':
                          p.category = 'workstations'
                          break
                        case 'MO':
                          p.category = 'mobile'
                          break
                        case 'ST':
                          p.category = 'storage'
                          break
                        default:
                          p.category = 'undefined'
                      }
                      const categoryFilter = trueFilters.includes(p.category)

                      // FE Filtering on Market
                      const marketFilter = p.type === 'F.US'

                      // FE Filtering on Location
                      const locationFilter = true // (p.inWarehouse === filters.inWarehouse || p.inWarehouse === null)

                      // Combine FE Filters
                      const conditionalFilters = catalogFilter && marketFilter && locationFilter && categoryFilter

                      return (conditionalFilters || trueFilters.length === 0) && containSearchQuery
                    })
                    .map(p => <ProductCard m={2} key={p.id} {...p} />)

                  return (
                    <Suspense fallback={<Text>Loading...</Text>}>
                      <LazyLoad height={385} throttle={1500} placeholder={<PlaceCard />}>
                        {!allProducts.length ? <Text>No Products Available. Try your search again.</Text> : allProducts}
                      </LazyLoad>
                      <Absolute>
                        <Badge>{allProducts.length}</Badge>
                      </Absolute>
                    </Suspense>
                  )
                }}
              </Query>
            </Products>
          </RightSide>
        </Container>
      </>
    )
  }
}

ProductListingScreen.propTypes = {
  flags: PropTypes.object,
  filters: PropTypes.object,
  project: PropTypes.object,
  cartActions: PropTypes.shape({
    addToCart: PropTypes.func,
    emptyFilters: PropTypes.func,
    removeFilter: PropTypes.func
  })
}

function mapStateToProps (state) {
  return {
    filters: state.filters,
    project: state.projects.selectedProject
  }
}

function mapDispatchToProps (dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default compose(
  withLDConsumer(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProductListingScreen)
