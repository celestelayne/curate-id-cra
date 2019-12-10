import React from 'react'
import PropTypes from 'prop-types'

import RequestInfoForm from '../../forms/RequestInfo'

import { Card, Badge, Neighborhood, Address, Options } from './components'

const ON_DEMAND_LABEL = 'On demand'
const SEPARATOR_SYMBOL = ' | '

const RequestInfo = ({ neighborhood, badge, address, options }) => (
  <Card p={3}>
    <Badge mb={3}>{badge}</Badge>
    <Neighborhood mb={1}>{neighborhood}</Neighborhood>
    <Address mb={3}>{address}</Address>
    <Options mb={4}>{options.join(SEPARATOR_SYMBOL)}</Options>
    <RequestInfoForm />
  </Card>
)

RequestInfo.propTypes = {
  badge: PropTypes.string.isRequired,
  neighborhood: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
}

RequestInfo.defaultProps = {
  badge: ON_DEMAND_LABEL,
  neighborhood: 'MIDTOWN SOUTH',
  address: '465 Madison Ave, 8th fl, New York, NY 10016',
  options: [ 'Move in ready', '80-100 seats', '2400 sq ft' ],
}

export default RequestInfo
