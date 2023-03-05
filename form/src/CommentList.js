import { useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  CircularProgress,
  Text,
  Stack,
  Heading,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Divider,
} from '@chakra-ui/react'
import { useQuery, useMutation } from '@apollo/client'
import { FiCornerLeftUp } from 'react-icons/fi'
import { PUBLIC_COMMENTS, CREATE_REPLY_COMMENT } from './gql'
import Avatar from 'react-avatar'
import { useForm } from 'react-hook-form'

function CommentList({ link }) {
  const { data, loading, error } = useQuery(PUBLIC_COMMENTS, {
    variables: {
      link,
    },
  })
  const comments = data?.publicComments?.edges || []

  if (loading) {
    return (
      <Box>
        <LoadingView />
      </Box>
    )
  }

  return (
    <Box>
      <Heading my={3} as="h3" size="md">
        Comments ({comments.length})
      </Heading>
      <Box height={400} overflowY="scroll">
        {comments.map((comment) => (
          <Box key={`${comment.parent.id}-${comment.parent.createdAt}`}>
            <CommentRow comment={comment} />
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function CommentRow({ comment }) {
  const authorName = comment?.parent?.authors?.[0]?.author?.name
  const authorEmail = comment?.parent?.authors?.[0]?.author?.email
  const createdDate = new Date(comment?.parent?.createdAt)
  const replies = comment?.replies

  return (
    <>
      <Box py={3}>
        <Flex gap={2}>
          <Avatar size="40px" name={authorName} email={authorEmail} round />
          <Stack width="100%">
            <Box>
              <Text fontWeight="bold">{authorName}</Text>
              <Text fontSize="sm">
                Posted on{' '}
                {`${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`.trim()}
              </Text>
            </Box>
            <Text
              px={3}
              sx={{ whiteSpace: 'pre-wrap' }}
            >{`${comment?.parent?.message}`}</Text>
            <ReplyBox commentId={comment.id} link={comment.link} />
          </Stack>
        </Flex>
        {replies.map((reply) => {
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
      </Box>
    </>
  )
}

function ReplyBox({ commentId, link }) {
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
    refetchQueries: ['publicComments'],
  })

  const buttonProps = getButtonProps()
  const disclosureProps = getDisclosureProps()

  const onSubmit = (data) => {
    const input = {
      link,
      parentId: commentId,
      message: data.comment,
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
            {...register('comment', {
              required: "Don't forget to write your comment",
            })}
          />
          <FormErrorMessage>{errors?.comment?.message}</FormErrorMessage>
        </FormControl>
        <Box py={2}>
          <Button type="submit" colorScheme="teal">
            Send my reply
          </Button>
        </Box>
      </form>
    </>
  )
}

const ReplyRow = ({
  authorName,
  authorEmail,
  createdBy,
  createdAt,
  message,
}) => {
  const name = authorName || createdBy?.name
  const email = authorEmail || createdBy?.email
  const createdDate = new Date(createdAt)

  return (
    <Box py={3} pl={12}>
      <Flex gap={2}>
        <Avatar name={name} email={email} size="40px" round />
        <Stack>
          <Box>
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm">
              Posted on{' '}
              {`${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`.trim()}
            </Text>
          </Box>
          <Text px={3} sx={{ whiteSpace: 'pre-wrap' }}>{`${message}`}</Text>
        </Stack>
      </Flex>
    </Box>
  )
}

function LoadingView() {
  return (
    <Flex justifyContent={'center'}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  )
}

export default CommentList
