import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
} from '@chakra-ui/react'
import type {
  EditWebsiteById,
  UpdateWebsiteInput,
  DeleteWebsiteMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebsiteForm from 'src/components/Website/WebsiteForm'

export const QUERY = gql`
  query EditWebsiteById($id: Int!) {
    website: website(id: $id) {
      id
      domain
      createdAt
      updatedAt
    }
  }
`
const UPDATE_WEBSITE_MUTATION = gql`
  mutation UpdateWebsiteMutation($id: Int!, $input: UpdateWebsiteInput!) {
    updateWebsite(id: $id, input: $input) {
      id
      domain
      createdAt
      updatedAt
    }
  }
`

const DELETE_WEBSITE_MUTATION = gql`
  mutation DeleteWebsiteMutation($id: Int!) {
    deleteWebsite(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ website }: CellSuccessProps<EditWebsiteById>) => {
  const [updateWebsite, { loading, error }] = useMutation(
    UPDATE_WEBSITE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Website updated')
        navigate(routes.websites())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [deleteWebsite] = useMutation(DELETE_WEBSITE_MUTATION, {
    onCompleted: () => {
      toast.success('Website deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteWebsiteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete website ' + id + '?')) {
      deleteWebsite({ variables: { id } })
    }
  }

  const onSave = (
    input: UpdateWebsiteInput,
    id: EditWebsiteById['website']['id']
  ) => {
    updateWebsite({ variables: { id, input } })
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg">Settings for {website.domain}</Heading>
      </Flex>
      <Box mt={5}>
        <WebsiteForm
          website={website}
          onSave={onSave}
          error={error}
          loading={loading}
        />
        <Box maxW="4xl" mt={5}>
          <Card>
            <CardHeader borderBottom="1px solid" borderBottomColor="gray.100">
              <Heading as="h4" size="md">
                Dangerous zone
              </Heading>
            </CardHeader>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
