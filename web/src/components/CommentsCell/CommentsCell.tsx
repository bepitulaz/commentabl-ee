import { useState, useEffect } from 'react'

import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Button,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  Text,
  useDisclosure,
  Textarea,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react'
import Avatar from 'react-avatar'
import { useForm } from 'react-hook-form'
import { FiCornerLeftUp } from 'react-icons/fi'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import { timeTag } from 'src/lib/formatters'

export const QUERY = gql`
  query CommentsByWebsiteId($websiteId: ID!) {
    comments(websiteId: $websiteId) {
      edges {
        parent {
          id
          link
          message
          isPublished
          isSpam
          createdAt
          websiteId
          authors {
            author {
              name
              email
            }
          }
        }
        replies {
          id
          link
          message
          isPublished
          isSpam
          createdAt
          websiteId
          parentId
          authors {
            author {
              name
              email
            }
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
const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
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

const CREATE_REPLY_COMMENT = gql`
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>Error: {error?.message}</AlertDescription>
  </Alert>
)

export const Success = ({ comments }) => {
  const { currentUser } = useAuth()

  return (
    <Box>
      {comments.edges.map((comment) => {
        const parent = comment.parent
        const replies = comment.replies

        return (
          <Card key={`comment-${parent.id}`} variant="outline" mb={2}>
            <CardHeader>
              <Heading as="h5" size="sm">
                {parent.link}
              </Heading>
              <Text fontSize="sm">
                From: {parent.authors[0].author.name} &#8226; Email:{' '}
                {parent.authors[0].author.email ?? 'N/A'}
              </Text>
              <Text fontSize="sm">Posted at {timeTag(parent.createdAt)}</Text>
            </CardHeader>
            <Divider />
            <CardBody>
              <Text sx={{ whiteSpace: 'pre-wrap' }}>{parent.message}</Text>
            </CardBody>
            <Divider />
            {replies.map((reply) => {
              console.log(reply?.authors)
              return (
                <ReplyRow
                  key={`reply-${reply.id}`}
                  commentId={reply.id}
                  authorName={reply?.authors?.[0]?.author?.name}
                  authorEmail={reply?.authors?.[0]?.author?.email}
                  {...reply}
                />
              )
            })}
            <Box px={5} pb={5}>
              <CommandRow
                commentId={parent.id}
                isCommentPublished={parent.isPublished}
              />
              <ReplyBox
                commentId={parent.id}
                link={parent.link}
                isCommentPublished={parent.isPublished}
                currentUserId={currentUser.id}
                websiteId={parent.websiteId}
              />
            </Box>
          </Card>
        )
      })}
    </Box>
  )
}

const CommandRow = ({ commentId, isCommentPublished }) => {
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
    <FormControl>
      <Flex alignItems="center">
        <FormLabel htmlFor="isPublish" mb="0" fontWeight="bold">
          Publish this comment?
        </FormLabel>
        <Switch isChecked={isPublished} onChange={handlePublishedChange} />
      </Flex>
    </FormControl>
  )
}

const ReplyRow = ({
  commentId,
  parentId,
  message,
  createdAt,
  authorName,
  authorEmail,
}) => {
  return (
    <Box>
      <HStack>
        <Avatar name={authorName} email={authorEmail} size="40px" />
      </HStack>
    </Box>
  )
}

const ReplyBox = ({
  commentId,
  link,
  isCommentPublished,
  currentUserId,
  websiteId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm()
  const { getDisclosureProps, getButtonProps } = useDisclosure()

  const [createComment] = useMutation(CREATE_REPLY_COMMENT, {
    onError: (error) => {
      console.error(error)
    },
    refetchQueries: ['CommentsByWebsiteId'],
  })

  const buttonProps = getButtonProps()
  const disclosureProps = getDisclosureProps()

  const onSubmit = (data) => {
    const input = {
      link,
      parentId: commentId,
      message: data.comment,
      createdBy: currentUserId,
      isSpam: false,
      isPublished: true,
      isDeleted: false,
      websiteId,
    }

    createComment({
      variables: {
        input,
      },
    })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  if (!isCommentPublished) {
    return null
  }

  return (
    <>
      <Box mt={2}>
        <Button size="sm" colorScheme="gray" {...buttonProps}>
          <Flex justifyContent="space-between" sx={{ gap: 1 }}>
            <FiCornerLeftUp /> <Text>Reply this comment</Text>
          </Flex>
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} {...disclosureProps}>
        <FormControl py={1} isInvalid={'comment' in errors}>
          <FormLabel>Your comment</FormLabel>
          <Textarea
            placeholder="What's on your mind?"
            disabled={!isCommentPublished}
            {...register('comment', {
              required: "Don't forget to write your comment",
            })}
          />
          <FormErrorMessage>{errors?.comment?.message}</FormErrorMessage>
        </FormControl>
        <Box py={2}>
          <Button
            type="submit"
            colorScheme="teal"
            isDisabled={!isCommentPublished}
          >
            Send my reply
          </Button>
        </Box>
      </form>
    </>
  )
}
