import styled from 'styled-components'
import { Button, Text, Flex } from '@knotel/cinderblock'
import theme from '../theme'
import { InputField, DropDownField, CountryField } from '../fields'

export const StyledSubmitButton = styled(Button)`
  font-family: ${props => props.theme.font};
  ${props => props.right ? `
    margin-left: auto;
    width: fit-content;
  ` : ''}
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: ${theme.space[3]}px;
`

export const InputFieldWrapper = styled(Flex)`
  width: ${props => props.width || '100%'};
  margin-bottom: ${theme.space[3]}px;
  &>div:not(:last-child){
    margin-right: 24px;
  }
`

export const SectionTitle = styled(Text)`
  font-family: ${props => props.theme.font};
  font-size: ${props => props.theme.fontSizes[3]}px;
  line-height: ${props => props.theme.lineHeights.standard};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.space[3]}px;
`

export const FormTitle = styled(SectionTitle)`
  font-size: ${props => props.theme.fontSizes[4]}px;
  font-weight: 600;
`

export const ShortInputField = styled(InputField)`
  font-family: ${props => props.theme.font};
  max-width: ${props => props.width ? `${props.width * 100}%` : '165px'};
  ${props => props.readOnly ? `
  &>input,
  &>input:hover,
  &>input:focus {
    border: none;
    pointer-events: none;
  }
  ` : ''}
`

export const ShortDropDownField = styled(DropDownField)`
  max-width: ${props => props.width ? `${props.width * 100}%` : '175px'};
  `

export const ShortCountryField = styled(CountryField)`
  max-width: ${props => props.width ? `${props.width * 100}%` : '100%'};
`
