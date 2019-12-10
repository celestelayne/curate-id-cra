import styled from 'styled-components'

import BaseModal, { ModalContent } from '../BaseModal'

export const Modal = styled(BaseModal)`
  width: 100%;
  justify-content: center;
  ${props => props.theme.mediaQueries['md']} {
    max-height: calc(100% - 64px);
    overflow-y: auto;
    max-width: 480px;
    width: 50%;
  }

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const Content = styled(ModalContent)`
  position: relative;
`
