export const schema = gql`
  type Author {
    id: Int!
    name: String!
    email: String
    website: Website
    websiteId: Int
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    authors: [Author!]! @requireAuth
    author(id: Int!): Author @requireAuth
  }

  input CreateAuthorInput {
    name: String!
    email: String
    websiteId: Int!
  }

  input UpdateAuthorInput {
    name: String
    email: String
    websiteId: Int
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
    updateAuthor(id: Int!, input: UpdateAuthorInput!): Author! @requireAuth
    deleteAuthor(id: Int!): Author! @requireAuth
  }
`
