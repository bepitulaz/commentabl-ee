import { gql } from '@apollo/client'

export const PUBLIC_CREATE_COMMENT = gql`
  mutation publicCreateComment($input: PublicCreateCommentInput!) {
    publicCreateComment(input: $input) {
      id
    }
  }
`
