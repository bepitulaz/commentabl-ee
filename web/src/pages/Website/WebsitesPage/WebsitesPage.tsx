import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

import { Link, routes } from '@redwoodjs/router'

import WebsitesCell from 'src/components/Website/WebsitesCell'

const WebsitesPage = () => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="lg">My sites</Heading>
        <Link to={routes.newWebsite()}>
          <Button leftIcon={<FiPlus />} colorScheme="teal">
            Add a website
          </Button>
        </Link>
      </Flex>
      <Box mt={5}>
        <WebsitesCell />
      </Box>
    </Box>
  )
}

export default WebsitesPage
