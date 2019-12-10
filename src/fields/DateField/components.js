import styled from 'styled-components'
import { Input, Text, Flex } from '@knotel/cinderblock'

import theme from '../../theme'

export const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: ${theme.radius};
`

export const PickerContainer = styled(Flex)`
  position: absolute;
  bottom: 0;
  .react-datepicker {
    z-index: 1;
    position: absolute;
  }
`

export const Error = styled(Text)`
  visibility: hidden;
  display: none;
`

export const Chevron = styled.img`
  height: 100%;
  width: 14px;
  margin-right: 12px;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  position: absolute;
  right: 0;
  margin-top: 10px;
  ${props => props.hasError ? `
    margin-top: calc(10px - ${theme.space[2]}px);
  ` : ''}
  ${props => props.opened ? `
    transform: scaleY(-1);
  ` : ''}
`

export const StyledInput = styled(Input)`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  font-family: ${theme.font};
  font-size: ${theme.fontSizes[1]}px;
  color: transparent;
  border-radius: ${theme.radius};
  padding: 0 8px;
  line-height: 17px;
  text-shadow: 0 0 0 ${theme.colors.text};
  outline: none;
  box-shadow: none;
  &::placeholder {
    color: transparent;
    text-shadow: 0 0 0 ${theme.colors.placeholderText};
  }
  ${props => props.hasError ? `
    border: 1px solid ${theme.colors.error} !important;
  ` : `
    border: 1px solid ${theme.colors.borderGray};
  `}
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
  &:hover,
  &:focus,
  &:active {
    border: 1px solid ${theme.colors.primary};
  }
`

export const FieldName = styled(Text)`
  font-family: ${theme.font};
  font-weight: ${theme.fontWeights.bold};
  line-height: ${theme.lineHeights.standard};
  color: ${theme.colors.placeholderText};
  font-size: 10px;
  margin-left: 8px;
  margin-bottom: 4px;
  user-select: none;
  text-transform: uppercase;
`
