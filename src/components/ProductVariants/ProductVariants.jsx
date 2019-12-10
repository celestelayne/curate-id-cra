import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Text } from '@knotel/cinderblock'

import ProductCard from '../ProductCard/ProductCard'

const ProductsNullstate = styled(Text)`
  align-self: center;
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes[2]}px;
`
// setting flexWrap property not working for some reason
const SpacesContainer = styled(Flex)`
  flex-wrap: wrap;
`

class ProductVariants extends React.Component {
  render () {
    const { relatedProducts, sku } = this.props
    return (
      <Flex flexDirection="column" px={3}>
        {
          relatedProducts.length && sku
            ? <SpacesContainer> {
              relatedProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))
            } </SpacesContainer>
            : <ProductsNullstate>No variants found</ProductsNullstate>
        }
      </Flex>
    )
  }
}

ProductVariants.propTypes = {
  relatedProducts: PropTypes.array,
  sku: PropTypes.string
}

ProductVariants.displayName = 'ProductVariants'

export default ProductVariants
