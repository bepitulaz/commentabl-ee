import {
  Box,
  Button,
  Flex,
  CircularProgress,
  Text,
  Stack,
  Heading,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { FiCornerLeftUp } from 'react-icons/fi'
import { PUBLIC_COMMENTS } from './gql'
import Avatar from 'react-avatar'
import CommentForm from './CommentForm'

function CommentList({ link }) {
  const { data, loading } = useQuery(PUBLIC_COMMENTS, {
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
  const replies = comment?.publicReplies

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
            <ReplyBox parentCommentId={comment.parent.id} />
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

function ReplyBox({ parentCommentId }) {
  const { getDisclosureProps, getButtonProps } = useDisclosure()

  const buttonProps = getButtonProps()
  const disclosureProps = getDisclosureProps()

  return (
    <>
      <Box mt={2}>
        <Button size="sm" colorScheme="gray" {...buttonProps}>
          <Flex justifyContent="space-between" sx={{ gap: 1 }}>
            <FiCornerLeftUp /> <Text>Reply this comment</Text>
          </Flex>
        </Button>
      </Box>
      <Box {...disclosureProps}>
        <CommentForm parentCommentId={parentCommentId} />
      </Box>
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
