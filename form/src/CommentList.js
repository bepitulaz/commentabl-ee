import {
  Box,
  Button,
  Flex,
  CircularProgress,
  Text,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { FiCornerLeftUp } from 'react-icons/fi'
import { PUBLIC_COMMENTS } from './gql'
import Avatar from 'react-avatar'

function CommentList({ link }) {
  const { data, loading, error } = useQuery(PUBLIC_COMMENTS, {
    variables: {
      link,
    },
  })
  const comments = data?.publicComments || []

  if (loading) {
    return (
      <Box>
        <LoadingView />
      </Box>
    )
  }

  return (
    <Box>
      <Heading my={3} as="h3" size="md">Comments ({comments.length})</Heading>
      <Box height={400} overflowY="scroll">
        {comments.map((comment) => (
          <CommentRow
            key={`${comment.id}-${comment.createdAt}`}
            comment={comment}
          />
        ))}
      </Box>
    </Box>
  )
}

function CommentRow({ comment }) {
  const authorName = comment?.authors?.[0]?.author?.name
  const authorEmail = comment?.authors?.[0]?.author?.email
  const createdDate = new Date(comment?.createdAt)

  return (
    <Box py={3}>
      <Flex gap={2}>
        <Avatar size="40px" name={authorName} email={authorEmail} round />
        <Stack>
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
          >{`${comment?.message}`}</Text>
          <Box width={100}>
            <Button size="sm" colorScheme="gray">
              <Flex justifyContent="space-between" sx={{ gap: 1 }}>
                <FiCornerLeftUp /> <Text>Reply</Text>
              </Flex>
            </Button>
          </Box>
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
