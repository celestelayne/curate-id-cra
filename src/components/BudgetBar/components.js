import styled from 'styled-components'
import { Text, Flex } from '@knotel/cinderblock'
import { InfoLabel } from '../Txt'
import BaseProgressBar from './mock.progressBar'

export const Container = styled(Flex)`
  align-items: center;
`

export const BudgetLine = styled(Flex)`
  align-items: center;
  margin-bottom: ${props => props.theme.space[1]}px;
  margin-right: 35px;
  ${props =>
    props.hasNegativeBudget
      ? `
    color: ${props => props.theme.colors.error};
  `
      : `
    color: ${props => props.theme.colors.grey};
  `}
  ${props => props.theme.mediaQueries['md']} {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`

export const BudgetValue = styled(Text)`
  font-size: ${props => props.theme.fontSizes[5]}px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  line-height: ${props => props.theme.space[4]}px;
  color: ${props => (props.textColor ? props.textColor : null)};
  transition: color 1s ease-out;
`

export const BudgetLabel = styled(InfoLabel)`
  font-size: ${props => props.theme.fontSizes[0]}px;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-left: ${props => props.theme.space[1]}px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  width: auto;
`

export const ProgressBar = styled(BaseProgressBar)`
  width: 100%;
  height: ${props => props.theme.space[3]}px;
  align-self: flex-end;
  justify-content: flex-end;
  background: ${props => props.bg || '#49aee2'};
  transition: background-color 1s ease-out;
  & > div {
    height: ${props => props.theme.space[3]}px;
    transition: width 1s ease-out;
  }
`

ProgressBar.displayName = 'Budget Progress Bar'
