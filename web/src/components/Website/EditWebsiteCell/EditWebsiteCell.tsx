import type { EditWebsiteById, UpdateWebsiteInput } from 'types/graphql'

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

  const onSave = (
    input: UpdateWebsiteInput,
    id: EditWebsiteById['website']['id']
  ) => {
    updateWebsite({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Website {website?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WebsiteForm website={website} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
