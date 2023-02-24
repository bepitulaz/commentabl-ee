import { render } from '@redwoodjs/testing/web'

import SidebarContent from './SidebarContent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SidebarContent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SidebarContent />)
    }).not.toThrow()
  })
})
