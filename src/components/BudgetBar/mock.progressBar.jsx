import React from 'react'
import { Flex } from '@knotel/cinderblock'
import PropTypes from 'prop-types'

const ProgressBar = props => {
  return (
    <Flex
      className={props.className}
      alignItems="flex-start"
      bg={props.bg}
      mb={2}
    >
      <Flex
        width={props.progress}
        bg={props.color}
        justifyContent={props.alignItems}
      >
        {props.children}
      </Flex>
    </Flex>
  )
}

ProgressBar.displayName = 'ProgressBar'

ProgressBar.propTypes = {
  className: PropTypes.string,
  alignItems: PropTypes.string,
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.string,
  progress: PropTypes.string,
  children: PropTypes.node,
}

ProgressBar.defaultProps = {
  alignItems: 'flex-end',
  color: 'green',
  bg: 'lightGray',
  progress: 0,
}

export default ProgressBar
