import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import ItemControls from './ItemControls'
import { getStateByValue, getTierByFoundationValue, getTypeByFoundationValue } from '../dataMappers'

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.blue};
  text-decoration: none;
`

const ItemContainer = styled.div`
  padding-right: ${props => props.theme.space[2]}px;
`

const LIST_CONFIG = [
  {
    value: 'Client',
    width: 2 / 13,
    accessor: (item, context) => (
      <StyledLink
        onClick={() => {
          context.props.setProject(item)
        }}
        to={'/products'}
      >
        {item['name']}
      </StyledLink>
    )
  },
  {
    value: 'Move In Date',
    width: 2 / 13,
    accessor: item => moment(item['moveInDate']).format('MMMM D, YYYY')
  },
  {
    value: 'Address',
    width: 2 / 13,
    accessor: item => (
      <ItemContainer>{`${item.address}, ${item.city}, ${getStateByValue(item.state).label}`}</ItemContainer>
    )
  },
  {
    value: 'SQFT',
    width: 1 / 13,
    accessor: item => item['size']
  },
  {
    value: 'Pricing Tier',
    width: 2 / 13,
    accessor: item => getTierByFoundationValue(item['tier']).label
  },
  {
    value: 'Type',
    width: 2 / 13,
    accessor: item => getTypeByFoundationValue(item.type) ? getTypeByFoundationValue(item.type).label : ''
  },
  {
    value: 'Designer',
    width: 1 / 13,
    accessor: item => item.designer || '...'
  },
  {
    value: '',
    width: 1 / 13,
    align: 'center',
    accessor: (item, context) => <ItemControls item={item} context={context} />
  }
]

export default LIST_CONFIG
