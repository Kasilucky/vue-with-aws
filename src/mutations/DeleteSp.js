import gql from 'graphql-tag'

export default gql`
  mutation deleteServiceProvider($id: ID!) {
    deleteServiceProvider(input: { id: $id }) {
      id
    }
  }
`
