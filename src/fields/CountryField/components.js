import BaseSelect from 'react-select'
import styled from 'styled-components'
import { Text, Flex } from '@knotel/cinderblock'

import theme from '../../theme'

export const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  position: relative;
`

export const Select = styled(BaseSelect)`
  height: 50px;
  width: 100%;
  .select__control {
    height: 50px;
    border-radius: 2px;
    outline: none;
    box-shadow: none;
    ${props => props.hasError ? `
    border: 1px solid ${theme.colors.error} !important;
    ` : `
    border: 1px solid ${theme.colors.borderGray};
    `}
    &:hover {
      border: 1px solid ${theme.colors.primary};
      outline: none;
      box-shadow: none;
    }
  }
  .select__control--menu-is-open {
    .chevron {
      transform: scaleY(-1);
    }
  }
  .select__control--is-focused {
    border: 1px solid ${theme.colors.primary};
  }
  .select__indicator-separator {
    display: none;
  }
  .select__single-value,
  .select__option,
  .select__placeholder {
    font-family: ${theme.font};
    line-height: 18px;
    font-size: 14px;
    color: ${theme.colors.text};
  }
  .select__placeholder {
    color: ${theme.colors.placeholderText};
  }
  .select__option--is-focused {
    background-color: #F5F5F5;
  }
  .select__option--is-selected {
    background-color: #E0E0E0;
  }
  .select__option--is-disabled {
    background-color: #B5B5B5;
  }
  .select__option:active {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
  .select__single-value {
    padding-right: 28px;
  }
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
  ${props => props.opened ? `
    transform: scaleY(-1);
  ` : ''}
`

export const Flag = styled.img`
  width: 28px;
  height: 20px;
  object-fit: contain;
  margin-right: ${theme.space[2]}px;
`

export const FlagPlaceholder = styled.div`
  width: 20px;
  height: 14px;
  background-color: #E0E0E0;
  margin-right: ${theme.space[2]}px;
`

export const Label = styled(Text)`
  color: ${theme.colors.text};
`

export const PlaceholderText = styled(Text)`
  color: ${theme.colors.placeholderText};
`

export const ItemContainer = styled(Flex)`
  align-items: center;
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
