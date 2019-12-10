
import styled from 'styled-components'
import { Flex } from '@knotel/cinderblock'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export const overlayStyle = {
  backgroundColor: 'rgba(52, 73, 94, 0.5)',
  transition: 'all 500ms linear',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001
}

export const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
}

export const modalStyles = {
  overlay: overlayStyle,
  content: contentStyle,
}

export const Modal = styled(ReactModal)`
  outline: none;
  background: #FFFFFF;
  box-shadow: ${props => props.theme.boxShadows[1]};
`

export const Content = styled(Flex)`
  padding: ${props => props.theme.space[3]}px;
`
