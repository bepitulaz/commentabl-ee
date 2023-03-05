import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Heading,
} from '@chakra-ui/react'
import { FiGrid, FiGlobe } from 'react-icons/fi'

import { routes } from '@redwoodjs/router'

import NavItem from 'src/components/NavItem/NavItem'
import SidebarWebsiteCell from 'src/components/SidebarWebsiteCell/SidebarWebsiteCell'

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Commentabl.ee
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem icon={FiGrid} href={routes.dashboard()} onClick={onClose}>
        Dashboard
      </NavItem>
      <NavItem icon={FiGlobe} href={routes.websites()} onClick={onClose}>
        Websites
      </NavItem>
      <Heading p={4} mx={4} as="h6" size="xs">
        Manage comments
      </Heading>
      <SidebarWebsiteCell onClose={onClose} />
    </Box>
  )
}

export default SidebarContent
