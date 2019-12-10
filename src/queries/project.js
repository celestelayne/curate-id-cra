import gql from 'graphql-tag'

export const ALL_PROJECTS_QUERY = gql`
  query($filter: ProjectFilter) {
    allProjects(filter: $filter) {
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
`

export const SINGLE_PROJECT_QUERY = gql`
  query($projectId: ID) {
    Project(id: $projectId) {
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
`
