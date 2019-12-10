import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box, CloseButton, Flex, Image, Text } from '@knotel/cinderblock'
import { CustomCheckbox } from '../../fields/CustomCheckbox'
import { CART_ITEMS_QUERY, CART_ITEMS_COUNT, CART_ITEMS_TOTAL_SUM } from '../../queries'
import { REMOVE_FROM_CART_MUTATION, UPDATE_QUANTITY_MUTATION } from '../../mutations'
import { trackRemoveProductFromCart } from '../../tracking'
import ToastService from '../../services/toast'
import { formatCurrency } from '../../util'
import theme from '../../theme'

import QuantityCalc from '../QuantityCalc/QuantityCalc'
const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-size: ${theme.fontSizes[1]}px;
  text-decoration: none;
`

const Wrapper = styled(Flex)`
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  padding-left: ${props => props.theme.space[2]}px;
  padding-right: ${props => props.theme.space[2]}px;
`

const StyledCloseButton = styled(CloseButton)`
  margin-top: ${props => props.theme.space[1]}px;
`

const Checkbox = styled(CustomCheckbox)`
  justify-content: flex-start;
  margin-left: 10px;
  cursor: pointer;
`

class CartListItem extends React.Component {
  _handleUpdateQuantity = (quantity, updateQuantity) => {
    updateQuantity({ variables: { id: this.props.id, quantity } })
    ToastService.showMessage('Quantity change', `You have changed to ${quantity} units.`)
  }

  handleRemoveClick = (id, quantity, usTotalCost, removeFromCart) => {
    removeFromCart({ variables: { id } })
    ToastService.showMessage('Product removed', `You have successfully removed a product from your order.`)
    trackRemoveProductFromCart(id, quantity, usTotalCost)
  }

  handleLinkClick = () => {
    window.scrollTo(0, 0)
  }

  render () {
    const {
      id,
      Photos,
      name,
      vendor,
      color,
      usTotalCost,
      quantity,
      onItemClick,
      rawPhotoUrl,
      isUpgrade,
      onCheckboxClick
    } = this.props
    const isPhotoAvailable = (Photos && Photos.length) || rawPhotoUrl
    const idx = 0
    return (
      <Wrapper onClick={onItemClick ? () => onItemClick(id) : void 0} alignItems="center" py={2}>
        <Box mb="auto" mt={2} width={'49.5%'}>
          <Flex alignItems="center">
            <Box>
              {isPhotoAvailable ? <Image width="64" src={Photos ? Photos[idx].imgixUrl : rawPhotoUrl} /> : null}
            </Box>
            <Box ml={2}>
              {onItemClick || !isPhotoAvailable ? (
                <>
                  <Text color={theme.colors.primary} fontSize={2}>
                    {name}
                  </Text>
                  <Text fontSize={2}>{vendor}</Text>
                  <Text fontSize={2}>{color}</Text>
                </>
              ) : (
                <StyledLink onClick={this.handleLinkClick} to={`/product/${id}`}>
                  <Text fontSize={2}>{name}</Text>
                </StyledLink>
              )}
            </Box>
          </Flex>
        </Box>
        <Box width="39%">
          <Flex>
            <Box mt={2} width={'29%'}>
              <Text color={'#001833'} fontSize={2}>
                {usTotalCost ? formatCurrency(usTotalCost) : 'N/A'}
              </Text>
            </Box>
            <Box width={[2 / 3]}>
              <Mutation
                refetchQueries={[
                  { query: CART_ITEMS_QUERY },
                  { query: CART_ITEMS_COUNT },
                  { query: CART_ITEMS_TOTAL_SUM }
                ]}
                mutation={UPDATE_QUANTITY_MUTATION}
              >
                {updateQuantity => (
                  <QuantityCalc
                    key={`${id}-${quantity}`}
                    price={usTotalCost}
                    quantity={quantity}
                    onChange={quantity => this._handleUpdateQuantity(quantity, updateQuantity)}
                  />
                )}
              </Mutation>
            </Box>
          </Flex>
        </Box>
        <Box width="8%" justifyContent="center">
          <Checkbox name={id} value={isUpgrade} onChange={onCheckboxClick} />
        </Box>
        <Mutation
          refetchQueries={[{ query: CART_ITEMS_QUERY }, { query: CART_ITEMS_COUNT }, { query: CART_ITEMS_TOTAL_SUM }]}
          mutation={REMOVE_FROM_CART_MUTATION}
        >
          {removeFromCart => (
            <StyledCloseButton
              color={theme.colors.placeholderText}
              onClick={e => {
                e.stopPropagation()
                this.handleRemoveClick(id, quantity, usTotalCost, removeFromCart)
              }}
            />
          )}
        </Mutation>
      </Wrapper>
    )
  }
}

CartListItem.propTypes = {
  id: PropTypes.string,
  Photos: PropTypes.array,
  name: PropTypes.string,
  vendor: PropTypes.string,
  color: PropTypes.string,
  usTotalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number,
  onItemClick: PropTypes.func,
  rawPhotoUrl: PropTypes.string,
  isUpgrade: PropTypes.bool,
  onCheckboxClick: PropTypes.func
}

export default CartListItem
