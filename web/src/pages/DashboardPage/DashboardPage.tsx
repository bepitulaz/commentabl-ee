import { Heading } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <Heading size="lg">Dashboard</Heading>
    </>
  )
}

export default DashboardPage
