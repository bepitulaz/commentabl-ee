import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FiEye, FiSettings } from 'react-icons/fi'
import type {
  DeleteWebsiteMutationVariables,
  FindWebsites,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Website/WebsitesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_WEBSITE_MUTATION = gql`
  mutation DeleteWebsiteMutation($id: Int!) {
    deleteWebsite(id: $id) {
      id
    }
  }
`

const WebsitesList = ({ websites }: FindWebsites) => {
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

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3, '2xl': 4 }} gap={3}>
      {websites.map((website) => (
        <Card key={`web-${website.id}`}>
          <Link to={routes.website({ id: website.id })}>
            <CardHeader pb={0}>
              <Heading as="h5" size="md">
                {website.domain}
              </Heading>
            </CardHeader>
          </Link>
          <CardBody pt={0}>
            <Text>Added at {timeTag(website.createdAt)}</Text>
            <Stack mt={3} direction="row" spacing={2}>
              <Link to={routes.website({ id: website.id })}>
                <Button leftIcon={<FiEye />} colorScheme="blue" size="sm">
                  Manage
                </Button>
              </Link>
              <Link to={routes.editWebsite({ id: website.id })}>
                <Button leftIcon={<FiSettings />} size="sm">
                  Configure
                </Button>
              </Link>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Domain</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id}>
              <td>{truncate(website.id)}</td>
              <td>{truncate(website.domain)}</td>
              <td>{timeTag(website.createdAt)}</td>
              <td>{timeTag(website.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.website({ id: website.id })}
                    title={'Show website ' + website.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWebsite({ id: website.id })}
                    title={'Edit website ' + website.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete website ' + website.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(website.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WebsitesList
