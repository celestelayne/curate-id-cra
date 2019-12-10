import gql from 'graphql-tag'

export const ASSIGNED_PROJECT_QUERY = gql`
  query($filter: AssignmentFilter) {
    allAssignments(filter: $filter) {
      id
      profileId
      projectId
      Project {
        id
        name
        address
        city
        state
        status
        moveInDate
        size
        sizeUnit
        floorNumber
        suiteNumber
        region
        tier
      }
    }
  }
`
