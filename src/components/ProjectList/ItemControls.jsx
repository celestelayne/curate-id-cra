import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Popover, { PopoverItem, PopoverBackground } from '../Popover/Popover'
import Dots from '../../assets/vertical_dots.svg'

const Opener = styled.img`
  cursor: pointer;
  width: 16px;
  height: 16px;
`

class ItemControls extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleVisibility = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }
  render () {
    const { context, item } = this.props
    return (
      <Popover
        isOpen={this.state.isOpen}
        onClickOutside={this.handleVisibility}
        content={
          <PopoverBackground>
            <PopoverItem
              onClick={() => {
                this.handleVisibility()
                context.props.onEdit(item.id)
              }}
            >
              Edit
            </PopoverItem>
            {context.props.selectedProjectType !== 'archived' ? (
              <PopoverItem
                onClick={() => {
                  this.handleVisibility()
                  context.props.onArchive(item.id)
                }}
              >
                Archive
              </PopoverItem>
            ) : null}
            <PopoverItem
              onClick={() => {
                this.handleVisibility()
                context.props.onDelete(item.id)
              }}
              additionalStyles={'color: red;'}
            >
              Delete
            </PopoverItem>
          </PopoverBackground>
        }
      >
        <Opener onClick={this.handleVisibility} src={Dots} />
      </Popover>
    )
  }
}

ItemControls.propTypes = {
  item: PropTypes.object,
  context: PropTypes.object
}

export default ItemControls
