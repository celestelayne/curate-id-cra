import gql from 'graphql-tag'

export const CREATE_PROJECT_MUTATION = gql`
  mutation($params: ProjectInput!){
    createProject(params: $params) {
      id
    }
  }
`

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject(
    $id: ID!,
    $name: String,
    $status: ProjectStatus,
    $orgId: ID,
    $tier: ProjectTier,
    $moveInDate: DateTime,
    $projectmatesId: String,
    $sfdcOpportunityId: String,
    $availabilityId: ID,
    $region: String,
    $address: String,
    $city: String,
    $state: String,
    $floorNumber: String,
    $suiteNumber: String,
    $size: Float,
    $sizeUnit: String,
    $note: String,
  ){
    updateProject(
      id: $id,
      params: {
        name: $name,
        status: $status,
        orgId: $orgId,
        tier: $tier,
        moveInDate: $moveInDate,
        projectmatesId: $projectmatesId,
        sfdcOpportunityId :$sfdcOpportunityId,
        availabilityId: $availabilityId,
        region: $region,
        address: $address,
        city: $city,
        state: $state,
        floorNumber: $floorNumber,
        suiteNumber: $suiteNumber,
        size: $size,
        sizeUnit:  $sizeUnit,
        note: $note
      }
    ){
      success
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!){
    deleteProject(id: $id){
      success
    }
  }
`
