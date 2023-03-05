export const schema = gql`
  type Website {
    id: ID!
    domain: String!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    websites: [Website!]! @requireAuth
    website(id: ID!): Website @requireAuth
  }

  input CreateWebsiteInput {
    domain: String!
  }

  input UpdateWebsiteInput {
    domain: String
  }

  type Mutation {
    createWebsite(input: CreateWebsiteInput!): Website! @requireAuth
    updateWebsite(id: ID!, input: UpdateWebsiteInput!): Website! @requireAuth
    deleteWebsite(id: ID!): Website! @requireAuth
  }
`
