export const schema = gql`
  type Author {
    id: ID!
    name: String!
    email: EmailAddress
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
    email: EmailAddress
    websiteId: ID!
  }

  input UpdateAuthorInput {
    name: String
    email: EmailAddress
    websiteId: ID
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
    updateAuthor(id: ID!, input: UpdateAuthorInput!): Author! @requireAuth
    deleteAuthor(id: ID!): Author! @requireAuth
  }
`
