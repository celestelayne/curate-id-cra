import styled from 'styled-components'
import { Button, Text } from '@knotel/cinderblock'
import theme from '../theme'

export const SubmitButton = styled(Button)`
  margin: 0 auto;
  width: fit-content;
  padding: 14px 8px;
`

export const ExtendedSubmitButton = styled(Button)`
  font-family: ${props => props.theme.font};
  font-size: 16px;
  font-weight: ${props => props.theme.fontWeights.bold};
  border-radius: 2px;
  border: none;
  outline: none;
  color: ${theme.colors.white};
  padding: 14px 36px;
  background: none;
  background-color: ${theme.colors.blue};
  cursor: pointer;
`

export const CloseButton = styled(Text)`
  font-size: 16px;
  font-family: ${props => props.theme.font};
  color: ${theme.colors.blue};
  cursor: pointer;
`
