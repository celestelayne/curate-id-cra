import styled from 'styled-components'
import { Button, Flex } from '@knotel/cinderblock'
import { InputField } from '../../fields'

export const StyledSubmitButton = styled(Button)`
  padding: 12px 24px;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const InputFieldWrapper = styled(Flex)`
  margin-bottom: 24px;
  &>div:not(:last-child){
    margin-right: 24px;
  }
`

export const ShortInputField = styled(InputField)`
  font-family: ${props => props.theme.font};
  max-width: 115px;
  ${props => props.readOnly ? `
  &>input,
  &>input:hover,
  &>input:focus {
    border: none;
    pointer-events: none;
  }
  ` : ''}
`

export const CostField = styled(InputField)`
  font-family: ${props => props.theme.font};
  &>input,
  &>input:hover,
  &>input:focus {
    font-size: ${props => props.theme.fontSizes[4]}px;
    border: none;
    pointer-events: none;
  }
`
