import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { theme, Flex } from '@knotel/cinderblock'
import { calcRentByFoundationData, formatCurrency, formatProgress, calculateBudgetUpgrades } from '../../util'

import { CART_ITEMS_TOTAL_SUM, CART_ITEMS_QUERY } from '../../queries'
import { Container, BudgetLabel, BudgetLine, BudgetValue, ProgressBar } from './components'
import { calculateColor } from './utils'

const PersistingContainer = styled(Container)`
  background: white;
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  width: 100%;
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
  top: ${props => (props.fixed ? 57 : -7)}px;
  /* ${props =>
    props.fixed
      ? ''
      : `
    margin-top: ${theme.space[4]}px;
  `}; */
  box-shadow: ${props => props.theme.boxShadows[0]};
  z-index: 1;
`

const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const Holder = styled(Flex)`
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  ${props => props.theme.mediaQueries['md']} {
    flex-direction: row;
  }
`

class BudgetBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollPositionY: 0
    }
  }

  componentDidMount () {
    return window.addEventListener('scroll', debounce(this.handleScroll, 16))
  }

  componentWillUnmount () {
    return window.removeEventListener('scroll', debounce(this.handleScroll, 16))
  }

  handleScroll = () => {
    const scrollPositionY = +window.scrollY
    return this.setState({ scrollPositionY })
  }

  render () {
    const { selectedProjectExist, className, isShort, project } = this.props
    return (
      <Query query={CART_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          const totalBudget =
            calcRentByFoundationData(project, { toCurrency: false }) +
            calculateBudgetUpgrades(
              data.cart.filter(product => product.projectId === project.id).filter(product => product.isUpgrade)
            )
          return (
            <Query query={CART_ITEMS_TOTAL_SUM}>
              {({ loading, error, data }) => {
                if (!selectedProjectExist) {
                  return null
                }
                const usedBudget = data.cartItemsTotalSum ? data.cartItemsTotalSum.sum : 0
                const remainingBudget = totalBudget - usedBudget
                const progressValue = formatProgress((usedBudget / totalBudget) * 100)
                const hasNegativeBudget = remainingBudget < 0
                const progressRemaining = `${100 - progressValue}%`
                const budgetColor = calculateColor(progressValue * 0.01)

                if (typeof totalBudget !== 'number' || typeof usedBudget !== 'number') {
                  return null
                }
                return (
                  <PersistingContainer fixed={this.state.scrollPositionY >= 128} py={4} className={className}>
                    <Holder>
                      {isShort ? null : (
                        <BudgetLine hasNegativeBudget={hasNegativeBudget}>
                          <Flex mr={3} flexDirection="column">
                            <BudgetLabel>budget used</BudgetLabel>
                            <BudgetValue>{formatCurrency(usedBudget)}</BudgetValue>
                          </Flex>
                          <Flex ml={2} flexDirection="column">
                            <BudgetLabel>budget remaining</BudgetLabel>
                            <BudgetValue textColor={budgetColor}>{formatCurrency(remainingBudget)}</BudgetValue>
                          </Flex>
                        </BudgetLine>
                      )}
                      <ProgressBar
                        filledColor={budgetColor}
                        color={theme.colors.lightGray}
                        bg={budgetColor}
                        progress={progressRemaining}
                      />
                    </Holder>
                  </PersistingContainer>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

BudgetBar.propTypes = {
  isShort: PropTypes.bool,
  selectedProjectExist: PropTypes.bool,
  className: PropTypes.string,
  project: PropTypes.object,
}

BudgetBar.displayName = 'BudgetBar'

function mapStateToProps (state) {
  return {
    selectedProjectExist: Boolean(state.projects.selectedProject)
  }
}

export default connect(mapStateToProps)(BudgetBar)
