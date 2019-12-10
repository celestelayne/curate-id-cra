import gql from 'graphql-tag'

export const CREATE_ASSIGNMENT_MUTATION = gql`
  mutation($params: AssignmentInput!){
    createAssignment(params: $params) {
      id
    }
  }
`

export const DELETE_ASSIGNMENT_MUTATION = gql`
  mutation($id: ID $params: AssignmentInput!){
    deleteAssignment(id: $id params: $params) {
      id
    }
  }
`
