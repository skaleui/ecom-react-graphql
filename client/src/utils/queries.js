export const brandsQuery = `query {
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
}`;

export const brewsQuery = `query {
  brews {
    _id
    updatedAt
    name
    description
    image {
      url
    }
    price
    brand {
    	_id
      name
    }
  }
}`;

