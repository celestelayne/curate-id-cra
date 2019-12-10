import React from 'react'
import PropTypes from 'prop-types'
import Popover from 'react-tiny-popover'
import styled, { css } from 'styled-components'
import theme from '../../theme'

export const PopoverBackground = styled.div`
  background-color: white;
`

export const popoverItemStyles = css`
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  line-height: 17px;
  padding: 16px;
  width: 180px;
  color: ${theme.colors.text};
  transition: background-color 0.2s ease;
  :hover {
    background-color: #f5f5f5;
  }
`

export const PopoverItem = styled.div`
  ${popoverItemStyles}
  ${props => props.additionalStyles}
`

const containerStyle = {
  zIndex: 1001,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16), 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 0px 0px #d1d6db'
}

export default class CustomPopover extends React.PureComponent {
  render () {
    return (
      <Popover
        padding={this.props.padding}
        isOpen={this.props.isOpen}
        onClickOutside={this.props.onClickOutside}
        position={this.props.position}
        content={this.props.content}
        containerStyle={containerStyle}
        disableReposition
      >
        {this.props.children}
      </Popover>
    )
  }
}

CustomPopover.propTypes = {
  padding: PropTypes.number,
  position: PropTypes.oneOf(['bottom', 'right', 'top', 'left']),
  onClickOutside: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.node
}

CustomPopover.defaultProps = {
  position: 'bottom'
}
