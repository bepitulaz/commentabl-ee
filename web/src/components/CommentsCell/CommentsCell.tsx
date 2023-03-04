import { useState } from 'react'

import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  Text,
} from '@chakra-ui/react'
import type { CommentsByWebsiteId } from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'

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
const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($id: Int!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      link
      message
      isPublished
      isSpam
      createdAt
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
        const createdDate = new Date(comment?.createdAt)

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
              <Text fontSize="sm">
                Created at{' '}
                {`${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`.trim()}
              </Text>
            </CardHeader>
            <Divider />
            <CardBody>
              <Text sx={{ whiteSpace: 'pre-wrap' }}>{comment.message}</Text>
            </CardBody>
            <Divider />
            <CardFooter pt={0}>
              <CommandRow
                commentId={comment.id}
                isCommentPublished={comment.isPublished}
              />
            </CardFooter>
          </Card>
        )
      })}
    </Box>
  )
}

interface CommandRowProps {
  commentId: number
  isCommentPublished: boolean
}

const CommandRow = ({ commentId, isCommentPublished }: CommandRowProps) => {
  const [isPublished, setIsPublished] = useState(isCommentPublished)

  const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION, {
    onCompleted: (data) => {
      setIsPublished(data?.updateComment?.isPublished)
    },
    onError: (error) => {
      console.error(error)
    },
    refetchQueries: ['CommentsByWebsiteId'],
  })

  const handlePublishedChange = (e) => {
    updateComment({
      variables: { id: commentId, input: { isPublished: e.target.checked } },
    })
  }

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="isPublish" mb="0" fontWeight="bold">
        Publish this comment?
      </FormLabel>
      <Switch isChecked={isPublished} onChange={handlePublishedChange} />
    </FormControl>
  )
}
