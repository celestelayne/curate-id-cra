import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'
import { Banner, Box, Container, Divider, Flex } from '@knotel/cinderblock'

import ToastService from '../services/toast'
import ProductVariants from '../components/ProductVariants/ProductVariants'
import { InfoHeader, InfoLabel, InfoText, InfoSubHeader, CostValue } from '../components/Txt'
import { ADD_TO_CART_MUTATION } from '../mutations'
import { SINGLE_PRODUCT_QUERY, CART_ITEMS_QUERY, CART_ITEMS_COUNT, CART_ITEMS_TOTAL_SUM } from '../queries'
import { formatCurrency } from '../util'
import BudgetBar from '../components/BudgetBar'
import ProductPhotos from '../components/ProductPhotos'
import ProductQuantity from '../forms/ProductQuantity'

import { trackProductDetailView, trackAddProductToCart } from '../tracking'

const TopFlex = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${props => props.theme.mediaQueries['sm']} {
    flex-direction: row;
  }
`

const ItemFlex = styled(Flex)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const ProductInfoItem = styled(Flex)`
  width: 100%;
  flex-direction: column;
  text-align: center;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries['sm']} {
    padding: 0 ${props => props.theme.space[3]}px;
  }
`

const InfoPanel = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 84px;
  ${props => props.theme.mediaQueries['sm']} {
    align-items: flex-start;
    flex-direction: row;
  }
`

class ProductDetailScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      quantity: 1
    }
  }

  handleAddToCart = (addToCart, product) => values => {
    const projectId = this.props.project && this.props.project.id
    addToCart({
      variables: {
        projectId,
        ...product,
        vendor: product.vendor || '',
        quantity: values.quantity,
        isUpgrade: false,
        productTotalCost: values.quantity * values.cost
      }
    })
    ToastService.showMessage('Product added', `You have successfully added ${product.name}.`)
    trackAddProductToCart(product.id, values.quantity, values.cost)
  }

  render () {
    const { id } = this.props.match.params
    const { project } = this.props
    return (
      <>
        <BudgetBar project={project} />
        <Container>
          <Query
            variables={{ productId: id }}
            query={SINGLE_PRODUCT_QUERY}
            onCompleted={data => trackProductDetailView(data.Product.id)}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error || !data.Product) {
                return (
                  <Banner
                    textAlign="left"
                    mb={2}
                    p={3}
                    width={1}
                    header="Error"
                    color="error"
                    text={(error && error.message) || 'Unknown error'}
                    bg="lightRed"
                  />
                )
              }

              const product = data.Product
              const cost = Number(product.usTotalCost)

              return (
                <React.Fragment>
                  <Box mt={4}>
                    <TopFlex>
                      <ItemFlex alignItems="center" px={4}>
                        <ProductPhotos photos={product.Photos} />
                      </ItemFlex>
                      <ItemFlex px={4}>
                        <InfoHeader>{product.name}</InfoHeader>
                        <CostValue>{formatCurrency(cost)}</CostValue>
                        <Mutation
                          refetchQueries={[
                            { query: CART_ITEMS_QUERY },
                            { query: CART_ITEMS_COUNT },
                            { query: CART_ITEMS_TOTAL_SUM }
                          ]}
                          mutation={ADD_TO_CART_MUTATION}
                        >
                          {(addToCart, { loading }) => (
                            <ProductQuantity
                              disabled={!project}
                              initialValues={{ cost, quantity: 1 }}
                              onSubmit={this.handleAddToCart(addToCart, product)}
                            />
                          )}
                        </Mutation>
                      </ItemFlex>
                    </TopFlex>

                    <InfoSubHeader>Product Info</InfoSubHeader>

                    <InfoPanel px={4}>
                      <ProductInfoItem>
                        <InfoLabel>Dimensions</InfoLabel>
                        <InfoText>
                          {product.type === 'F.US' ? product.dimensionsImperialWxDxH : product.dimensionsMetricCmWxDxH}
                        </InfoText>
                      </ProductInfoItem>
                      <ProductInfoItem>
                        <InfoLabel>Lead Time</InfoLabel>
                        <InfoText>{product.leadTime || '--'}</InfoText>
                      </ProductInfoItem>
                      <ProductInfoItem>
                        <InfoLabel>Finish</InfoLabel>
                        <InfoText>{product.finish || '--'}</InfoText>
                      </ProductInfoItem>
                      <ProductInfoItem>
                        <InfoLabel>Vendor</InfoLabel>
                        <InfoText>
                          {product.Vendors && product.Vendors.length ? product.Vendors[0].name : '--'}
                        </InfoText>
                      </ProductInfoItem>
                      <ProductInfoItem>
                        <InfoLabel>Pricing Tier</InfoLabel>
                        <InfoText>{product.catalog || '--'}</InfoText>
                      </ProductInfoItem>
                    </InfoPanel>

                    <Divider />

                    <InfoSubHeader>Product Variants</InfoSubHeader>
                    <ProductVariants sku={product.knotelSku} relatedProducts={product.SimilarProducts} />
                  </Box>
                </React.Fragment>
              )
            }}
          </Query>
        </Container>
      </>
    )
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart,
    project: state.projects.selectedProject
  }
}

ProductDetailScreen.propTypes = {
  match: PropTypes.any,
  project: PropTypes.object
}

export default connect(mapStateToProps)(ProductDetailScreen)
