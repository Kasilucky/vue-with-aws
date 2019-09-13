import gql from 'graphql-tag'

export default gql`
  mutation updateServiceProvider($id: ID!, $businessName: String!) {
    updateServiceProvider(input: { id: $id, businessName: $businessName }) {
      id
      businessName
    }
  }
`
