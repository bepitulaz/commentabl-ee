import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

import Website from 'src/components/Website/Website'

export const QUERY = gql`
  query FindWebsiteById($id: ID!) {
    website: website(id: $id) {
      id
      domain
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Website not found</div>

export const Failure = ({ error }) => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>Error: {error?.message}</AlertDescription>
  </Alert>
)

export const Success = ({ website }) => {
  return <Website website={website} />
}
