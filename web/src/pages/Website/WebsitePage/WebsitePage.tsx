import {
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'

import { useQuery } from '@redwoodjs/web'

import CommentsCell from 'src/components/CommentsCell/CommentsCell'

type WebsitePageProps = {
  id: number
}

const WEBSITE_QUERY = gql`
  query WebsitePageById($id: Int!) {
    website(id: $id) {
      domain
    }
  }
`

const WebsitePage = ({ id }: WebsitePageProps) => {
  const { data, error } = useQuery(WEBSITE_QUERY, {
    variables: {
      id,
    },
  })

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>Something error in the server side</AlertDescription>
      </Alert>
    )
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg">Manage comments in {data?.website?.domain}</Heading>
      </Flex>
      <Box mt={5}>
        <CommentsCell websiteId={id} />
      </Box>
    </Box>
  )
}

export default WebsitePage
