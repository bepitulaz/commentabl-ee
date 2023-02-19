import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const DashboardPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  console.log(currentUser)
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      {isAuthenticated && (
        <div>
          <span>Logged in as {currentUser.email}</span>{' '}
          <button type="button" onClick={logOut}>
            Logout
          </button>
        </div>
      )}

      <h1>DashboardPage</h1>
      <p>
        Find me in <code>./web/src/pages/DashboardPage/DashboardPage.tsx</code>
      </p>
      <p>
        My default route is named <code>dashboard</code>, link to me with `
        <Link to={routes.dashboard()}>Dashboard</Link>`
      </p>
    </>
  )
}

export default DashboardPage
