import React from 'react'
import PropTypes from 'prop-types'

import {
  SearchInput as Input,
  SearchIcon,
  Container,
} from './components'

export const SearchInput = (props) => {
  return (
    <Container className={props.className}>
      <SearchIcon name="Search" />
      <Input id="search" name="search" type="search" {...props} />
    </Container>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: 'Search'
}

export default SearchInput
