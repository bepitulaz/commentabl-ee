// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NavItem> = (args) => {
//   return <NavItem {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NavItem from './NavItem'

export const generated = () => {
  return <NavItem />
}

export default {
  title: 'Components/NavItem',
  component: NavItem,
} as ComponentMeta<typeof NavItem>
