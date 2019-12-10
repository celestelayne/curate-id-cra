import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex, Input, Text } from '@knotel/cinderblock'
import { InfoLabel } from '../Txt'
import { formatCurrency } from '../../util'

import { trackQuantityChanged } from '../../tracking'

const SmallerInput = styled(Input)`
  padding-top: ${props => props.theme.space[2]}px;
  padding-bottom: ${props => props.theme.space[2]}px;
  max-width: 50px;
`

class QuantityCalc extends React.Component {
  handleQuantityChange = e => {
    e.target.value = Number.parseInt(e.target.value)
    trackQuantityChanged(this.props.id, Number(e.target.value) || 0)
    this.props.onChange(Number(e.target.value))
  }

  render () {
    const { label, price, quantity } = this.props
    return (
      <Box ml={2}>
        <InfoLabel hidden={!label}>Quantity</InfoLabel>
        <Flex>
          <Box width={!label ? 98 : 50} mr={3} ml={!label ? 1 : 0}>
            <SmallerInput
              id="quantity"
              name="quantity"
              type="number"
              pattern="[0-9]*"
              min="1"
              onClick={e => e.stopPropagation()}
              value={Number(quantity)}
              onChange={this.handleQuantityChange}
            />
          </Box>
          {/* [1 / 4] not working for some reason, so I left 25% */}
          <Box ml={label ? [1 / 3] : '13%'} mt={2}>
            <Text color={'#001833'} weight={500} fontSize={2}>
              {price && quantity ? formatCurrency(price * quantity) : '$0.00'}
            </Text>
          </Box>
        </Flex>
      </Box>
    )
  }
}

QuantityCalc.propTypes = {
  id: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  label: PropTypes.bool,
  onChange: PropTypes.func
}

export default QuantityCalc
