import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Flex, Text } from '@knotel/cinderblock'

import theme from '../../theme'
import CloseIcon from '../../assets/filter-remove.svg'

import config from './config'

const Badge = styled(Flex)`
  height: 24px;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid #607D8B;
  border-radius: 30px;
  box-sizing: border-box;
  margin: 8px;
  user-select: none;
`

const Label = styled(Text)`
  font-size: ${theme.fontSizes[0]}px;
  line-height: ${theme.fontSizes[0]}px;
  color: ${theme.colors.labelText};
  margin-right: ${theme.space[1]}px;
`

const CloseButton = styled.img`
  width: 10px;
  height: 10px;
  object-fit: contain;
  pointer-events: none;
`

const ClearButton = styled(Button)``

class FilterTabs extends React.Component {
  render () {
    const { filters, clearFilters, removeFilter } = this.props

    const catalogs = filters.catalog
    const categories = filters.category
    const badges = []

    Object.keys(catalogs).forEach(catalog => {
      if (catalogs[catalog]) {
        badges.push(config[catalog])
      }
    })

    Object.keys(categories).forEach(category => {
      if (categories[category]) {
        badges.push(config[category])
      }
    })

    if (badges.length === 0) {
      return null
    }

    return (
      <Flex wrap mt={4} alignItems="center">
        {badges.map(filter => (
          <Badge onClick={() => removeFilter(filter.key)} key={filter.id}>
            <Label>{filter.fieldName}</Label>
            <CloseButton src={CloseIcon} />
          </Badge>
        ))}
        <ClearButton onClick={clearFilters}>Clear filters</ClearButton>
      </Flex>
    )
  }
}

FilterTabs.propTypes = {
  clearFilters: PropTypes.func,
  removeFilter: PropTypes.func,
  filters: PropTypes.object,
}

FilterTabs.displayName = 'FilterTabs'

export default FilterTabs
