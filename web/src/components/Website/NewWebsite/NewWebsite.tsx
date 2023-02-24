import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebsiteForm from 'src/components/Website/WebsiteForm'

import type { CreateWebsiteInput } from 'types/graphql'

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

  const onSave = (input: CreateWebsiteInput) => {
    createWebsite({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Website</h2>
      </header>
      <div className="rw-segment-main">
        <WebsiteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWebsite
