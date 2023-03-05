export const schema = gql`
  type Author {
    id: ID!
    name: String!
    email: String
    website: Website
    websiteId: ID
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    authors: [Author!]! @requireAuth
    author(id: ID!): Author @requireAuth
  }

  input CreateAuthorInput {
    name: String!
    email: String
    websiteId: ID!
  }

  input UpdateAuthorInput {
    name: String
    email: String
    websiteId: ID
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
    updateAuthor(id: ID!, input: UpdateAuthorInput!): Author! @requireAuth
    deleteAuthor(id: ID!): Author! @requireAuth
  }
`
