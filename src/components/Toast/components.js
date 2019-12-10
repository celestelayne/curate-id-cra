import styled from 'styled-components'
import { Flex, Text } from '@knotel/cinderblock'

import theme from '../../theme'

export const Container = styled(Flex)`
  width: fit-content;
  min-width: 350px;
  flex-direction: column;
  box-shadow: ${theme.boxShadows[1]};
  background: ${theme.colors.white};
  padding: ${theme.space[3]}px;
  user-select: none;
  position: fixed;
  transition: all 500ms ease-in;
  left: ${theme.space[4]}px;
  ${props => props.open ? `
    bottom: ${theme.space[4]}px;
    ` : `
    bottom: -${theme.space[6]}px;
    `}
`

export const Row = styled(Flex)`
  flex: 1;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${theme.space[2]}px;
  }
`

export const Title = styled(Text)`
  color: ${theme.colors.success};
  font-size: ${theme.fontSizes[1]}px;
  font-weight: 600;
`

export const Description = styled(Text)`
  margin-left: calc(20px + ${theme.space[2]}px);
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes[1]}px;
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: ${theme.space[2]}px;
`
