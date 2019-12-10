import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Flex, Heading, Text, Icon } from '@knotel/cinderblock'
import theme from '../../theme'

const GREY = '#CFD8DC'

const Wrapper = styled(Box)`
  border: 1px solid ${GREY};
`

const Collapser = styled(Icon)`
  cursor: pointer;
  align-self: center;
`

class Collapsable extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  handleCollapserClick = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  render () {
    return (
      <Wrapper mt={this.props.mt}>
        <Flex p={3} justifyContent="space-between">
          <Box>
            <Heading.h2 m={0} color={theme.colors.darkPurple} bold>
              {this.props.title}
            </Heading.h2>
            <Text color={theme.colors.semiGray}>{this.props.subtitle}</Text>
          </Box>
          <Collapser
            onClick={this.handleCollapserClick}
            size={32}
            name={this.state.isOpen ? 'ChevronUp' : 'ChevronDown'}
          />
        </Flex>
        {this.state.isOpen ? this.props.children : null}
      </Wrapper>
    )
  }
}

Collapsable.propTypes = {
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.object
}

Collapsable.displayName = 'Collapsable'

export default Collapsable
