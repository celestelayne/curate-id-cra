import styled from 'styled-components'
import { Input, Relative, Icon } from '@knotel/cinderblock'

export const Container = styled(Relative)`
  margin: 0 ${props => props.theme.space[2]}px;
`

export const SearchIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  position: absolute;
  left: 7px;
  top: 50%;
  margin-top: -12px;
  color: ${props => props.theme.colors.placeholderText};
`

export const SearchInput = styled(Input)`
  padding-left: 38px;
  &::placeholder {
    color: ${props => props.theme.colors.placeholderText};
  }
`

SearchInput.displayName = 'Search Input'
