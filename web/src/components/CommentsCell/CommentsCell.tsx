import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from '@chakra-ui/react'
import type { CommentsByWebsiteId } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { timeTag } from 'src/lib/formatters'

export const QUERY = gql`
  query CommentsByWebsiteId($websiteId: Int!) {
    comments(websiteId: $websiteId) {
      id
      link
      message
      isPublished
      isSpam
      createdAt
      authors {
        author {
          name
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>Error: {error?.message}</AlertDescription>
  </Alert>
)

export const Success = ({
  comments,
}: CellSuccessProps<CommentsByWebsiteId>) => {
  return (
    <Box>
      {comments.map((comment) => {
        return (
          <Card key={`comment-${comment.id}`} variant="outline" mb={2}>
            <CardHeader>
              <Heading as="h5" size="sm">
                {comment.link}
              </Heading>
              <Text fontSize="sm">
                From: {comment.authors[0].author.name} &#8226; Email:{' '}
                {comment.authors[0].author.email ?? 'N/A'}
              </Text>
              <Text fontSize="sm">{timeTag(comment.createdAt)}</Text>
            </CardHeader>
            <CardBody pt={0}>
              <Text>{comment.message}</Text>
            </CardBody>
          </Card>
        )
      })}
    </Box>
  )
}
