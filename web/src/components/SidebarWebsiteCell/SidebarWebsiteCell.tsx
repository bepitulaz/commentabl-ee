import { Box, Button } from '@chakra-ui/react'
import { FiGlobe, FiPlus } from 'react-icons/fi'

import { Link, routes } from '@redwoodjs/router'

import NavItem from '../NavItem/NavItem'

export const QUERY = gql`
  query SidebarWebsites {
    websites {
      id
      domain
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <Box px={4} mx={4}>
    <Link to={routes.newWebsite()}>
      <Button leftIcon={<FiPlus />} colorScheme="teal">
        Add a website
      </Button>
    </Link>
  </Box>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ websites, onClose }) => {
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
