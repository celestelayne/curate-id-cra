import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`

const calculateTotal = (products, projectId) => {
  const filteredProducts = products.filter(p => (Boolean(p) && projectId ? p.projectId === projectId : true))
  const prices = filteredProducts.map(product => product.usTotalCost * product.quantity)
  const total = prices.reduce((a, b) => a + b, 0)
  return total
}

class CartFetcher extends React.Component {
  shouldComponentUpdate (nextProps) {
    const allProducts = nextProps.products
      .filter(product => (nextProps.project ? product.projectId === nextProps.project.id : true))
      .concat(nextProps.offPlatformItems || [])
    const total = calculateTotal(allProducts, nextProps.project && nextProps.project.id)
    if (nextProps.totalCost !== total) {
      return true
    } else {
      return false
    }
  }
  render () {
    return <StyledContainer>{this.props.children}</StyledContainer>
  }
}

function mapStateToProps (state) {
  return {
    products: state.cart.products,
    offPlatformItems: state.cart.offPlatformItems,
    project: state.projects.selectedProject,
    totalCost: state.cart.totalCost
  }
}

CartFetcher.propTypes = {
  children: PropTypes.any,
  products: PropTypes.any,
  offPlatformItems: PropTypes.any,
  totalCost: PropTypes.number,
  project: PropTypes.object
}

export default connect(mapStateToProps)(CartFetcher)
