// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Private, Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />

      <Private unauthenticated="login">
        <Set wrap={DashboardLayout}>
          <Route path="/" page={DashboardPage} name="dashboard" />
          <Route path="/websites/new" page={WebsiteNewWebsitePage} name="newWebsite" />
          <Route path="/websites/{id:Int}/edit" page={WebsiteEditWebsitePage} name="editWebsite" />
          <Route path="/websites/{id:Int}" page={WebsiteWebsitePage} name="website" />
          <Route path="/websites" page={WebsiteWebsitesPage} name="websites" />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
