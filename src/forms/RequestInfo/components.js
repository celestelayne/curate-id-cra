import styled from 'styled-components'

import { StyledSubmitButton, Form } from '../shared'

export const StyledForm = styled(Form)`
  margin-bottom: 0;
`

export const SubmitButton = styled(StyledSubmitButton)`
height: 52px;
${props => props.theme.mediaQueries['md']} {
  width: auto;
}
`
