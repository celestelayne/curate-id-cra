import styled from 'styled-components'
import { Card as BaseCard, Flex, Text } from '@knotel/cinderblock'

import theme from '../../theme'

export const Card = styled(BaseCard)`
  width: 100%;
  max-width: 400px;
`

export const Badge = styled(Flex)`
  width: fit-content;
  background-color: #2BA84A;
  padding: ${theme.space[1]}px ${theme.space[2]}px;
  border-radius: ${theme.radius};
  text-transform: uppercase;
  font-size: ${theme.fontSizes[0]}px;
  color: ${theme.colors.white};
  user-select: none;
`

export const Neighborhood = styled(Text)`
  color: ${theme.colors.labelText};
  font-size: ${theme.fontSizes[1]};
  font-weight: ${theme.fontWeights.semiBold};
`

export const Address = styled(Text)`
  font-size: ${theme.fontSizes[5]}px;
  color: ${theme.colors.text};
`

export const Options = styled(Text)`
  font-size: ${theme.fontSizes[2]}px;
  color: ${theme.colors.text};
`
