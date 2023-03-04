export const schema = gql`
  type CommentsAuthors {
    author: Author
  }

  type Comment {
    id: Int!
    website: Website!
    websiteId: Int!
    link: String!
    message: String!
    parentId: Int
    isSpam: Boolean!
    isPublished: Boolean!
    isDeleted: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime
    authors: [CommentsAuthors]
  }

  type Query {
    comments(websiteId: Int!): [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
    """
    The query that will be called by web form
    """
    publicComments(link: String!): [Comment] @skipAuth
  }

  input CreateCommentInput {
    websiteId: Int!
    link: String!
    message: String!
    parentId: Int
    isSpam: Boolean!
    isPublished: Boolean!
    isDeleted: Boolean!
    createdBy: Int
  }

  input UpdateCommentInput {
    websiteId: Int
    link: String
    message: String
    parentId: Int
    isSpam: Boolean
    isPublished: Boolean
    isDeleted: Boolean
  }

  input PublicCreateCommentInput {
    link: String!
    parentCommentId: Int
    authorName: String!
    authorEmail: String
    comment: String!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
    """
    The mutation that will be called by web form
    """
    publicCreateComment(input: PublicCreateCommentInput!): Comment @skipAuth
  }
`
