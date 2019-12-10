import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Flex } from '@knotel/cinderblock'
import theme from '../../theme'
import { hexToRgb } from '../../util'

const Header = styled(Flex)`
  height: ${props => props.theme.space[4]}px;
  background-color: ${props => `rgba(${hexToRgb(props.theme.colors.lightBlue)},0.25)`};
  align-items: center;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.darkPurple};
  padding-right: ${props => props.theme.space[2]}px;
  border-top: 1px solid ${props => props.theme.colors.borderGray};
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
`

const ListHeader = ({ title, hideTitle, headers }) => (
  <Header py={2} pl={1} mb={2}>
    {!hideTitle ? (
      <Flex width={[1 / 2]}>
        <Text fontSize={theme.fontSizes[0]} pl={2} caps>
          {title || 'Name'}
        </Text>
      </Flex>
    ) : null}
    <Flex width={[1 / 2]}>
      {headers.map(value => (
        <Box width={[1 / headers.length]}>
          <Text fontSize={theme.fontSizes[0]} caps>{value}</Text>
        </Box>
      ))}
    </Flex>
  </Header>
)

ListHeader.propTypes = {
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  headers: PropTypes.arrayOf(PropTypes.string)
}

ListHeader.defaultProps = {
  headers: ['Price', 'Quantity', 'Total', 'Upgrade']
}

export default ListHeader
