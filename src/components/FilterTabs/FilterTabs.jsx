import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex, Heading, Icon, Text } from '@knotel/cinderblock'

import { trackFiltersHide, trackFiltersShow } from '../../tracking'

import TabWrapper from './TabWrapper'

const H3 = styled(Heading)`
  font-size: ${props => props.theme.fontSizes[2]}px;
  line-height: 1.5;
  cursor: pointer;
`
const Filters = styled(Text)`
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  font-size: 12px;
  line-height: 2;
`
const Transformable = styled(Box)`
  transition-duration: ${props => props.theme.duration.fast};
  transform: rotate(${props => props.rotation || '0'}deg);
`

class FilterTabs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: true,
      facets: {}
    }
  }

  _handleToggle = () => {
    const expanded = !this.state.expanded
    expanded ? trackFiltersShow() : trackFiltersHide()
    this.setState({ expanded })
  }

  _calcFilters = (filters) => {
    const facets = {}
    if (filters) {
      Object.keys(filters).forEach(filter => {
        Object.keys(filters[filter]).forEach(facet => {
          facets[facet] = filters[filter][facet]
        })
      })
    }
    this.setState({ facets }, () => {
      this.props.filterProducts(facets)
    })
  }

  render () {
    const { facets, expanded } = this.state
    const { mt } = this.props
    return (
      <Box mt={mt} width={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flex={2} onClick={this._handleToggle}>
            { expanded
              ? <Transformable rotation={180}><Icon name="Filter" /></Transformable>
              : <Transformable rotation={0}><Icon name="Filter" /></Transformable>
            }
            <H3 mr={2} color="blue">{ expanded ? 'Hide Filters' : 'Show Filters' }</H3>
            <Filters>
              {
                Object.keys(facets).filter(f => facets[f] === true).length < 1
                  ? 'None Selected'
                  : Object.keys(facets).map(f =>
                    facets[f] === true ? f + ', ' : null
                  )
              }
            </Filters>
          </Flex>
        </Flex>
        { expanded ? <TabWrapper onFiltersChanged={filters => this._calcFilters(filters)} /> : null }
      </Box>
    )
  }
}

FilterTabs.propTypes = {
  filterProducts: PropTypes.func,
  mt: PropTypes.number
}

FilterTabs.displayName = 'FilterTabs'

export default FilterTabs
