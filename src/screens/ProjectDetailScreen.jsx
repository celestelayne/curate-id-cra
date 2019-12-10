import * as React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { Banner, Box, Container, Flex } from '@knotel/cinderblock'

import { InfoHeader, CostValue } from '../components/Txt'
import { SINGLE_PROJECT_QUERY } from '../queries'
import { formatCurrency } from '../util'
import BudgetBar from '../components/BudgetBar'

const TopFlex = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${props => props.theme.mediaQueries['sm']} {
    flex-direction: row;
  }
`

class ProjectDetailScreen extends React.Component {
  render () {
    const { id } = this.props.match.params
    return (
      <Query variables={{ ProjectId: id }} query={SINGLE_PROJECT_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) {
            return (
              <Banner
                textAlign="left"
                mb={2}
                p={3}
                width={1}
                header="Error"
                color="error"
                text={error.message}
                bg="lightRed"
              />
            )
          }

          const Project = data.Project
          const budget = Number(Project.budget)
          return (
            <>
              <BudgetBar project={data.project} />
              <Container>
                <Box mt={4}>
                  <TopFlex>
                    <InfoHeader>{Project.name}</InfoHeader>
                    <CostValue>{formatCurrency(budget)}</CostValue>
                  </TopFlex>
                </Box>
              </Container>
            </>
          )
        }}
      </Query>
    )
  }
}

ProjectDetailScreen.propTypes = {
  match: PropTypes.any
}

export default ProjectDetailScreen
