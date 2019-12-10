import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Popover, { PopoverItem, PopoverBackground } from '../Popover/Popover'
import Sorting from '../../assets/sorting.svg'

export const SORTING_CRITERIA_LIST = {
  MOVE_IN_DATE: 'Move in date',
  DESIGNER: 'Designer',
  NEWEST_FIRST: 'Newest first'
}

const Opener = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`

class ListSorter extends React.PureComponent {
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
    const { setSortingCriterion } = this.props
    return (
      <Popover
        isOpen={this.state.isOpen}
        onClickOutside={this.handleVisibility}
        content={
          <PopoverBackground>
            {Object.keys(SORTING_CRITERIA_LIST).map((key, idx) => (
              <PopoverItem key={idx}
                onClick={() => {
                  this.handleVisibility()
                  setSortingCriterion(SORTING_CRITERIA_LIST[key])
                }}
              >
                {SORTING_CRITERIA_LIST[key]}
              </PopoverItem>
            ))}
          </PopoverBackground>
        }
      >
        <Opener onClick={this.handleVisibility} src={Sorting} />
      </Popover>
    )
  }
}

ListSorter.propTypes = {
  setSortingCriterion: PropTypes.func,
}

export default ListSorter
