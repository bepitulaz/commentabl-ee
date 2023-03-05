import type {
  DeleteWebsiteMutationVariables,
  FindWebsiteById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_WEBSITE_MUTATION = gql`
  mutation DeleteWebsiteMutation($id: ID!) {
    deleteWebsite(id: $id) {
      id
    }
  }
`

interface Props {
  website: NonNullable<FindWebsiteById['website']>
}

const Website = ({ website }: Props) => {
  const [deleteWebsite] = useMutation(DELETE_WEBSITE_MUTATION, {
    onCompleted: () => {
      toast.success('Website deleted')
      navigate(routes.websites())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteWebsiteMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete website ' + id + '?')) {
      deleteWebsite({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Website {website.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{website.id}</td>
            </tr>
            <tr>
              <th>Domain</th>
              <td>{website.domain}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(website.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(website.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWebsite({ id: website.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(website.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Website
