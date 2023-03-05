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

import { Link, routes } from '@redwoodjs/router'

import { timeTag } from 'src/lib/formatters'

const WebsitesList = ({ websites }) => {
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
}

export default WebsitesList
