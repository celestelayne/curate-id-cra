import styled from 'styled-components'
import { Text, Heading, Button } from '@knotel/cinderblock'

import theme from '../../theme'
import BaseModal, { ModalContent } from '../BaseModal'

export const Title = styled(Heading.h4)`
  margin: 0;
  margin-bottom: ${theme.space[3]}px;
`

export const SubTitle = styled(Text)`
  font-size: ${theme.fontSizes[2]}px;
  margin: 0;
  margin-bottom: ${theme.space[3]}px;
`

export const Modal = styled(BaseModal)`
  width: 100%;
  justify-content: center;
  ${props => props.theme.mediaQueries['md']} {
    max-height: calc(100% - 64px);
    overflow-y: auto;
    max-width: 480px;
    width: 50%;
  }
`

export const Content = styled(ModalContent)`
  position: relative;
  min-height: 210px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const StyledButton = styled(Button)`
  width: 150px;
  &:not(:first-child) {
    margin-left: ${theme.space[3]}px;
  }
  ${props => props.secondary ? `
    background: ${theme.colors.tertiary};
    color: ${theme.colors.white};
    &:hover {
      background: ${theme.colors.burgundy};
    }
  ` : ''}
  ${props => props.outlined ? `
  margin: ${theme.space[2]}px 0;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.blue};
  color: ${theme.colors.blue};
  &:hover{
    background: #EEE;
    border: 2px solid ${theme.colors.darkBlue};
    color: ${theme.colors.darkBlue};
  }
  ` : ''}
`
