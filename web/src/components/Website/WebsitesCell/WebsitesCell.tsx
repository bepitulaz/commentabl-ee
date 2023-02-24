import type { FindWebsites } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Websites from 'src/components/Website/Websites'

export const QUERY = gql`
  query FindWebsites {
    websites {
      id
      domain
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No websites yet. '}
      <Link to={routes.newWebsite()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ websites }: CellSuccessProps<FindWebsites>) => {
  return <Websites websites={websites} />
}
