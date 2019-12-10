import styled from 'styled-components'
import { Text, Heading, Label } from '@knotel/cinderblock'

export const InfoHeader = styled(Heading)`
  font-size: ${props => props.theme.fontSizes[4]}px;
  font-weight: normal;
  margin-bottom: ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries['md']} {
    font-size: ${props => props.theme.fontSizes[5]}px;
  }
`
export const InfoSubHeader = styled(Heading)`
  font-size: ${props => props.theme.fontSizes[3]}px;
  font-weight: normal;
  text-align: center;
  margin: ${props => props.theme.space[4]}px 0;
  ${props => props.theme.mediaQueries['md']} {
    font-size: ${props => props.theme.fontSizes[4]}px;
  }
`

export const InfoLabel = styled(Label)`
  font-family: ${props => props.theme.font};
  font-weight: 300;
  font-size: ${props => props.theme.fontSizes[1]}px;
  color: ${props => props.theme.colors.gray};
  margin-top: ${props => props.theme.space[1]}px;
  margin-bottom: ${props => props.theme.space[1]}px;
  text-transform: uppercase;
`

export const CostValue = styled(Text)`
  font-size: ${props => props.theme.fontSizes[4]}px;
  margin-bottom: ${props => props.theme.space[3]}px;
`

export const InfoText = styled(Text)`
  font-size: ${props => props.theme.fontSizes[3]}px;
  color: ${props => props.theme.colors.text};

  ${props => props.theme.mediaQueries['md']} {
    font-size: ${props => props.theme.fontSizes[2]}px;
  }
`

export const DescriptionLabel = styled(Label)`
  font-family: ${props => props.theme.font};
  font-weight: 300;
  color: ${props => props.theme.colors.gray};
  margin-top: ${props => props.theme.space[3]}px;
  font-size: ${props => props.theme.fontSizes[2]}px;
  text-transform: uppercase;

  ${props => props.theme.mediaQueries['md']} {
    font-size: ${props => props.theme.fontSizes[3]}px;
  }
`

export const DescriptionText = styled(Text)`
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.space[1]}px;
  font-size: ${props => props.theme.fontSizes[3]}px;
`
