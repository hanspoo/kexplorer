import { Story, Meta } from '@storybook/react'
import List from '.'

export default {
  title: 'List',
  component: List
} as Meta

export const Default: Story = () => (
  <List>
    <span>List children</span>
  </List>
)
