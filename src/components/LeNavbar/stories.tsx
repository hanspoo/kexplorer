import { Story, Meta } from '@storybook/react'
import LeNavbar from '.'

export default {
  title: 'LeNavbar',
  component: LeNavbar
} as Meta

const items = [
  { label: 'Home', href: '#' },
  { label: 'Options', href: '#' }
]
export const Default: Story = () => (
  <LeNavbar navItems={items} title={'Primary Menu'} />
)
export const WithItemSelected: Story = () => (
  <LeNavbar navItems={items} title={'Primary Menu'} selected="Options" />
)
