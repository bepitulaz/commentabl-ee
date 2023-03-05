import { Box, Flex, Heading } from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebsiteForm from 'src/components/Website/WebsiteForm'

const CREATE_WEBSITE_MUTATION = gql`
  mutation CreateWebsiteMutation($input: CreateWebsiteInput!) {
    createWebsite(input: $input) {
      id
    }
  }
`

const NewWebsite = () => {
  const [createWebsite, { loading, error }] = useMutation(
    CREATE_WEBSITE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Website created')
        navigate(routes.websites())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createWebsite({ variables: { input } })
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg">Add new website</Heading>
      </Flex>
      <Box mt={5}>
        <WebsiteForm onSave={onSave} loading={loading} error={error} />
      </Box>
    </Box>
  )
}

export default NewWebsite
