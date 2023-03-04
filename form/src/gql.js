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
  }
`
