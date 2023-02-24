import { ReactText } from 'react'

import { Flex, Icon, FlexProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { Link } from '@redwoodjs/router'

interface NavItemProps extends FlexProps {
  icon: IconType
  href: string
  children: ReactText
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavItem
