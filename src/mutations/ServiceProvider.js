import gql from 'graphql-tag'

export default gql`
  mutation createServiceProvider($businessName: String!) {
    createServiceProvider(input: { businessName: $businessName }) {
      id
      businessName
    }
  }
`
// // mutations/UpdateTask.jsimport gql from 'graphql-tag'export default gql`
// mutation updateServiceProvider ($id: ID!, $businessName: String!) {
//     updateServiceProvider(
//       input: {
//       id: $id
//       businessName: $businessName
//     }
//   ) {
//       id
//       businessName
//     }
//   }
// `
// // mutations/DeleteTask.jsimport gql from 'graphql-tag'export default gql`
//   mutation deleteServiceProvider ($id: ID!) {
//     deleteServiceProvider(
//       input: {
//         id: $id
//       }
//     ) {
//         id
//       }
//   }
// `
