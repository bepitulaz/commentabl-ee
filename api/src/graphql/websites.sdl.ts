export const schema = gql`
  type Website {
    id: Int!
    domain: String!
  }

  type Query {
    websites: [Website!]! @requireAuth
    website(id: Int!): Website @requireAuth
  }

  input CreateWebsiteInput {
    domain: String!
  }

  input UpdateWebsiteInput {
    domain: String
  }

  type Mutation {
    createWebsite(input: CreateWebsiteInput!): Website! @requireAuth
    updateWebsite(id: Int!, input: UpdateWebsiteInput!): Website! @requireAuth
    deleteWebsite(id: Int!): Website! @requireAuth
  }
`
