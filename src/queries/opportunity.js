import gql from 'graphql-tag'

export const GET_SFDCOPPS = gql`
  query {
    allOpportunities {
      id
      name
      teamSize
      furnitureTier
      agreementStartDate
    }
    allAvailabilities{
      id
      memberName
      maxHeadCount
      size
      Space{
        opsEstimateSqf
        address
        city
        state
        floorNumber
        suiteName
        rentableSqf
      }
    }
  }
`
