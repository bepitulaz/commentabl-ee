import { FiGlobe } from 'react-icons/fi'
import type { FindWebsites } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import NavItem from '../NavItem/NavItem'

interface NavItemProps extends CellSuccessProps<FindWebsites> {
  onClose: () => void
}

export const QUERY = gql`
  query FindWebsites {
    websites {
      id
      domain
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ websites, onClose }: NavItemProps) => {
  return websites.map((website) => (
    <NavItem
      key={website.domain}
      icon={FiGlobe}
      href={`/websites/${website.id}`}
      onClick={onClose}
    >
      {website.domain}
    </NavItem>
  ))
}
