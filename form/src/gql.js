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
        publicReplies {
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
