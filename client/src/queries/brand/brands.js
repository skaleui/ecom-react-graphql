import gql from 'graphql-tag';

const BRANDS_QUERY = gql`
query {
  brands {
   _id
    name
    description
    createdAt
    image{
      name,
      url
    }
  }
}
`;

export default BRANDS_QUERY;