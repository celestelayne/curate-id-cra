import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex } from '@knotel/cinderblock'

const Wrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  &:last-child{
    border-bottom: none;
  }
`

const ItemContainer = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
`

const Item = ({ children, width, align }) => (
  <Box width={width}>
    <Flex justifyContent={align} alignItems="center">
      <ItemContainer>{children}</ItemContainer>
    </Flex>
  </Box>
)

class ProjectListItem extends React.Component {
  render () {
    const { item, config } = this.props
    return (
      <Wrapper alignItems="center" p={3}>
        {config.map(row => (
          <Item key={row.value} align={row.align} width={[row.width]}>
            {row.accessor(item, this)}
          </Item>
        ))}
      </Wrapper>
    )
  }
}

Item.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  align: PropTypes.string,
}

ProjectListItem.propTypes = {
  item: PropTypes.object,
  config: PropTypes.array,
}

export default ProjectListItem
