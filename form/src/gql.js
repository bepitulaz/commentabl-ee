import { gql } from '@apollo/client'

export const PUBLIC_CREATE_COMMENT = gql`
  mutation publicCreateComment($input: PublicCreateCommentInput!) {
    publicCreateComment(input: $input) {
      id
    }
  }
`

export const PUBLIC_COMMENTS = gql`
  query publicComments($link: String!) {
    publicComments(link: $link) {
      edges {
        parent {
          id
          link
          message
          parentId
          authors {
            author {
              name
              email
            }
          }
          createdAt
        }
        replies {
          id
          link
          message
          parentId
          authors {
            author {
              name
              email
            }
          }
          createdAt
          createdBy {
            name
            email
          }
        }
      }
      pagination {
        currentPage
        limit
      }
    }
  }
`

export const CREATE_REPLY_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      link
      message
      isPublished
      isSpam
      createdAt
    }
  }
`
