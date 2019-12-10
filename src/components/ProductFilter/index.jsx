import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@knotel/cinderblock'

import Collapsable from '../Collapsable/Collapsable'
import FilterForm from '../../forms/FilterForm'

const OnlyDesktop = styled(Flex)`
  display: none;
  ${props => props.theme.mediaQueries['md']} {
    position: fixed;
    max-width: 270px;
    min-width: 150px;
    width: 20%;
    display: flex;
  }
`

const OnlyMobile = styled(Box)`
  ${props => props.theme.mediaQueries['md']} {
    display: none;
  }
`

export default class ProductFilter extends React.Component {
  render () {
    return (
      <React.Fragment>
        <OnlyDesktop>
          <FilterForm />
        </OnlyDesktop>
        <OnlyMobile>
          <Collapsable title="Filters" mt={4}>
            <Box px={3}>
              <FilterForm />
            </Box>
          </Collapsable>
        </OnlyMobile>
      </React.Fragment>
    )
  }
}
